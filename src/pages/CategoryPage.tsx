import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import CategoryHeader from '../components/blog/CategoryHeader';
import PostGrid from '../components/blog/PostGrid';
import { Post } from '../types';
import { getPostsByCategory } from '../utils/storage';

const CategoryPage: React.FC = () => {
  const { categoryId = '' } = useParams<{ categoryId: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const categoryPosts = await getPostsByCategory(categoryId);
        setPosts(categoryPosts);
      } catch (error) {
        console.error('Error fetching category posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [categoryId]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <CategoryHeader categoryId={categoryId} />
        <PostGrid posts={posts} />
      </div>
    </Layout>
  );
};

export default CategoryPage;