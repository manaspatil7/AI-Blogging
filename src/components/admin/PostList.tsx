import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Eye, Calendar, Tag, Trash2 } from 'lucide-react';
import { formatDate } from '../../utils/helpers';
import { Post } from '../../types';
import Button from '../ui/Button';
import { deletePost } from '../../utils/storage';

interface PostListProps {
  posts: Post[];
  onDelete?: () => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onDelete }) => {
  const handleDelete = async (id: string) => {
    if (!id) return;
    
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        if (onDelete) onDelete();
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">No posts found</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">Create your first post to get started</p>
        <Link to="/admin/new">
          <Button>Create New Post</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Published
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Featured
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{post.title}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{post.excerpt}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Tag size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {post.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{formatDate(post.publishedAt)}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    post.featured ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}>
                    {post.featured ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Link to={`/admin/edit/${post.id}`}>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        icon={<Edit size={16} />}
                      >
                        Edit
                      </Button>
                    </Link>
                    <Link to={`/post/${post.slug}`} target="_blank" rel="noopener noreferrer">
                      <Button 
                        variant="secondary" 
                        size="sm"
                        icon={<Eye size={16} />}
                      >
                        View
                      </Button>
                    </Link>
                    <Button 
                      variant="danger" 
                      size="sm"
                      icon={<Trash2 size={16} />}
                      onClick={() => post.id && handleDelete(post.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostList;