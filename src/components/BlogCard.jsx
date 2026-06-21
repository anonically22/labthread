import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const BlogCard = ({ post }) => {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const displayTags = post.tags.slice(0, 2);

  return (
    <motion.div variants={itemVariants} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
      <Link 
        to={`/blog/${post.slug}`} 
        className="block h-full bg-paper border-t border-steel/20 pt-5 hover:border-thread transition-all duration-200"
      >
        <div className="w-8 h-8 flex items-center justify-center text-ink mb-2">
          {/* Single-line ink icon */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          </svg>
        </div>
        
        <h3 className="font-display font-[500] text-[20px] text-ink mt-3 leading-tight line-clamp-2">
          {post.title}
        </h3>
        
        <p className="font-body text-[14px] text-steel mt-2 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between mt-4 overflow-hidden gap-4">
          <span className="font-mono text-[12.5px] uppercase tracking-wider text-steel shrink-0">
            {formattedDate}
          </span>
          <div className="flex gap-2 overflow-hidden items-center justify-end">
            {displayTags.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-beige text-ink rounded-[4px] font-mono text-[11px] uppercase tracking-wider whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
