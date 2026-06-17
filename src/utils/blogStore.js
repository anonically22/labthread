import { getItem, setItem, removeItem } from './storage';
import { blogPosts as seedPosts } from '../data/seeds';
import DOMPurify from 'dompurify';

const POSTS_KEY = 'labthread_posts';

export const getAllPosts = () => {
  const posts = getItem(POSTS_KEY);
  if (!posts || posts.length === 0) {
    setItem(POSTS_KEY, seedPosts);
    return seedPosts;
  }
  return posts;
};

export const getPublishedPosts = () => {
  const posts = getAllPosts();
  return posts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
};

export const getPostBySlug = (slug) => {
  const posts = getAllPosts();
  return posts.find(post => post.slug === slug) || null;
};

export const savePost = (post) => {
  const posts = getAllPosts();
  
  // Sanitize the content before saving
  const sanitizedPost = {
    ...post,
    content: DOMPurify.sanitize(post.content)
  };

  const existingIndex = posts.findIndex(p => p.id === sanitizedPost.id);
  if (existingIndex >= 0) {
    posts[existingIndex] = sanitizedPost;
  } else {
    posts.push(sanitizedPost);
  }
  setItem(POSTS_KEY, posts);
  return sanitizedPost;
};

export const deletePost = (id) => {
  let posts = getAllPosts();
  posts = posts.filter(post => post.id !== id);
  setItem(POSTS_KEY, posts);
};
