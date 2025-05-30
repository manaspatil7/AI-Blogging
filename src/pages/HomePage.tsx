import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import PostCard from '../components/blog/PostCard';
import PostGrid from '../components/blog/PostGrid';
import { Post } from '../types';
import { getPosts, getFeaturedPosts } from '../utils/storage';

const HomePage: React.FC = () => {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [featured, all] = await Promise.all([
          getFeaturedPosts(),
          getPosts()
        ]);
        
        setFeaturedPosts(featured.slice(0, 2));
        setRecentPosts(all.slice(0, 6));
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-32 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center max-w-4xl mx-auto mb-24"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="text-gray-900">Info</span>
            <span className="text-[#6366F1]">Berg</span>
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Insights on Technology, AI tools, Coding, and SaaS
          </p>
        </motion.div>

        {featuredPosts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          >
            {featuredPosts.map(post => (
              <PostCard key={post.id} post={post} featured />
            ))}
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Latest Posts</h2>
          </div>
          <PostGrid posts={recentPosts} />
        </motion.div>
      </div>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated with Our Newsletter
            </h2>
            <p className="text-gray-600 mb-8">
              Get the latest articles, tutorials, and updates delivered straight to your inbox.
            </p>
            <form className="flex flex-col md:flex-row max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;