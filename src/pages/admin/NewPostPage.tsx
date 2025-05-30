import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import PostForm from '../../components/admin/PostForm';

const NewPostPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">
            Create New Post
          </h1>
          <div>
            <Link to="/admin" className="text-indigo-600 hover:text-indigo-800 flex items-center">
              <ChevronLeft size={16} className="mr-1" />
              Back to Posts
            </Link>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <PostForm />
      </main>
    </div>
  );
};

export default NewPostPage;