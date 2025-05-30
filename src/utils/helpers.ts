import { format } from 'date-fns';
import { CategoryInfo } from '../types';

// Generate a slug from a string
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

// Format a date
export const formatDate = (date: string): string => {
  return format(new Date(date), 'MMMM d, yyyy');
};

// Get category info
export const getCategoryInfo = (categoryId: string): CategoryInfo => {
  const categories: Record<string, CategoryInfo> = {
    'technology': {
      id: 'technology',
      name: 'Technology',
      description: 'Latest trends and news in the tech world'
    },
    'ai-tools': {
      id: 'ai-tools',
      name: 'AI Tools',
      description: 'Reviews and guides for the latest AI tools'
    },
    'coding': {
      id: 'coding',
      name: 'Coding',
      description: 'Tutorials and tips for developers'
    },
    'saas': {
      id: 'saas',
      name: 'SaaS',
      description: 'Comparisons and reviews of Software as a Service products'
    }
  };

  return categories[categoryId] || {
    id: 'technology',
    name: 'Technology',
    description: 'Latest trends and news in the tech world'
  };
};

// Generate excerpt from content
export const generateExcerpt = (content: string, maxLength: number = 160): string => {
  if (content.length <= maxLength) return content;
  
  return content.substring(0, maxLength).trim() + '...';
};