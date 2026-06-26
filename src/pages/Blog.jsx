import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import blogsData from '../data/blogs.json';
import BlogCard from '../components/BlogCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      when: "beforeChildren"
    }
  }
};

const allTagsList = [
  "All", "career", "email", "lab life", "internship", "gate", "academics", "science comm"
];

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [activeTag, setActiveTag] = useState("All");

  useEffect(() => {
    const published = blogsData
      .filter(post => post.published)
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    setPosts(published);
  }, []);

  const filteredPosts = activeTag === "All" 
    ? posts 
    : posts.filter(post => post.tags.includes(activeTag));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-serif font-bold text-foreground mb-2 text-center md:text-left">
        Blog
      </h1>
      <p className="text-gray-500 font-sans mb-8 text-center md:text-left">
        Writing on biotech, research life, and navigating science.
      </p>

      {/* Tag filter row */}
      <div className="flex overflow-x-auto pb-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 gap-3 scrollbar-hide">
        {allTagsList.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeTag === tag
                ? 'bg-primary text-white border border-primary'
                : 'bg-white text-primary border border-primary hover:bg-primary-light'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Post grid */}
      {filteredPosts.length > 0 ? (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {filteredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20">
          <p className="text-[14px] text-gray-500 font-sans">
            No posts yet in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default Blog;
