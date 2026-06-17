import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import DOMPurify from 'dompurify';
import { getAllPosts, savePost, deletePost } from '../../utils/blogStore';
import { useToast } from '../Toast';

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    setPosts(getAllPosts());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Delete this post?")) {
      const updated = deletePost(id);
      setPosts(updated);
      showToast("Post deleted", "info");
    }
  };

  if (editingPost) {
    return (
      <EditorView 
        post={editingPost} 
        onClose={() => setEditingPost(null)}
        onSave={(post) => {
          const updated = savePost(post);
          setPosts(updated);
          setEditingPost(null);
          showToast(`Post ${post.published ? 'published' : 'saved as draft'}`, "success");
        }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-2xl font-bold text-foreground">Blog posts</h2>
        <button 
          onClick={() => setEditingPost({
            id: nanoid(),
            title: '',
            slug: '',
            excerpt: '',
            content: '',
            coverEmoji: '🔬',
            tags: [],
            date: new Date().toISOString().split('T')[0],
            published: false
          })}
          className="bg-[#0F6E56] text-white font-sans text-[13px] font-medium px-4 py-2 rounded-lg hover:bg-[#0c5946] transition-colors"
        >
          New post
        </button>
      </div>

      <div className="bg-white border border-[#E2E2DF] rounded-xl overflow-hidden">
        {posts.length === 0 ? (
          <div className="p-8 text-center text-muted font-sans text-[14px]">No posts found.</div>
        ) : (
          <div className="divide-y divide-[#E2E2DF]">
            {posts.map(post => (
              <div key={post.id} className="flex items-center justify-between p-4 hover:bg-[#F5F5F3] transition-colors group">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-8 h-8 shrink-0 bg-[#E1F5EE] rounded flex items-center justify-center text-[16px]">
                    {post.coverEmoji}
                  </div>
                  <div className="min-w-0 flex flex-col gap-1">
                    <h3 className="font-sans font-medium text-[14px] text-foreground truncate max-w-sm">
                      {post.title || "Untitled"}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${post.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                      <span className="font-sans text-[12px] text-muted">
                        {post.date}
                      </span>
                      {post.tags?.slice(0, 2).map(tag => (
                        <span key={tag} className="font-sans text-[11px] text-muted bg-gray-100 px-1.5 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 pr-2">
                  <button onClick={() => setEditingPost(post)} className="text-muted hover:text-[#0F6E56] transition-colors">
                    <i className="ti ti-edit text-[18px]"></i>
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="text-muted hover:text-[#A32D2D] transition-colors">
                    <i className="ti ti-trash text-[18px]"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const EditorView = ({ post, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...post });
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});

  const SUGGESTED_TAGS = ['career', 'email', 'lab life', 'internship', 'gate', 'academics', 'science comm', 'stem cells', 'protein', 'molecular biology'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData(prev => {
      const next = { ...prev, [name]: val };
      if (name === 'title' && !post.slug) {
        next.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      return next;
    });
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = tagInput.trim();
      if (val && !formData.tags.includes(val)) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, val] }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const addTag = (tag) => {
    if (!formData.tags.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title || formData.title.length < 3) newErrors.title = "Title must be at least 3 characters";
    if (!formData.slug || !/^[a-z0-9-]+$/.test(formData.slug)) newErrors.slug = "Slug must contain only lowercase letters, numbers, and hyphens";
    if (!formData.excerpt || formData.excerpt.length > 200) newErrors.excerpt = "Excerpt is required and must be under 200 chars";
    if (!formData.content || formData.content.length < 50) newErrors.content = "Content must be at least 50 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const save = (published) => {
    if (!validate()) return;
    
    // Sanitize before saving
    const sanitizedPost = {
      ...formData,
      title: DOMPurify.sanitize(formData.title, { ALLOWED_TAGS: [] }),
      excerpt: DOMPurify.sanitize(formData.excerpt, { ALLOWED_TAGS: [] }),
      content: DOMPurify.sanitize(formData.content), // allow HTML for markdown conversion safely? actually markdown is rendered later, but sanitize anyway
      published
    };
    
    onSave(sanitizedPost);
  };

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <button onClick={onClose} className="text-[#0F6E56] font-sans text-[13px] font-medium mb-6 flex items-center gap-1 hover:underline">
        &larr; Back to posts
      </button>

      <div className="space-y-6">
        <div>
          <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">Post title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border border-[#E2E2DF] rounded-lg px-4 py-2 font-sans text-[15px] focus:outline-none focus:border-[#0F6E56]" />
          {errors.title && <p className="text-[#A32D2D] text-[12px] mt-1 font-sans">{errors.title}</p>}
        </div>

        <div>
          <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">URL slug</label>
          <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full border border-[#E2E2DF] rounded-lg px-4 py-2 font-sans text-[15px] focus:outline-none focus:border-[#0F6E56]" />
          <p className="text-muted text-[12px] mt-1 font-sans">Will be available at: /blog/{formData.slug || '...'}</p>
          {errors.slug && <p className="text-[#A32D2D] text-[12px] mt-1 font-sans">{errors.slug}</p>}
        </div>

        <div>
          <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">Excerpt (shown on blog listing)</label>
          <textarea name="excerpt" rows="2" value={formData.excerpt} onChange={handleChange} className="w-full border border-[#E2E2DF] rounded-lg px-4 py-2 font-sans text-[15px] focus:outline-none focus:border-[#0F6E56]" />
          <div className="flex justify-between items-center mt-1">
            <p className="text-muted text-[12px] font-sans">{formData.excerpt.length} / 200</p>
            {errors.excerpt && <p className="text-[#A32D2D] text-[12px] font-sans">{errors.excerpt}</p>}
          </div>
        </div>

        <div>
          <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">Cover emoji</label>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#E1F5EE] rounded flex items-center justify-center text-[20px] shrink-0">
              {formData.coverEmoji}
            </div>
            <input type="text" name="coverEmoji" maxLength="2" value={formData.coverEmoji} onChange={handleChange} placeholder="🔬" className="w-20 border border-[#E2E2DF] rounded-lg px-4 py-2 font-sans text-[15px] focus:outline-none focus:border-[#0F6E56] text-center" />
          </div>
        </div>

        <div>
          <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">Tags (press Enter or comma to add)</label>
          <div className="w-full border border-[#E2E2DF] rounded-lg p-2 flex flex-wrap gap-2 items-center bg-white focus-within:border-[#0F6E56]">
            {formData.tags.map(tag => (
              <div key={tag} className="flex items-center gap-1 bg-[#F0FBF7] text-[#0F6E56] px-2.5 py-1 rounded-full text-[13px] font-sans">
                <span>{tag}</span>
                <button onClick={() => removeTag(tag)} className="hover:text-foreground opacity-60 hover:opacity-100">&times;</button>
              </div>
            ))}
            <input 
              type="text" 
              value={tagInput} 
              onChange={(e) => setTagInput(e.target.value)} 
              onKeyDown={handleTagKeyDown}
              className="flex-1 min-w-[120px] outline-none font-sans text-[14px] bg-transparent"
              placeholder="Add tag..." 
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {SUGGESTED_TAGS.filter(t => !formData.tags.includes(t)).map(tag => (
              <button key={tag} onClick={() => addTag(tag)} className="text-[11px] text-muted bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded font-sans transition-colors">
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">Content (markdown supported)</label>
          <textarea name="content" rows="16" value={formData.content} onChange={handleChange} className="w-full border border-[#E2E2DF] rounded-lg px-4 py-3 font-mono text-[14px] focus:outline-none focus:border-[#0F6E56] leading-relaxed" />
          <p className="text-muted text-[11px] mt-1 font-sans">Supports markdown — **bold**, ## headings, - lists</p>
          {errors.content && <p className="text-[#A32D2D] text-[12px] mt-1 font-sans">{errors.content}</p>}
        </div>

        <div className="flex items-center justify-between p-4 border border-[#E2E2DF] rounded-lg bg-[#FAFAF8]">
          <span className="font-sans text-[14px] font-medium text-foreground">Published</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F6E56]"></div>
          </label>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 left-[220px] md:left-[220px] left-0 p-4 bg-white border-t border-[#E2E2DF] flex justify-end gap-3 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl w-full mx-auto flex justify-end gap-3 px-4 md:px-8">
          <button onClick={() => save(false)} className="px-5 py-2 rounded-lg font-sans text-[14px] font-medium border border-[#E2E2DF] hover:bg-gray-50 transition-colors">
            Save draft
          </button>
          <button onClick={() => save(true)} className="px-5 py-2 rounded-lg font-sans text-[14px] font-medium bg-[#0F6E56] text-white hover:bg-[#0c5946] transition-colors">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogManager;
