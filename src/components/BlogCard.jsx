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
    <motion.div variants={itemVariants}>
      <Link 
        to={`/blog/${post.slug}`} 
        className="block h-full bg-white border border-[#E2E2DF] rounded-xl p-5 hover:border-gray-400 transition-colors duration-200"
      >
        <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center text-[22px]">
          {post.coverEmoji}
        </div>
        
        <h3 className="font-serif text-[18px] text-foreground mt-3 leading-tight line-clamp-2">
          {post.title}
        </h3>
        
        <p className="font-sans text-[13px] text-gray-500 mt-2 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-[12px] text-gray-400">
            {formattedDate}
          </span>
          <div className="flex gap-2">
            {displayTags.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[11px] font-medium tracking-wide">
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
