import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
              Info<span className="text-indigo-600 dark:text-indigo-400">berg</span>
            </Link>
            <p className="mt-2 text-lg font-medium text-indigo-600 dark:text-indigo-400">
              AI-Powered Growth for Bold Brands
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-md">
              Transforming businesses through intelligent automation, advanced SEO strategies, 
              and cutting-edge AI solutions.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Mail size={18} className="mr-2" />
                <a href="mailto:s.k@adlytica.com" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  s.k@adlytica.com
                </a>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Phone size={18} className="mr-2" />
                <a href="tel:+48571211808" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  +48 571 211 808
                </a>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPin size={18} className="mr-2" />
                <span>Wrocław & Nysa, Poland 51-628</span>
              </div>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/technology" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/category/ai-tools" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  AI Tools
                </Link>
              </li>
              <li>
                <Link to="/category/coding" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Coding
                </Link>
              </li>
              <li>
                <Link to="/category/saas" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  SaaS
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              © {currentYear} Infoberg. This company is sponsored. No copyright infringement intended.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a 
                href="#" 
                className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;