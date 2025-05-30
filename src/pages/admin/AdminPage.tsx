import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, LogOut, Home } from 'lucide-react';
import Button from '../../components/ui/Button';
import PostList from '../../components/admin/PostList';
import { Post } from '../../types';
import { getPosts } from '../../utils/storage';
import { useAuth } from '../../contexts/AuthContext';

const AdminPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  
  const fetchPosts = async () => {
    try {
      const allPosts = await getPosts();
      setPosts(allPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-sm z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Blog Admin
            </h1>
            {user && (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {user.email}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button 
                variant="ghost" 
                size="sm"
                icon={<Home size={16} />}
              >
                View Blog
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              icon={<LogOut size={16} />}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Posts</h2>
          <Link to="/admin/new">
            <Button icon={<Plus size={16} />}>
              New Post
            </Button>
          </Link>
        </div>
        
        <PostList posts={posts} onDelete={fetchPosts} />
      </main>
    </div>
  );
};

export default AdminPage;