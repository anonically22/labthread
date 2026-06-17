import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug, getPublishedPosts } from '../utils/blogStore';
import BlogCard from '../components/BlogCard';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const foundPost = getPostBySlug(slug);
    setPost(foundPost);
    
    if (foundPost) {
      const allPublished = getPublishedPosts();
      const others = allPublished.filter(p => p.id !== foundPost.id).slice(0, 2);
      setRecentPosts(others);
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-serif font-bold text-foreground mb-4">Post not found</h1>
        <Link to="/blog" className="text-[13px] text-primary hover:underline">
          &larr; Back to blog
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link to="/blog" className="inline-block text-[13px] text-primary font-medium hover:underline mb-8">
          &larr; Back to blog
        </Link>
        
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary-light rounded-xl flex items-center justify-center text-3xl">
            {post.coverEmoji}
          </div>
        </div>

        <h1 className="text-[28px] font-serif font-bold text-foreground text-center max-w-[640px] mx-auto leading-snug mb-6">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500 mb-10">
          <span>{formattedDate}</span>
          <span>&middot;</span>
          <div className="flex gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-[11px] font-medium tracking-wide">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <hr className="border-gray-200 max-w-[680px] mx-auto mb-10" />
      </div>

      <div className="max-w-[680px] mx-auto px-4 markdown-content">
        <ReactMarkdown
          components={{
            h2: ({node, ...props}) => <h2 className="font-serif text-[22px] font-bold text-foreground mt-8 mb-3" {...props} />,
            h3: ({node, ...props}) => <h3 className="font-sans text-[17px] font-medium text-foreground mt-6 mb-2" {...props} />,
            p: ({node, ...props}) => <p className="font-sans text-[16px] leading-[1.8] text-[#3D3D3A] mb-4" {...props} />,
            strong: ({node, ...props}) => <strong className="font-medium text-foreground" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4" {...props} />,
            li: ({node, ...props}) => <li className="font-sans text-[15px] text-[#3D3D3A] mb-1" {...props} />
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {recentPosts.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-12 border-t border-gray-200">
          <h3 className="font-serif text-2xl font-bold text-foreground mb-6">More posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {recentPosts.map(p => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default BlogPost;
