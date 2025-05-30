import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Trash2, Upload, Wand2 } from 'lucide-react';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { Post } from '../../types';
import { generateSlug } from '../../utils/helpers';
import { addPost, updatePost, deletePost, uploadImageToSupabase } from '../../utils/storage';
import { generateContentFromAI } from '../../utils/aiService';

interface PostFormProps {
  post?: Post;
}

const PostForm: React.FC<PostFormProps> = ({ post }) => {
  const navigate = useNavigate();
  const isEditing = !!post;
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Post>>({
    title: '',
    category: 'technology',
    excerpt: '',
    content: '',
    author: '',
    coverImage: '',
    featured: false,
    seoTitle: '',
    seoDescription: '',
    seoKeywords: ''
  });

  useEffect(() => {
    if (post) {
      setFormData(post);
    }
  }, [post]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const imageUrl = await uploadImageToSupabase(file);
      setFormData(prev => ({ ...prev, coverImage: imageUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateAIContent = async () => {
    if (!formData.title) {
      alert('Please enter a title first');
      return;
    }

    try {
      setAiLoading(true);
      const prompt = `Write a detailed blog post about "${formData.title}". 
        The post should be informative, engaging, and well-structured. 
        Include an introduction, main points, and a conclusion. 
        The content should be relevant to the category: ${formData.category}.
        Also generate a short excerpt for the blog post.`;

      const content = await generateContentFromAI(prompt);
      
      // Split content into excerpt and main content
      const lines = content.split('\n');
      const excerpt = lines[0];
      const mainContent = lines.slice(1).join('\n');

      setFormData(prev => ({
        ...prev,
        excerpt: excerpt,
        content: mainContent,
        seoTitle: formData.title,
        seoDescription: excerpt,
        seoKeywords: `${formData.category}, ${formData.title.toLowerCase().split(' ').join(', ')}`
      }));
    } catch (error) {
      console.error('Error generating content:', error);
      alert('Failed to generate content. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const now = new Date().toISOString();
      const slug = formData.slug || generateSlug(formData.title || '');
      
      const postData: Partial<Post> = {
        title: formData.title || 'Untitled Post',
        slug,
        category: formData.category as any || 'technology',
        excerpt: formData.excerpt || '',
        content: formData.content || '',
        author: formData.author || 'Anonymous',
        publishedAt: post?.publishedAt || now,
        featured: formData.featured || false,
        seoTitle: formData.seoTitle || '',
        seoDescription: formData.seoDescription || '',
        seoKeywords: formData.seoKeywords || '',
        coverImage: formData.coverImage || ''
      };

      if (isEditing && post?.id) {
        postData.id = post.id;
        await updatePost(postData as Post);
      } else {
        await addPost(postData);
      }
      navigate('/admin');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (post?.id && confirm('Are you sure you want to delete this post?')) {
      setLoading(true);
      try {
        await deletePost(post.id);
        navigate('/admin');
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {isEditing ? 'Edit Post' : 'Create New Post'}
        </h2>
        <div className="flex space-x-2">
          <Button
            type="submit"
            icon={<Save size={16} />}
            disabled={loading}
          >
            {loading ? 'Saving...' : (isEditing ? 'Update' : 'Save')}
          </Button>
          {isEditing && (
            <Button
              type="button"
              variant="danger"
              icon={<Trash2 size={16} />}
              onClick={handleDelete}
              disabled={loading}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Input
            id="title"
            name="title"
            label="Title"
            value={formData.title || ''}
            onChange={handleChange}
            placeholder="Enter post title"
            required
          />
        </div>
        
        <Select
          id="category"
          name="category"
          label="Category"
          value={formData.category || 'technology'}
          onChange={handleChange}
          options={[
            { value: 'technology', label: 'Technology' },
            { value: 'ai-tools', label: 'AI Tools' },
            { value: 'coding', label: 'Coding' },
            { value: 'saas', label: 'SaaS' }
          ]}
        />
        
        <Input
          id="author"
          name="author"
          label="Author"
          value={formData.author || ''}
          onChange={handleChange}
          placeholder="Enter author name"
          required
        />
        
        <div className="md:col-span-2">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cover Image
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="cover-image"
              />
              <label
                htmlFor="cover-image"
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              >
                <Upload size={16} className="mr-2" />
                Upload Image
              </label>
              {formData.coverImage && (
                <img
                  src={formData.coverImage}
                  alt="Cover preview"
                  className="h-20 w-20 object-cover rounded"
                />
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Content
            </label>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              icon={<Wand2 size={16} />}
              onClick={generateAIContent}
              disabled={aiLoading}
            >
              {aiLoading ? 'Generating...' : 'Generate with AI'}
            </Button>
          </div>
          <TextArea
            id="content"
            name="content"
            value={formData.content || ''}
            onChange={handleChange}
            placeholder="Enter post content (Markdown is supported)"
            className="min-h-[300px]"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <TextArea
            id="excerpt"
            name="excerpt"
            label="Excerpt"
            value={formData.excerpt || ''}
            onChange={handleChange}
            placeholder="Enter a short excerpt"
            required
          />
        </div>
        
        <div className="flex items-center">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            checked={formData.featured || false}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Featured Post
          </label>
        </div>
        
        <div className="md:col-span-2 border-t border-gray-200 dark:border-gray-700 pt-6 mt-2">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">SEO Settings</h3>
          
          <Input
            id="seoTitle"
            name="seoTitle"
            label="SEO Title"
            value={formData.seoTitle || ''}
            onChange={handleChange}
            placeholder="Enter SEO title"
          />
          
          <TextArea
            id="seoDescription"
            name="seoDescription"
            label="SEO Description"
            value={formData.seoDescription || ''}
            onChange={handleChange}
            placeholder="Enter SEO description"
          />
          
          <Input
            id="seoKeywords"
            name="seoKeywords"
            label="SEO Keywords"
            value={formData.seoKeywords || ''}
            onChange={handleChange}
            placeholder="Enter SEO keywords (comma separated)"
          />
        </div>
      </div>
    </form>
  );
};

export default PostForm;