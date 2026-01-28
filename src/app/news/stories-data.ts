// src/app/news/stories-data.ts

export type Story = {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string; 
  category: string;
  author: string;
  image: string;
  aiHint?: string;
  imagePosition?: string;
  videoUrl?: string;
  pdfUrl?: string;
  summary?: string;
  content?: string;       
  status?: 'Published' | 'Coming Soon';
  isFeatured?: boolean;
};

// Array is now empty to prevent accidental re-uploading to the database.
export const storiesData: Omit<Story, 'id' | 'slug'>[] = [];