import React from 'react';
import { Post } from '../../types';
import PostCard from './PostCard';

interface PostGridProps {
  posts: Post[];
  columns?: 1 | 2 | 3;
}

const PostGrid: React.FC<PostGridProps> = ({ posts, columns = 3 }) => {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-700">No posts found</h3>
        <p className="text-gray-500 mt-2">Check back later for new content</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridClasses[columns]} gap-6`}>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostGrid;