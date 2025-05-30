import { Post } from '../types';
import { supabase } from '../lib/supabase';

export const samplePosts: Partial<Post>[] = [
  // ... (keeping the existing sample posts array but removing the id field from each post)
];

// Function to initialize sample data in Supabase
export const initSampleData = async (): Promise<void> => {
  try {
    // Check if posts table is empty
    const { count, error: countError } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('Error checking posts count:', countError);
      return;
    }

    // Only initialize if no posts exist
    if (count === 0) {
      // Insert sample posts
      const { error: insertError } = await supabase
        .from('posts')
        .insert(samplePosts);

      if (insertError) {
        console.error('Error inserting sample posts:', insertError);
      }
    }
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
};