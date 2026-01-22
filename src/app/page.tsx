import type { Metadata } from 'next';
import HomeClientPage from './home-client';
import type { Story } from '@/app/news/stories-data';
import { dbAdmin } from '@/lib/firebase-admin';

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'GrowShare Capital | High-Yield, Principled Investments',
  description: 'A premier American private equity and impact investment platform building resilient communities through intelligent, ethical, and high-yield investments in real estate, agriculture, and healthcare.',
};

// --- HELPER: Turn Firestore Data into Safe Text ---
function sanitizeStory(doc: FirebaseFirestore.DocumentSnapshot): Story {
  const data = doc.data() || {};
  
  // Safe Date Conversion
  let dateStr = new Date().toISOString();
  if (data.date) {
      if (typeof data.date.toDate === 'function') {
          dateStr = data.date.toDate().toISOString(); // Firestore Timestamp
      } else if (data.date instanceof Date) {
          dateStr = data.date.toISOString(); // JS Date
      } else {
          dateStr = String(data.date); // String fallback
      }
  }

  return {
    id: doc.id,
    slug: data.slug || doc.id,
    title: data.title || "Untitled Story",
    description: data.description || "",
    category: data.category || "News",
    image: data.image || "", 
    date: dateStr,
    author: data.author || "GrowShare Capital",
    content: "",
    status: data.status || "Published",
    isFeatured: !!data.isFeatured,
    imagePosition: data.imagePosition || "center"
  } as Story;
}

async function getStories(): Promise<Story[]> {
    // Safety check: If Admin SDK is missing, don't crash, just return empty.
    if (!dbAdmin) {
        console.warn("⚠️ [Server] dbAdmin not initialized. Returning empty stories.");
        return [];
    }

    try {
        const storiesRef = dbAdmin.collection("stories");
        const q = storiesRef.orderBy("date", "desc").limit(3);
        const snapshot = await q.get();

        if (snapshot.empty) return [];
        return snapshot.docs.map(sanitizeStory);

    } catch (error) {
        // 🛑 CATCH THE SERVER ERROR HERE
        // Instead of crashing the whole page, we log the error and return empty list.
        console.error("❌ [Server] Error fetching stories:", error);
        return []; 
    }
}

export default async function Page() {
    const stories = await getStories();
    // Pass the data (or empty list) to the client so the page always loads
    return <HomeClientPage initialStories={stories} />;
}