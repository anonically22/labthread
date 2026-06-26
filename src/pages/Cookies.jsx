import { motion } from 'framer-motion';

const Cookies = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-serif font-bold text-foreground mb-8">Cookies Policy</h1>
        
        <div className="prose prose-lg text-gray-600 font-sans">
          <p className="mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <h2 className="text-2xl font-serif font-semibold text-foreground mt-8 mb-4">1. What are cookies?</h2>
          <p className="mb-4">
            Cookies are small text files that are placed on your computer or mobile device when you browse websites. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
          </p>

          <h2 className="text-2xl font-serif font-semibold text-foreground mt-8 mb-4">2. How we use cookies</h2>
          <p className="mb-4">
            We use cookies to understand how you interact with our website, to improve your experience, and to remember your preferences. This includes both session cookies (which expire when you close your browser) and persistent cookies (which stay on your device for a set period).
          </p>

          <h2 className="text-2xl font-serif font-semibold text-foreground mt-8 mb-4">3. Types of cookies we use</h2>
          <p className="mb-4">
            - <strong>Essential Cookies:</strong> Required for the basic functioning of our website.
            <br />
            - <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting and reporting information anonymously.
          </p>

          <h2 className="text-2xl font-serif font-semibold text-foreground mt-8 mb-4">4. Managing cookies</h2>
          <p className="mb-4">
            Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Cookies;
