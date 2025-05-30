import { v4 as uuidv4 } from 'uuid';
import { Post } from '../types';
import { supabase } from '../lib/supabase';

export const getPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('publishedAt', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return data || [];
};

export const addPost = async (post: Partial<Post>): Promise<Post | null> => {
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select()
    .single();

  if (error) {
    console.error('Error adding post:', error);
    throw error;
  }

  return data;
};

export const updatePost = async (updatedPost: Post): Promise<void> => {
  const { error } = await supabase
    .from('posts')
    .update(updatedPost)
    .eq('id', updatedPost.id);

  if (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deletePost = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }

  return data;
};

export const getPostById = async (id: string): Promise<Post | null> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching post by id:', error);
    return null;
  }

  return data;
};

export const getPostsByCategory = async (category: string): Promise<Post[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('category', category)
    .order('publishedAt', { ascending: false });

  if (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }

  return data || [];
};

export const getFeaturedPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('featured', true)
    .order('publishedAt', { ascending: false });

  if (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }

  return data || [];
};

export const uploadImageToSupabase = async (file: File): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('post-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('post-images')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image. Please try again.');
  }
};