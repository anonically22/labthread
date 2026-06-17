import React, { useState, useEffect } from 'react';

const getRealEmail = () => "moc.liamg@3071rupunlap".split("").reverse().join("");

const Ask = () => {
  const [mountTime, setMountTime] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    question: '',
    website: '' // honeypot
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMountTime(Date.now());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Cap question at 800 chars
    if (name === 'question' && value.length > 800) {
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.email.includes('@') &&
      formData.category !== '' &&
      formData.question.trim().length >= 30
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Spam protection: honeypot and timegate
    const timeElapsed = Date.now() - mountTime;
    const isBot = formData.website !== '' || timeElapsed < 4000;

    if (!isBot) {
      const targetEmail = getRealEmail();
      
      const subject = `[LabThread] ${formData.category} — question from ${formData.name}`;
      const body = `Hi Nupur,

I found LabThread and wanted to ask you something.

Name: ${formData.name}
Email: ${formData.email}
Category: ${formData.category}

Question:
${formData.question}

---
Sent via LabThread · labthread.vercel.app`;

      const mailtoString = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoString;
    }
    
    // Fake success for bots, real success for users
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pb-20 pt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
            Ask a question
          </h1>
          <p className="text-muted font-sans text-[14px] max-w-[560px] mx-auto">
            Have a question about research life, internship applications, or navigating biotech? Ask below — Nupur reads every message and replies when she can.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* LEFT: FORM */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot */}
              <input 
                type="text" 
                name="website" 
                value={formData.website} 
                onChange={handleChange} 
                style={{ display: 'none' }} 
                tabIndex="-1" 
                autoComplete="off" 
              />
              
              <div>
                <label className="block font-sans text-[14px] font-medium text-foreground mb-1.5">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Priya Sharma"
                  className="w-full border border-[#E2E2DF] rounded-lg px-4 py-2.5 font-sans text-[15px] focus:outline-none focus:border-[#0F6E56] focus:ring-1 focus:ring-[#0F6E56]"
                />
              </div>

              <div>
                <label className="block font-sans text-[14px] font-medium text-foreground mb-1.5">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="so Nupur can reply"
                  className="w-full border border-[#E2E2DF] rounded-lg px-4 py-2.5 font-sans text-[15px] focus:outline-none focus:border-[#0F6E56] focus:ring-1 focus:ring-[#0F6E56]"
                />
              </div>

              <div>
                <label className="block font-sans text-[14px] font-medium text-foreground mb-1.5">
                  What is this about?
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full border border-[#E2E2DF] rounded-lg px-4 py-2.5 font-sans text-[15px] bg-white focus:outline-none focus:border-[#0F6E56] focus:ring-1 focus:ring-[#0F6E56]"
                >
                  <option value="" disabled>Select a category</option>
                  <option value="Cold emailing a PI">Cold emailing a PI</option>
                  <option value="Lab internship application">Lab internship application</option>
                  <option value="GATE / exam preparation">GATE / exam preparation</option>
                  <option value="Research career advice">Research career advice</option>
                  <option value="Something else">Something else</option>
                </select>
              </div>

              <div>
                <label className="block font-sans text-[14px] font-medium text-foreground mb-1.5">
                  Your question
                </label>
                <textarea
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  required
                  minLength={30}
                  rows={5}
                  placeholder="Write your question here. The more context you give, the more useful the reply will be."
                  className="w-full border border-[#E2E2DF] rounded-lg px-4 py-2.5 font-sans text-[15px] focus:outline-none focus:border-[#0F6E56] focus:ring-1 focus:ring-[#0F6E56] resize-y"
                />
                <div className="text-right text-[12px] text-muted mt-1 font-sans">
                  {formData.question.length} / 800 characters
                </div>
              </div>

              <button
                type="submit"
                disabled={!isFormValid()}
                className="w-full bg-[#0F6E56] text-white font-sans font-medium text-[15px] rounded-lg h-[44px] flex items-center justify-center hover:bg-[#0c5946] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send via email &rarr;
              </button>

              {submitted && (
                <div className="flex items-start gap-2 mt-4 text-[#0F6E56]">
                  <i className="ti ti-circle-check text-[20px] shrink-0 mt-0.5"></i>
                  <p className="font-sans text-[13px] leading-relaxed">
                    Your email client should have opened with your message ready to send. If it didn't, you can email Nupur directly at {getRealEmail()}
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* RIGHT: PREVIEW */}
          <div className="bg-white border border-[#E2E2DF] rounded-xl overflow-hidden sticky top-6 shadow-sm">
            <div className="bg-[#E1F5EE] px-4 py-2.5 flex items-center justify-between border-b border-[#E2E2DF]">
              <div className="flex items-center gap-2">
                <i className="ti ti-mail text-[16px] text-[#0F6E56]"></i>
                <span className="font-sans text-[13px] font-medium text-[#0F6E56]">Email preview</span>
              </div>
              <span className="font-sans text-[11px] text-muted">updates as you type</span>
            </div>
            <div className="p-5 font-sans text-[13px] leading-[1.8] text-[#3D3D3A] whitespace-pre-wrap">
              <div>To: p***@gmail.com</div>
              <div>
                Subject: {formData.category && formData.name ? `[LabThread] ${formData.category} — question from ${formData.name}` : "-------------------------------------"}
              </div>
              <div className="my-3 text-[#E2E2DF]">─────────────────────────────────</div>
              <div>Hi Nupur,</div>
              <div className="mt-4">I found LabThread and wanted to ask you something.</div>
              <div className="mt-4">
                Name: {formData.name || "—"}
                <br />
                Email: {formData.email || "—"}
                <br />
                Category: {formData.category || "—"}
              </div>
              <div className="mt-4">Question:</div>
              <div className="mt-1">{formData.question || "Your question will appear here..."}</div>
              <div className="my-3 text-[#E2E2DF]">─────────────────────────────────</div>
              <div>Sent via LabThread · labthread.vercel.app</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ask;
