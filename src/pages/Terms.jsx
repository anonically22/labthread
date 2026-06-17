import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-serif font-bold text-foreground mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg text-gray-600 font-sans">
          <p className="mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <h2 className="text-2xl font-serif font-semibold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using LabThread, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
          </p>

          <h2 className="text-2xl font-serif font-semibold text-foreground mt-8 mb-4">2. Educational Purpose</h2>
          <p className="mb-4">
            The content provided on LabThread is for educational and informational purposes only. It is not intended as a substitute for professional scientific training, medical advice, or institutional safety protocols. Always follow your institution's specific guidelines and safety procedures when conducting experiments.
          </p>

          <h2 className="text-2xl font-serif font-semibold text-foreground mt-8 mb-4">3. User Conduct</h2>
          <p className="mb-4">
            You agree to use LabThread only for lawful purposes. You must not use the site in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of LabThread.
          </p>

          <h2 className="text-2xl font-serif font-semibold text-foreground mt-8 mb-4">4. Intellectual Property</h2>
          <p className="mb-4">
            The content, layout, design, data, graphics and products appearing on this website are protected by intellectual property laws. You may not reproduce, modify, or distribute our content without explicit permission, except as permitted by fair use principles for educational purposes.
          </p>

          <h2 className="text-2xl font-serif font-semibold text-foreground mt-8 mb-4">5. Disclaimer of Warranties</h2>
          <p className="mb-4">
            LabThread is provided "as is" without any representations or warranties, express or implied. We make no representations or warranties in relation to this website or the information and materials provided on this website.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Terms;
