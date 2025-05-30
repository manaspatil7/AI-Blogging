import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ChevronLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Post } from '../types';
import { getPostBySlug, getPostsByCategory } from '../utils/storage';
import { formatDate } from '../utils/helpers';
import PostCard from '../components/blog/PostCard';

const formatContent = (content: string): string => {
  let formatted = content.replace(/^# (.*$)/gm, '<h1>$1</h1>');
  formatted = formatted.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  formatted = formatted.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  formatted = formatted.replace(/^(?!<h[1-6]|<ul|<ol|<li|<blockquote|<pre|<table)(.+$)/gm, '<p>$1</p>');
  formatted = formatted.replace(/```(.+?)```/gs, '<pre class="bg-gray-50 dark:bg-gray-800 p-4 rounded-md overflow-x-auto mb-4"><code>$1</code></pre>');
  return formatted;
};

const PostPage: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postData = await getPostBySlug(slug);
        
        if (postData) {
          setPost(postData);
          
          const relatedPostsData = await getPostsByCategory(postData.category);
          const related = relatedPostsData
            .filter(p => p.id !== postData.id)
            .slice(0, 3);
          
          setRelatedPosts(related);
          
          document.title = postData.seoTitle || postData.title;
          
          if (postData.seoDescription) {
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
              metaDescription.setAttribute('content', postData.seoDescription);
            } else {
              const meta = document.createElement('meta');
              meta.name = 'description';
              meta.content = postData.seoDescription;
              document.head.appendChild(meta);
            }
          }
          
          if (postData.seoKeywords) {
            const metaKeywords = document.querySelector('meta[name="keywords"]');
            if (metaKeywords) {
              metaKeywords.setAttribute('content', postData.seoKeywords);
            } else {
              const meta = document.createElement('meta');
              meta.name = 'keywords';
              meta.content = postData.seoKeywords;
              document.head.appendChild(meta);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </Layout>
    );
  }

  if (!loading && !post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Post not found</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">The post you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="inline-block mt-6 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
            Return to home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article>
        <div 
          className="relative h-[40vh] md:h-[60vh] flex items-center justify-center bg-gray-900"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${post?.coverImage || 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="container mx-auto px-4 text-center text-white z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              {post?.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap justify-center gap-4 text-sm md:text-base"
            >
              <div className="flex items-center bg-black/30 px-3 py-1 rounded-full">
                <Calendar size={16} className="mr-2" />
                <span>{formatDate(post?.publishedAt || '')}</span>
              </div>
              <div className="flex items-center bg-black/30 px-3 py-1 rounded-full">
                <User size={16} className="mr-2" />
                <span>{post?.author}</span>
              </div>
              <Link 
                to={`/category/${post?.category}`}
                className="flex items-center bg-black/30 px-3 py-1 rounded-full hover:bg-black/40 transition-colors"
              >
                <Tag size={16} className="mr-2" />
                <span>{post?.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
              </Link>
            </motion.div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-prose mx-auto">
            <Link 
              to="/"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 mb-8"
            >
              <ChevronLeft size={16} className="mr-1" />
              Back to home
            </Link>
            
            <div className="prose prose-base dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: formatContent(post?.content || '') }} />
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <span className="text-gray-700 dark:text-gray-300 font-medium mr-2">Category:</span>
                <Link 
                  to={`/category/${post?.category}`}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {post?.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Link>
              </div>
            </div>
            
            <div className="mt-10 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">About the Author</h3>
              <p className="text-gray-700 dark:text-gray-300">
                {post?.author} is a passionate writer and expert in {post?.category.replace('-', ' ')}.
              </p>
            </div>
          </div>
        </div>
      </article>
      
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-900 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {relatedPosts.map(relatedPost => (
                <PostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default PostPage;