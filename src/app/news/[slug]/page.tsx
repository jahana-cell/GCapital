// src/app/news/[slug]/page.tsx

import type { Metadata } from 'next';
import NewsArticleClientPage from './client-page';
import { dbAdmin } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';
import type { Story } from '@/app/news/stories-data';

// Force dynamic to ensure fresh data
export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }> // Params is now a Promise in Next.js 15+
}

async function getStoryData(slug: string): Promise<Story | null> {
  const cleanSlug = decodeURIComponent(slug).trim();
  
  if (!dbAdmin) {
    console.error("Admin DB not initialized");
    return null;
  }

  try {
    // Strategy 1: Search by ID
    const docRef = dbAdmin.collection("stories").doc(cleanSlug);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
       const data = docSnap.data()!;
       return { 
         id: docSnap.id, 
         slug: data.slug || docSnap.id, 
         ...data, 
         date: data.date instanceof Timestamp ? data.date.toDate().toISOString() : new Date().toISOString() 
       } as Story;
    }

    // Strategy 2: Fallback to slug field
    const q = dbAdmin.collection("stories").where("slug", "==", cleanSlug);
    const querySnap = await q.get();

    if (!querySnap.empty) {
       const docSnap = querySnap.docs[0];
       const data = docSnap.data();
       return { 
         id: docSnap.id, 
         slug: data.slug || docSnap.id, 
         ...data, 
         date: data.date instanceof Timestamp ? data.date.toDate().toISOString() : new Date().toISOString() 
       } as Story;
    }

    return null;
  } catch (error) {
    console.error(`Fetch failed for slug "${slug}":`, error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 1. Await params first!
  const { slug } = await params;

  if (process.env.NEXT_PHASE === 'phase-production-build') {
      return { title: 'News Article' }; 
  }

  const story = await getStoryData(slug);
  if (!story) return { title: 'Loading Article...' };
  
  return {
    title: story.title,
    description: story.description,
    openGraph: {
      title: story.title,
      description: story.description,
      type: 'article',
      publishedTime: story.date,
      images: [{ url: story.image }],
    },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  // 1. Await params first!
  const { slug } = await params;
  
  const story = await getStoryData(slug);
  
  return <NewsArticleClientPage initialStory={story} slug={slug} />;
}