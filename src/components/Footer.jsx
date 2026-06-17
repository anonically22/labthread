import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start space-x-6 md:order-2">
            <Link to="/blog" className="text-gray-500 hover:text-primary">
              Blog
            </Link>
            <Link to="/ask" className="text-gray-500 hover:text-primary">
              Ask
            </Link>
          </div>
          <div className="mt-8 md:mt-0 md:order-1 text-center md:text-left">
            <Link to="/" className="text-xl font-serif font-bold text-primary block">
              LabThread
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              A guide for biotech students
            </p>
            <p className="mt-4 text-xs text-gray-400">
              &copy; {new Date().getFullYear()} LabThread. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
