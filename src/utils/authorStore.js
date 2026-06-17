import { DEFAULT_AUTHOR_DATA } from '../data/authorData';

const STORAGE_KEY = 'labthread_author';

export const getAuthorData = () => {
  if (typeof window === 'undefined') return DEFAULT_AUTHOR_DATA;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return DEFAULT_AUTHOR_DATA;
  try {
    const parsed = JSON.parse(stored);
    return { ...DEFAULT_AUTHOR_DATA, ...parsed };
  } catch (e) {
    return DEFAULT_AUTHOR_DATA;
  }
};

export const saveAuthorData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
};
