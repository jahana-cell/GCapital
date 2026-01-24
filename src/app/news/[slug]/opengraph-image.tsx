import { ImageResponse } from 'next/og';
import { dbAdmin } from '@/lib/firebase-admin';

// ✅ Force Node.js runtime so we can use Firebase Admin SDK
export const runtime = 'nodejs';

export const alt = 'GrowShare Capital News';

// ✅ SIZE MATTERS: 1200x630 is the standard for "Big Cards"
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// ✅ Type definition for Next.js 15+ (Params is a Promise)
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  // ✅ FIX: Await the params Promise
  const { slug } = await params;
  
  let title = 'Investment Insights';
  let date = '';

  console.log(`🖼️ Generating OpenGraph Image for: ${slug}`);

  try {
    if (dbAdmin) {
        // 1. Try fetching by ID first (clean slug)
        const docRef = dbAdmin.collection('stories').doc(slug);
        const docSnap = await docRef.get();
        
        if (docSnap.exists) {
            const data = docSnap.data();
            title = data?.title || title;
            if (data?.date) {
               // Handle Firestore Timestamp or Date string
               const d = typeof data.date.toDate === 'function' 
                 ? data.date.toDate() 
                 : new Date(data.date);
                 
               date = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            }
        } else {
             // 2. Fallback: Query by 'slug' field
             const q = dbAdmin.collection('stories').where('slug', '==', slug).limit(1);
             const qSnap = await q.get();
             if (!qSnap.empty) {
                 const data = qSnap.docs[0].data();
                 title = data?.title || title;
                 if (data?.date) {
                    const d = typeof data.date.toDate === 'function' 
                      ? data.date.toDate() 
                      : new Date(data.date);
                      
                    date = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                 }
             }
        }
    }
  } catch (e) {
    console.error('OG Image Fetch Error:', e);
  }

  // 3. Generate the Image
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a', 
          backgroundImage: 'radial-gradient(circle at 25px 25px, #1a1a1a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1a1a1a 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          color: 'white',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Border */}
        <div style={{
            position: 'absolute',
            top: '20px', left: '20px', right: '20px', bottom: '20px',
            border: '2px solid #333',
            display: 'flex',
            pointerEvents: 'none'
        }} />

        {/* Brand Label */}
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#D4AF37', // Gold
            color: '#000',
            fontSize: 16,
            fontWeight: 900,
            padding: '8px 24px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: 40,
            borderRadius: '2px',
        }}>
            GrowShare Capital
        </div>

        {/* Article Title */}
        <div style={{
          display: 'flex',
          textAlign: 'center',
          fontSize: 64,
          fontWeight: 'bold',
          lineHeight: 1.1,
          maxWidth: '80%',
          color: '#f5f5f5',
          textShadow: '0 4px 10px rgba(0,0,0,0.5)',
        }}>
          {title}
        </div>

        {/* Date / Footer */}
        {date && (
            <div style={{
                marginTop: 40,
                fontSize: 20,
                color: '#888',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
            }}>
                {date}
            </div>
        )}
      </div>
    ),
    {
      ...size,
    }
  );
}