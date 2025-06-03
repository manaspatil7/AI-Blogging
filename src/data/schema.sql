-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    featured BOOLEAN DEFAULT false,
    publishedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    imageUrl TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create RLS policies
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON posts
    FOR SELECT
    USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Allow authenticated users to insert" ON posts
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Allow authenticated users to update their own posts
CREATE POLICY "Allow authenticated users to update" ON posts
    FOR UPDATE
    TO authenticated
    USING (true);

-- Allow authenticated users to delete their own posts
CREATE POLICY "Allow authenticated users to delete" ON posts
    FOR DELETE
    TO authenticated
    USING (true); 