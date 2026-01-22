import type { Metadata } from 'next';
import HomeClientPage from './home-client';
import type { Story } from '@/app/news/stories-data';
import { dbAdmin } from '@/lib/firebase-admin';

// ✅ Force dynamic rendering ensures the homepage always fetches fresh data
// (Useful for a news site where articles go live instantly)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'GrowShare Capital | High-Yield, Principled Investments',
  description: 'A premier American private equity and impact investment platform building resilient communities through intelligent, ethical, and high-yield investments in real estate, agriculture, and healthcare.',
};

// --- HELPER: Turn Firestore Data into Safe Text ---
// using 'any' for the doc type avoids "Namespace not found" build errors
function sanitizeStory(doc: any): Story {
  const data = doc.data() || {};
  
  // Safe Date Conversion logic (Handles Timestamps, JS Dates, and Strings)
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
    content: "", // Content not needed for card previews
    status: data.status || "Published",
    isFeatured: !!data.isFeatured,
    imagePosition: data.imagePosition || "center"
  } as Story;
}

async function getStories(): Promise<Story[]> {
    // 1. Safety Check: If dbAdmin failed to initialize (e.g. bad Project ID), 
    // we return empty list instead of crashing the whole site.
    if (!dbAdmin) {
        console.warn("⚠️ [Server] dbAdmin not initialized. Returning empty stories.");
        return [];
    }

    try {
        const storiesRef = dbAdmin.collection("stories");
        
        // 2. Query: Get 3 newest published stories
        const q = storiesRef
            .where("status", "==", "Published") // Optional: Only show published
            .orderBy("date", "desc")
            .limit(3);
            
        const snapshot = await q.get();

        if (snapshot.empty) return [];
        
        // 3. Map & Sanitize
        return snapshot.docs.map(sanitizeStory);

    } catch (error) {
        // 🛑 Error Handling: Log it on the server, but show the page anyway.
        console.error("❌ [Server] Error fetching stories:", error);
        return []; 
    }
}

export default async function Page() {
    // Fetch data on the server (App Check does NOT apply here, so no 403 errors)
    const stories = await getStories();

    // Pass the safe, sanitized JSON data to the Client Component
    return <HomeClientPage initialStories={stories} />;
}