import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-serif font-bold text-foreground mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg text-gray-600 font-sans">
          <p className="mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <h2 className="text-2xl font-serif font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            LabThread is a static platform. We do not require you to create an account, and we do not collect personal data such as names or emails for standard browsing. If you use the "Ask Nupur" feature, your email client will be opened locally on your device, and no data is transmitted through our servers.
          </p>

          <h2 className="text-2xl font-serif font-semibold text-foreground mt-8 mb-4">2. Cookies and Local Storage</h2>
          <p className="mb-4">
            We use local storage (specifically <code>localStorage</code> and <code>sessionStorage</code>) to maintain administrative sessions and store draft content purely on your device. We do not use tracking cookies or third-party analytics that monitor your behavior across other websites.
          </p>

          <h2 className="text-2xl font-serif font-semibold text-foreground mt-8 mb-4">3. Data Security</h2>
          <p className="mb-4">
            We implement reasonable security measures to protect against unauthorized access to our administrative interfaces. However, because LabThread operates primarily client-side, any data you store locally is subject to the security of your own device.
          </p>

          <h2 className="text-2xl font-serif font-semibold text-foreground mt-8 mb-4">4. Changes to This Policy</h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2 className="text-2xl font-serif font-semibold text-foreground mt-8 mb-4">5. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us via the "Ask Nupur" section.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Privacy;
