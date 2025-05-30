import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { getPosts } from '../utils/storage';
import { Post } from '../types';

const Search: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [fuse, setFuse] = useState<Fuse<Post> | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getPosts();
        setPosts(allPosts);
        setFuse(new Fuse(allPosts, {
          keys: ['title', 'content', 'excerpt'],
          threshold: 0.3,
        }));
      } catch (error) {
        console.error('Error fetching posts for search:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.length > 2 && fuse) {
      const searchResults = fuse.search(value).map(result => result.item);
      setResults(searchResults.slice(0, 5));
    } else {
      setResults([]);
    }
  };

  const handleResultClick = (slug: string) => {
    setIsOpen(false);
    setSearchTerm('');
    navigate(`/post/${slug}`);
  };

  return (
    <div ref={searchRef} className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 text-gray-300 hover:text-indigo-400 transition-colors"
      >
        <SearchIcon size={20} />
        <span className="hidden md:inline">Search</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-screen max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50"
          >
            <div className="p-4">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search posts..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X size={20} />
                </button>
              </div>

              {results.length > 0 && (
                <div className="mt-4 divide-y divide-gray-200 dark:divide-gray-700">
                  {results.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result.slug)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {result.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                        {result.excerpt}
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {searchTerm.length > 2 && results.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
                  No results found
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;