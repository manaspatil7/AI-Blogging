import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fnkxrrjjfzwrksowdpoz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZua3hycmpqZnp3cmtzb3dkcG96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NDIxNjYsImV4cCI6MjA2NDExODE2Nn0.uZSmswkfPegiV9ZyuwbAUAhPurLxfOfWWSX15XSjeaI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);