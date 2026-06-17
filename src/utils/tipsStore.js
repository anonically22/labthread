import DOMPurify from 'dompurify';

const STORAGE_KEY = 'labthread_tips';

const SEED_TIPS = [
  {
    id: "tip_001",
    category: "Cold email to PI",
    title: "Lead with their research, not your CV",
    body: "The most common mistake in PI cold emails is opening with who you are. The PI does not know you yet — and does not need to, in the first line. Open with one specific thing about their work that genuinely interested you. Not the lab page headline. A finding from a paper, a technique they pioneered, a question their work left open. This proves you did the reading. Everything else — your name, your institution, your skills — comes after.",
    order: 1
  },
  {
    id: "tip_002",
    category: "Cold email to PI",
    title: "Keep it under 200 words — always",
    body: "PIs are busy. A long email signals that you don't respect that, or that you can't edit your own writing — neither is a good first impression. The structure that works: one sentence on their research (specific), two sentences on who you are and what's relevant about you, one sentence on what you're asking for (a call, a visit, a short-term project), and a note that your CV is attached. That's it. Read it out loud before sending — if it takes more than 90 seconds, cut something.",
    order: 2
  },
  {
    id: "tip_003",
    category: "Lab internship inquiry",
    title: "Be specific about when and for how long",
    body: "Vague availability is one of the most common reasons internship inquiry emails don't get replies. 'I am available this summer' tells a lab coordinator nothing useful. Tell them exactly: the start date, end date, and whether you're flexible. Also mention whether you need a stipend or can work without one — labs have budgets and this affects their decision, so being upfront saves time for both sides.",
    order: 3
  },
  {
    id: "tip_004",
    category: "Follow-up email",
    title: "Follow up exactly once, after 10 days",
    body: "If you haven't heard back in 10 days, one follow-up is appropriate. Keep it to two sentences: a brief reminder of your original email and a polite note that you remain interested. Do not apologize for following up — you haven't done anything wrong. Do not follow up a second time. If there is still no reply after the follow-up, move on. Persistence reads as desperation past this point, and it rarely changes the outcome.",
    order: 4
  }
];

export const getAllTips = () => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  let tips = [];
  if (!stored) {
    tips = SEED_TIPS;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tips));
  } else {
    try {
      tips = JSON.parse(stored);
      if (!Array.isArray(tips) || tips.length === 0) {
        tips = SEED_TIPS;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tips));
      }
    } catch (e) {
      tips = SEED_TIPS;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tips));
    }
  }
  return tips.sort((a, b) => a.order - b.order);
};

export const saveTip = (tip) => {
  const tips = getAllTips();
  const index = tips.findIndex(t => t.id === tip.id);
  
  const sanitizedTip = {
    ...tip,
    body: DOMPurify.sanitize(tip.body)
  };

  if (index >= 0) {
    tips[index] = sanitizedTip;
  } else {
    tips.push(sanitizedTip);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tips));
  return tips.sort((a, b) => a.order - b.order);
};

export const deleteTip = (id) => {
  let tips = getAllTips();
  tips = tips.filter(t => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tips));
  return tips;
};

export const reorderTips = (orderedIds) => {
  let tips = getAllTips();
  const tipsMap = new Map(tips.map(t => [t.id, t]));
  
  const reordered = orderedIds.map((id, index) => {
    const tip = tipsMap.get(id);
    if (tip) {
      tip.order = index + 1;
      return tip;
    }
    return null;
  }).filter(Boolean);

  // keep any tips that weren't in the orderedIds list at the end
  const remaining = tips.filter(t => !orderedIds.includes(t.id));
  const newTips = [...reordered, ...remaining];
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newTips));
  return newTips;
};
