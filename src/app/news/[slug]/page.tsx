import { Metadata } from "next";
import { notFound } from "next/navigation";
import { dbAdmin } from "@/lib/firebase-admin";
import NewsArticleClientPage from "./client-page";

export const dynamic = "force-dynamic";

// --- TYPE DEFINITION ---
export interface Story {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  date: string;
  author: string;
  content: string;
  status: "Published" | "Coming Soon" | undefined;
  isFeatured: boolean;
  imagePosition: "left" | "right" | "center";
}

// --- HELPER: Sanitize Firestore Data ---
function sanitizeStory(doc: any): Story {
  const data = doc.data() || {};
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

  const rawStatus = data.status || "Published";
  const validStatus = (rawStatus === "Coming Soon") ? "Coming Soon" : "Published";

  return {
    id: doc.id,
    slug: data.slug || doc.id,
    title: data.title || "Untitled Story",
    description: data.description || "",
    category: data.category || "News",
    image: data.image || "",
    date: dateStr,
    author: data.author || "GrowShare Capital",
    content: data.content || "",
    status: validStatus,
    isFeatured: !!data.isFeatured,
    imagePosition: data.imagePosition || "center",
  } as Story;
}

// --- SERVER FUNCTION: Fetch Story ---
async function getStory(slug: string): Promise<Story | null> {
  if (!slug || !dbAdmin) return null;

  try {
    const storiesRef = dbAdmin.collection("stories");
    
    // 1. Query by 'slug' field
    const q = storiesRef.where("slug", "==", slug).limit(1);
    const snapshot = await q.get();

    if (snapshot.empty) {
      // 2. Fallback: Try querying by document ID 
      const docRef = storiesRef.doc(slug);
      const docSnap = await docRef.get();
      if (docSnap.exists) {
        return sanitizeStory(docSnap);
      }
      return null;
    }

    return sanitizeStory(snapshot.docs[0]);
  } catch (error) {
    console.error(`❌ Error fetching story [${slug}]:`, error);
    return null;
  }
}

// --- GENERATE STATIC PARAMS ---
export async function generateStaticParams() {
    if (!dbAdmin) return [];
    try {
        const storiesCollection = dbAdmin.collection('stories');
        const snapshot = await storiesCollection.get();
        return snapshot.docs.map(doc => ({
            slug: doc.data().slug || doc.id,
        }));
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}

// --- TYPE FOR PROPS (Next.js 15+) ---
type Props = {
  params: Promise<{ slug: string }>;
};

// --- SEO: Generate Metadata ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // ✅ FIX: Await the params Promise
  const { slug } = await params;
  
  if (!slug) return { title: "Article Not Found" };

  const story = await getStory(slug);

  if (!story) {
    return {
      title: "Article Not Found | GrowShare Capital",
    };
  }

  return {
    title: `${story.title} | GrowShare Capital`,
    description: story.description,
    // Note: We intentionally do NOT include 'images' here.
    // Next.js automatically finds 'opengraph-image.tsx' and uses that generated image instead.
    openGraph: {
      title: story.title,
      description: story.description,
    },
  };
}

// --- MAIN PAGE COMPONENT ---
export default async function NewsArticlePage({ params }: Props) {
  // ✅ FIX: Await the params Promise
  const { slug } = await params;

  if (!slug) {
      notFound();
  }

  const story = await getStory(slug);

  if (!story) {
    notFound();
  }

  return <NewsArticleClientPage initialStory={story} slug={slug} />;
}