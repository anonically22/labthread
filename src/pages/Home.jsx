import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import AboutAuthor from '../components/AboutAuthor';
import BlogCard from '../components/BlogCard';
import TipCard from '../components/TipCard';
import { getPublishedPosts } from '../utils/blogStore';
import { getAllTips } from '../utils/tipsStore';
import { getSettings } from '../utils/settingsStore';
import { Link } from 'react-router-dom';

const Home = () => {
  const recentPosts = getPublishedPosts().slice(0, 3);
  const [tips, setTips] = useState([]);
  const [settings, setSettings] = useState(null);
  const [openTipId, setOpenTipId] = useState(null);

  useEffect(() => {
    setTips(getAllTips().slice(0, 2));
    setSettings(getSettings());
  }, []);

  return (
    <div className="min-h-screen pb-20">
      <Hero />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-[#E2E2DF]" />
      </div>
      <AboutAuthor />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-3xl font-serif font-bold text-foreground mb-8 text-center md:text-left">
          Latest from the blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {recentPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        <div className="text-center">
          <Link to="/blog" className="text-[#0F6E56] text-[14px] font-medium font-sans hover:underline">
            Read all posts &rarr;
          </Link>
        </div>

        {/* Quick email tips section */}
        <div className="mt-20">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-8 text-center md:text-left">
            Quick email tips
          </h2>
          <div className="flex flex-col gap-3 mb-6 max-w-3xl mx-auto md:mx-0">
            {tips.map(tip => (
              <TipCard 
                key={tip.id} 
                tip={tip} 
                isOpen={openTipId === tip.id}
                onToggle={() => setOpenTipId(openTipId === tip.id ? null : tip.id)}
              />
            ))}
          </div>
          <div className="text-center md:text-left">
            <Link to="/tips" className="text-[#0F6E56] text-[14px] font-medium font-sans hover:underline">
              See all tips &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Ask a question CTA strip */}
      <div className="bg-[#0F6E56] w-full py-12 px-6 mt-20 text-center">
        <h2 className="text-white font-serif text-2xl md:text-3xl mb-2">{settings?.ctaHeading || "Have a question about research life?"}</h2>
        <p className="text-white/80 font-sans text-[15px] mb-6">{settings?.ctaSubtext || "Ask Nupur directly — she reads every message."}</p>
        <Link to="/ask" className="inline-block bg-white text-[#0F6E56] font-sans font-medium text-[15px] py-3 px-7 rounded-lg hover:bg-gray-50 transition-colors">
          Ask a question &rarr;
        </Link>
      </div>
    </div>
  );
};

export default Home;
