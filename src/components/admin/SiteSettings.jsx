import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { getSettings, saveSettings } from '../../utils/settingsStore';
import { useToast } from '../Toast';

const SiteSettings = () => {
  const [formData, setFormData] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    setFormData(getSettings());
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSave = () => {
    const sanitized = {
      ...formData,
      siteTagline: DOMPurify.sanitize(formData.siteTagline, { ALLOWED_TAGS: [] }),
      heroSubtext: DOMPurify.sanitize(formData.heroSubtext, { ALLOWED_TAGS: [] }),
      heroStat1: DOMPurify.sanitize(formData.heroStat1, { ALLOWED_TAGS: [] }),
      heroStat2: DOMPurify.sanitize(formData.heroStat2, { ALLOWED_TAGS: [] }),
      heroStat3: DOMPurify.sanitize(formData.heroStat3, { ALLOWED_TAGS: [] }),
      ctaHeading: DOMPurify.sanitize(formData.ctaHeading, { ALLOWED_TAGS: [] }),
      ctaSubtext: DOMPurify.sanitize(formData.ctaSubtext, { ALLOWED_TAGS: [] }),
      askPageSubtext: DOMPurify.sanitize(formData.askPageSubtext, { ALLOWED_TAGS: [] })
    };
    saveSettings(sanitized);
    showToast("Settings saved", "success");
  };

  if (!formData) return null;

  return (
    <div className="max-w-3xl mx-auto pb-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-2xl font-bold text-foreground">Site settings</h2>
        <button onClick={handleSave} className="bg-[#0F6E56] text-white font-sans text-[13px] font-medium px-4 py-2 rounded-lg hover:bg-[#0c5946] transition-colors">
          Save settings
        </button>
      </div>

      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-white p-6 rounded-xl border border-[#E2E2DF] space-y-6">
          <h3 className="font-sans text-[15px] font-semibold text-foreground border-b border-[#E2E2DF] pb-3">Hero text</h3>
          <div>
            <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">Site tagline</label>
            <textarea name="siteTagline" rows="2" value={formData.siteTagline} onChange={handleChange} className="w-full border border-[#E2E2DF] rounded-lg px-4 py-2 font-sans text-[15px] focus:outline-none focus:border-[#0F6E56]" />
          </div>
          <div>
            <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">Hero subtext</label>
            <textarea name="heroSubtext" rows="3" value={formData.heroSubtext} onChange={handleChange} className="w-full border border-[#E2E2DF] rounded-lg px-4 py-2 font-sans text-[15px] focus:outline-none focus:border-[#0F6E56]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">Stat 1</label>
              <input type="text" name="heroStat1" value={formData.heroStat1} onChange={handleChange} className="w-full border border-[#E2E2DF] rounded-lg px-3 py-2 font-sans text-[14px] focus:outline-none focus:border-[#0F6E56]" />
            </div>
            <div>
              <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">Stat 2</label>
              <input type="text" name="heroStat2" value={formData.heroStat2} onChange={handleChange} className="w-full border border-[#E2E2DF] rounded-lg px-3 py-2 font-sans text-[14px] focus:outline-none focus:border-[#0F6E56]" />
            </div>
            <div>
              <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">Stat 3</label>
              <input type="text" name="heroStat3" value={formData.heroStat3} onChange={handleChange} className="w-full border border-[#E2E2DF] rounded-lg px-3 py-2 font-sans text-[14px] focus:outline-none focus:border-[#0F6E56]" />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white p-6 rounded-xl border border-[#E2E2DF] space-y-6">
          <h3 className="font-sans text-[15px] font-semibold text-foreground border-b border-[#E2E2DF] pb-3">CTA strip (Home)</h3>
          <div>
            <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">CTA heading</label>
            <input type="text" name="ctaHeading" value={formData.ctaHeading} onChange={handleChange} className="w-full border border-[#E2E2DF] rounded-lg px-4 py-2 font-sans text-[15px] focus:outline-none focus:border-[#0F6E56]" />
          </div>
          <div>
            <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">CTA subtext</label>
            <input type="text" name="ctaSubtext" value={formData.ctaSubtext} onChange={handleChange} className="w-full border border-[#E2E2DF] rounded-lg px-4 py-2 font-sans text-[15px] focus:outline-none focus:border-[#0F6E56]" />
          </div>
        </div>

        {/* Ask Page Section */}
        <div className="bg-white p-6 rounded-xl border border-[#E2E2DF] space-y-6">
          <h3 className="font-sans text-[15px] font-semibold text-foreground border-b border-[#E2E2DF] pb-3">Ask page</h3>
          <div>
            <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">Ask page subtext</label>
            <textarea name="askPageSubtext" rows="2" value={formData.askPageSubtext} onChange={handleChange} className="w-full border border-[#E2E2DF] rounded-lg px-4 py-2 font-sans text-[15px] focus:outline-none focus:border-[#0F6E56]" />
          </div>
        </div>

        {/* Maintenance Section */}
        <div className="bg-white p-6 rounded-xl border border-[#A32D2D]/30 space-y-4">
          <h3 className="font-sans text-[15px] font-semibold text-[#A32D2D] border-b border-[#A32D2D]/20 pb-3">Danger zone</h3>
          <div className="flex items-center justify-between p-4 border border-[#A32D2D]/20 rounded-lg bg-[#FDF3F3]">
            <div>
              <span className="font-sans text-[14px] font-medium text-foreground block">Maintenance mode</span>
              <span className="font-sans text-[12px] text-muted">When active, the public site is hidden behind a maintenance screen.</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
              <input type="checkbox" name="maintenanceMode" checked={formData.maintenanceMode} onChange={handleChange} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#A32D2D]"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteSettings;
