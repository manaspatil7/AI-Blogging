import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Search from '../Search';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Technology', path: '/category/technology' },
    { label: 'AI Tools', path: '/category/ai-tools' },
    { label: 'Coding', path: '/category/coding' },
    { label: 'SaaS', path: '/category/saas' },
    { label: 'Contact', path: '/contact' }
  ];

  const headerClasses = `
    fixed w-full z-50 transition-all duration-300 
    ${isScrolled ? 'bg-gray-950 shadow-lg py-2' : 'bg-gray-950/95 py-4'}
  `;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-white">
          Info<span className="text-blue-400">berg</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                text-sm font-medium transition-colors
                ${location.pathname === item.path 
                  ? 'text-blue-400' 
                  : 'text-gray-200 hover:text-blue-400'}
              `}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-6">
          <Search />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <Search />
          <button
            className="text-gray-200 hover:text-blue-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-950"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      text-base font-medium py-2 px-4 rounded-md transition-colors
                      ${location.pathname === item.path 
                        ? 'bg-gray-800 text-blue-400' 
                        : 'text-gray-200 hover:bg-gray-800 hover:text-blue-400'}
                    `}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;