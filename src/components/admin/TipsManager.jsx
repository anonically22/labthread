import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import DOMPurify from 'dompurify';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { getAllTips, saveTip, deleteTip, reorderTips } from '../../utils/tipsStore';
import { useToast } from '../Toast';

const SortableItem = ({ tip, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: tip.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center justify-between p-4 bg-white hover:bg-[#F5F5F3] transition-colors group border-b border-[#E2E2DF] last:border-b-0">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <button {...attributes} {...listeners} className="text-muted cursor-grab active:cursor-grabbing hover:text-foreground">
          <i className="ti ti-grip-vertical text-[16px]"></i>
        </button>
        <div className="min-w-0 flex flex-col gap-1 items-start">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#0F6E56] border border-[#0F6E56]/30 px-2 py-0.5 rounded-full">
            {tip.category}
          </span>
          <h3 className="font-sans font-medium text-[14px] text-foreground truncate max-w-sm w-full">
            {tip.title}
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-3 pr-2">
        <button onClick={() => onEdit(tip)} className="text-muted hover:text-[#0F6E56] transition-colors">
          <i className="ti ti-edit text-[18px]"></i>
        </button>
        <button onClick={() => {
          if (window.confirm("Delete this tip?")) onDelete(tip.id);
        }} className="text-muted hover:text-[#A32D2D] transition-colors">
          <i className="ti ti-trash text-[18px]"></i>
        </button>
      </div>
    </div>
  );
};

const TipsManager = () => {
  const [tips, setTips] = useState([]);
  const [editingTip, setEditingTip] = useState(null);
  const { showToast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setTips(getAllTips());
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = tips.findIndex((t) => t.id === active.id);
      const newIndex = tips.findIndex((t) => t.id === over.id);
      
      const newOrder = arrayMove(tips, oldIndex, newIndex);
      setTips(newOrder);
      const orderedIds = newOrder.map(t => t.id);
      reorderTips(orderedIds);
    }
  };

  const handleDelete = (id) => {
    const updated = deleteTip(id);
    setTips(updated);
    showToast("Tip deleted", "info");
  };

  if (editingTip) {
    return (
      <TipEditor 
        tip={editingTip} 
        onClose={() => setEditingTip(null)}
        onSave={(tip) => {
          const updated = saveTip(tip);
          setTips(updated);
          setEditingTip(null);
          showToast("Tip saved", "success");
        }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-2xl font-bold text-foreground">Email tips</h2>
        <button 
          onClick={() => setEditingTip({
            id: nanoid(),
            category: '',
            title: '',
            body: '',
            order: tips.length > 0 ? Math.max(...tips.map(t => t.order || 0)) + 1 : 1
          })}
          className="bg-[#0F6E56] text-white font-sans text-[13px] font-medium px-4 py-2 rounded-lg hover:bg-[#0c5946] transition-colors"
        >
          Add tip
        </button>
      </div>

      <div className="bg-white border border-[#E2E2DF] rounded-xl overflow-hidden">
        {tips.length === 0 ? (
          <div className="p-8 text-center text-muted font-sans text-[14px]">No tips found.</div>
        ) : (
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={tips.map(t => t.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col">
                {tips.map(tip => (
                  <SortableItem key={tip.id} tip={tip} onEdit={setEditingTip} onDelete={handleDelete} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
};

const TipEditor = ({ tip, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...tip });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const save = () => {
    if (!formData.title || !formData.category || !formData.body) return;
    const sanitized = {
      ...formData,
      title: DOMPurify.sanitize(formData.title, { ALLOWED_TAGS: [] }),
      category: DOMPurify.sanitize(formData.category, { ALLOWED_TAGS: [] }),
      body: DOMPurify.sanitize(formData.body)
    };
    onSave(sanitized);
  };

  return (
    <div className="max-w-2xl mx-auto pb-10">
      <button onClick={onClose} className="text-[#0F6E56] font-sans text-[13px] font-medium mb-6 flex items-center gap-1 hover:underline">
        &larr; Back to tips
      </button>

      <div className="space-y-6">
        <div>
          <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">Category</label>
          <input 
            type="text" 
            name="category" 
            list="categories"
            value={formData.category} 
            onChange={handleChange} 
            className="w-full border border-[#E2E2DF] rounded-lg px-4 py-2 font-sans text-[15px] focus:outline-none focus:border-[#0F6E56]" 
          />
          <datalist id="categories">
            <option value="Cold email to PI" />
            <option value="Lab internship inquiry" />
            <option value="Follow-up email" />
            <option value="GATE preparation" />
            <option value="Research applications" />
          </datalist>
        </div>

        <div>
          <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">Tip title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border border-[#E2E2DF] rounded-lg px-4 py-2 font-sans text-[15px] focus:outline-none focus:border-[#0F6E56]" />
        </div>

        <div>
          <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">Tip content</label>
          <textarea name="body" rows="6" value={formData.body} onChange={handleChange} className="w-full border border-[#E2E2DF] rounded-lg px-4 py-3 font-mono text-[14px] focus:outline-none focus:border-[#0F6E56] leading-relaxed" />
          <p className="text-muted text-[11px] mt-1 font-sans">Markdown supported</p>
        </div>

        <div className="flex justify-end pt-4">
          <button onClick={save} disabled={!formData.title || !formData.category || !formData.body} className="px-5 py-2 rounded-lg font-sans text-[14px] font-medium bg-[#0F6E56] text-white hover:bg-[#0c5946] transition-colors disabled:opacity-50">
            Save tip
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipsManager;
