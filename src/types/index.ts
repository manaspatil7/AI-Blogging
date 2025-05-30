export interface Post {
  id?: string;
  title: string;
  slug: string;
  category: Category;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  publishedAt: string;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export type Category = 'technology' | 'ai-tools' | 'coding' | 'saas';

export interface CategoryInfo {
  id: Category;
  name: string;
  description: string;
}