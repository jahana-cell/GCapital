import type { Metadata } from 'next';
import NewsClientPage from './client-page';
import { dbAdmin } from '@/lib/firebase-admin';
import type { Story } from '@/app/news/stories-data';

// CRITICAL: Ensures the page rebuilds on every request so new stories appear instantly
export const dynamic = 'force-dynamic';

// ✅ Helper to clean up data
function sanitizeStory(doc: any): Story {
  const data = doc.data() || {};

  // 1. Safe Date Conversion
  let dateStr = new Date().toISOString();
  if (data.date) {
    if (typeof data.date.toDate === "function") {
      dateStr = data.date.toDate().toISOString();
    } else if (data.date instanceof Date) {
      dateStr = data.date.toISOString();
    } else {
      dateStr = String(data.date);
    }
  }

  // 2. Safe Status
  const rawStatus = data.status || "Published";
  const validStatus = (rawStatus === "Coming Soon") ? "Coming Soon" : "Published";

  // 3. Content Mapping
  const content = data.content || data.summary || data.body || "";

  return {
    id: doc.id,
    slug: data.slug || doc.id,
    title: data.title || "Untitled Story",
    description: data.description || "",
    category: data.category || "News",
    image: data.image || "",
    date: dateStr,
    author: data.author || "GrowShare Capital",
    content: content,
    status: validStatus,
    isFeatured: !!data.isFeatured,
    imagePosition: data.imagePosition || "center",
  } as Story;
}

async function getStories(): Promise<Story[]> {
  if (!dbAdmin) {
    console.error("❌ Admin DB not initialized");
    return [];
  }

  try {
    const storiesRef = dbAdmin.collection("stories");
    
    // 1. Try to fetch Sorted
    try {
        const q = storiesRef.orderBy("date", "desc");
        const snapshot = await q.get();
        if (!snapshot.empty) {
            return snapshot.docs.map(doc => sanitizeStory(doc));
        }
    } catch (indexError) {
        console.warn("⚠️ Sorting failed (likely missing index). Fetching unsorted...");
        // 2. Fallback: Fetch Unsorted
        const snapshot = await storiesRef.get();
        const stories = snapshot.docs.map(doc => sanitizeStory(doc));
        
        // Sort manually
        return stories.sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }

    return [];
  } catch (error) {
    console.error("❌ Error fetching stories:", error);
    return [];
  }
}

export const metadata: Metadata = {
  title: 'Newsroom | GrowShare Capital',
  description: 'Our latest company news, announcements, and press releases.',
  openGraph: {
    title: 'Newsroom | GrowShare Capital',
    description: 'The latest updates and insights from GrowShare Capital.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&auto=format&fit=crop',
        width: 1600,
        height: 900,
        alt: 'News and reports from GrowShare Capital.',
      },
    ],
  },
};

export default async function NewsPage() {
  const initialStories = await getStories();
  // We pass ALL stories here. The filtering happens in the Client Page.
  return <NewsClientPage initialStories={initialStories} />;
}