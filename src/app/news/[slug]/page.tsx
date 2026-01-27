import { Metadata } from "next";
import { notFound } from "next/navigation";
import { dbAdmin } from "@/lib/firebase-admin";
import NewsArticleClientPage from "./client-page";

// Force dynamic rendering so new articles appear instantly
export const dynamic = "force-dynamic";

// --- 1. DYNAMIC BASE URL HELPER ---
// This ensures the image link works on Localhost AND Production automatically.
const getBaseUrl = () => {
  // Check standard environment variables
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  // Vercel automatically sets this one
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // Fallback for local development
  return 'http://localhost:3000';
};

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

type Props = {
  params: Promise<{ slug: string }>;
};

// --- SEO: Generate Metadata ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  if (!slug) return { title: "Article Not Found" };

  const story = await getStory(slug);

  if (!story) {
    return {
      title: "Article Not Found | GrowShare Capital",
    };
  }

  // 2. CONSTRUCT THE MAGIC IMAGE URL
  const baseUrl = getBaseUrl();
  // This points to the file `opengraph-image.tsx` we created
  const ogImageUrl = `${baseUrl}/news/${slug}/opengraph-image`;

  return {
    // Critical: Tells Next.js how to resolve relative URLs
    metadataBase: new URL(baseUrl), 
    
    title: `${story.title} | GrowShare Capital`,
    description: story.description,
    
    // 3. WHATSAPP SPECIFIC CONFIGURATION
    openGraph: {
      title: story.title,
      description: story.description,
      url: `${baseUrl}/news/${slug}`,
      siteName: 'GrowShare Capital',
      locale: 'en_US',
      type: 'article',
      images: [
        {
          url: ogImageUrl,     // The Generated PNG
          width: 1200,         
          height: 630,         
          alt: story.title,
          type: 'image/png',   // Explicitly tell WhatsApp it's a PNG
        },
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      title: story.title,
      description: story.description,
      images: [ogImageUrl],
    },
  };
}

// --- MAIN PAGE COMPONENT ---
export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;

  if (!slug) notFound();

  const story = await getStory(slug);

  if (!story) notFound();

  return <NewsArticleClientPage initialStory={story} slug={slug} />;
}