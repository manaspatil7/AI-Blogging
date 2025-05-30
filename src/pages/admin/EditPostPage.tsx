import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import PostForm from '../../components/admin/PostForm';
import Button from '../../components/ui/Button';
import { Post } from '../../types';
import { getPostById } from '../../utils/storage';

const EditPostPage: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostById(id);
        if (postData) {
          setPost(postData);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <Link to="/admin" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center">
              <ChevronLeft size={16} className="mr-1" />
              Back to Posts
            </Link>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">{error}</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">The post you're trying to edit doesn't exist</p>
            <Button onClick={() => navigate('/admin')}>
              Return to Admin Dashboard
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Edit Post
          </h1>
          <Link to="/admin" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center">
            <ChevronLeft size={16} className="mr-1" />
            Back to Posts
          </Link>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <PostForm post={post} />
      </main>
    </div>
  );
};

export default EditPostPage;