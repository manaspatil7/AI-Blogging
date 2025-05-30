import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatDate } from '../../utils/helpers';
import { Post } from '../../types';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, featured = false }) => {
  const cardVariants = {
    hover: { 
      y: -5,
      transition: { duration: 0.3 }
    }
  };

  if (featured) {
    return (
      <motion.article 
        className="relative rounded-lg overflow-hidden h-[500px] group"
        whileHover="hover"
        variants={cardVariants}
      >
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img 
          src={post.coverImage || 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
          alt={post.title}
          className="absolute h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white mb-4">
              {post.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            <Link to={`/post/${post.slug}`} className="hover:text-blue-400 transition-colors">
              {post.title}
            </Link>
          </h2>
          <p className="text-gray-200 mb-4 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <span className="text-gray-300 text-sm">
              {formatDate(post.publishedAt)}
            </span>
            <Link 
              to={`/post/${post.slug}`}
              className="text-blue-400 font-medium hover:text-blue-300 transition-colors"
            >
              Read More
            </Link>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article 
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
      whileHover="hover"
      variants={cardVariants}
    >
      <Link to={`/post/${post.slug}`} className="block overflow-hidden aspect-video">
        <img 
          src={post.coverImage || 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </Link>
      <div className="p-6">
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-3">
            {post.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          <Link to={`/post/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            {formatDate(post.publishedAt)}
          </span>
          <Link 
            to={`/post/${post.slug}`}
            className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Read More
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default PostCard;