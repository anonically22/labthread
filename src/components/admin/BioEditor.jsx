import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { getAuthorData, saveAuthorData } from '../../utils/authorStore';
import { useToast } from '../Toast';
import ExperienceCard from '../ExperienceCard';
import profileImage from '../../assets/profile.png';

const BioEditor = () => {
  const [formData, setFormData] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    setFormData(getAuthorData());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleExpChange = (index, field, value) => {
    setFormData(prev => {
      const exps = [...prev.notableExperiences];
      exps[index] = { ...exps[index], [field]: value };
      return { ...prev, notableExperiences: exps };
    });
  };

  const handleSave = () => {
    // Sanitize
    const sanitized = {
      ...formData,
      name: DOMPurify.sanitize(formData.name, { ALLOWED_TAGS: [] }),
      currentStatus: DOMPurify.sanitize(formData.currentStatus, { ALLOWED_TAGS: [] }),
      bio1: DOMPurify.sanitize(formData.bio1, { ALLOWED_TAGS: [] }),
      bio2: DOMPurify.sanitize(formData.bio2, { ALLOWED_TAGS: [] }),
      linkedin: DOMPurify.sanitize(formData.linkedin, { ALLOWED_TAGS: [] }),
      wordpress: DOMPurify.sanitize(formData.wordpress, { ALLOWED_TAGS: [] }),
      medium: DOMPurify.sanitize(formData.medium, { ALLOWED_TAGS: [] }),
      notableExperiences: formData.notableExperiences.map(exp => ({
        ...exp,
        title: DOMPurify.sanitize(exp.title, { ALLOWED_TAGS: [] }),
        description: DOMPurify.sanitize(exp.description, { ALLOWED_TAGS: [] })
      }))
    };
    
    saveAuthorData(sanitized);
    showToast("Author bio saved", "success");
  };

  if (!formData) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-10 h-full">
      {/* Editor Column */}
      <div className="flex-1 overflow-y-auto pr-4 space-y-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-serif text-2xl font-bold text-foreground">Author bio</h2>
          <button onClick={handleSave} className="bg-[#0F6E56] text-white font-sans text-[13px] font-medium px-4 py-2 rounded-lg hover:bg-[#0c5946] transition-colors">
            Save changes
          </button>
        </div>

        <div className="space-y-6 bg-white p-6 rounded-xl border border-[#E2E2DF]">
          <div>
            <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">Display name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-[#E2E2DF] rounded-lg px-4 py-2 font-sans text-[15px] focus:outline-none focus:border-[#0F6E56]" />
          </div>
          <div>
            <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">Current status badge text</label>
            <input type="text" name="currentStatus" value={formData.currentStatus} onChange={handleChange} className="w-full border border-[#E2E2DF] rounded-lg px-4 py-2 font-sans text-[15px] focus:outline-none focus:border-[#0F6E56]" />
          </div>
          <div>
            <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">Bio — first paragraph</label>
            <textarea name="bio1" rows="3" value={formData.bio1} onChange={handleChange} className="w-full border border-[#E2E2DF] rounded-lg px-4 py-2 font-sans text-[15px] focus:outline-none focus:border-[#0F6E56]" />
          </div>
          <div>
            <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">Bio — second paragraph</label>
            <textarea name="bio2" rows="3" value={formData.bio2} onChange={handleChange} className="w-full border border-[#E2E2DF] rounded-lg px-4 py-2 font-sans text-[15px] focus:outline-none focus:border-[#0F6E56]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">LinkedIn URL</label>
              <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full border border-[#E2E2DF] rounded-lg px-3 py-2 font-sans text-[14px] focus:outline-none focus:border-[#0F6E56]" />
            </div>
            <div>
              <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">WordPress blog URL</label>
              <input type="url" name="wordpress" value={formData.wordpress} onChange={handleChange} className="w-full border border-[#E2E2DF] rounded-lg px-3 py-2 font-sans text-[14px] focus:outline-none focus:border-[#0F6E56]" />
            </div>
            <div>
              <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">Medium URL</label>
              <input type="url" name="medium" value={formData.medium} onChange={handleChange} className="w-full border border-[#E2E2DF] rounded-lg px-3 py-2 font-sans text-[14px] focus:outline-none focus:border-[#0F6E56]" />
            </div>
          </div>
        </div>

        <h3 className="font-sans font-medium text-[15px] text-foreground mt-8">Experience Cards</h3>
        <div className="space-y-4">
          {formData.notableExperiences.map((exp, index) => (
            <div key={exp.id} className="bg-white p-5 rounded-xl border border-[#E2E2DF] space-y-4">
              <h4 className="font-sans text-[12px] font-semibold text-muted uppercase tracking-wider">Experience card {index + 1}</h4>
              <div>
                <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">Card title</label>
                <input type="text" value={exp.title} onChange={(e) => handleExpChange(index, 'title', e.target.value)} className="w-full border border-[#E2E2DF] rounded-lg px-4 py-2 font-sans text-[15px] focus:outline-none focus:border-[#0F6E56]" />
              </div>
              <div>
                <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">Card description</label>
                <textarea rows="2" value={exp.description} onChange={(e) => handleExpChange(index, 'description', e.target.value)} className="w-full border border-[#E2E2DF] rounded-lg px-4 py-2 font-sans text-[15px] focus:outline-none focus:border-[#0F6E56]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Preview Column */}
      <div className="hidden lg:block w-[400px] shrink-0 sticky top-0 h-fit bg-[#F0FBF7]/50 border border-[#0F6E56]/20 rounded-xl p-6 overflow-hidden">
        <h3 className="font-sans font-medium text-[12px] uppercase tracking-wider text-[#0F6E56] mb-6 flex items-center gap-2">
          <i className="ti ti-eye"></i> Live Preview
        </h3>
        <div className="scale-[0.7] origin-top-left w-[142%] pointer-events-none">
          <div className="flex flex-col items-start mb-8">
            <img src={profileImage} alt={formData.name} className="w-24 h-24 rounded-full object-cover mb-4 shadow-sm" />
            <h3 className="text-[15px] font-medium font-sans text-foreground mb-2">
              {formData.name}
            </h3>
            <div className="bg-primary-light text-primary text-xs font-medium px-3 py-1 rounded-full mb-4">
              {formData.currentStatus}
            </div>
          </div>
          <div className="text-gray-600 font-sans leading-relaxed space-y-4 mb-8">
            <p>{formData.bio1}</p>
            <p>{formData.bio2}</p>
          </div>
          <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
            Notable experiences
          </h4>
          <div className="flex flex-col gap-4">
            {formData.notableExperiences.map((exp) => (
              <ExperienceCard key={exp.id} title={exp.title} description={exp.description} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioEditor;
