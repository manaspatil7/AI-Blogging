import { createClient } from '@supabase/supabase-js';

// Hardcode the values temporarily to get it working
const supabaseUrl = 'https://eohgaawoospqnwuaegxi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvaGdhYXdvb3NwcW53dWFlZ3hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NjAxMjIsImV4cCI6MjA2NDUzNjEyMn0.6d8lCNrJLL3mKcbDyVDy_gsEP2k8qyOa8wmlyhVIuJM';

// Log configuration status (without exposing sensitive data)
console.log('Supabase configuration status:', {
  urlConfigured: !!supabaseUrl,
  keyConfigured: !!supabaseAnonKey,
  environment: import.meta.env.MODE
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});