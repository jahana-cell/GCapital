import { ImageResponse } from 'next/og';
import { dbAdmin } from '@/lib/firebase-admin';

// Force Node.js runtime so we can use Firebase Admin SDK
export const runtime = 'nodejs';

export const alt = 'GrowShare Capital News';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Type definition for Next.js 15+ (Params is a Promise)
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  // FIX: Await the params Promise
  const { slug } = await params;
  
  let title = 'Investment Insights';
  let date = '';
  let imageUrl = ''; // <--- New variable for the image

  console.log(`🖼️ Generating OpenGraph Image for: ${slug}`);

  try {
    if (dbAdmin) {
        // 1. Try fetching by ID first (clean slug)
        const docRef = dbAdmin.collection('stories').doc(slug);
        const docSnap = await docRef.get();
        let data: any = null;
        
        if (docSnap.exists) {
            data = docSnap.data();
        } else {
             // 2. Fallback: Query by 'slug' field
             const q = dbAdmin.collection('stories').where('slug', '==', slug).limit(1);
             const qSnap = await q.get();
             if (!qSnap.empty) {
                 data = qSnap.docs[0].data();
             }
        }

        // 3. Extract Data
        if (data) {
            title = data.title || title;
            imageUrl = data.image || ''; // <--- Fetch the image URL
            
            if (data.date) {
               const d = typeof data.date.toDate === 'function' 
                 ? data.date.toDate() 
                 : new Date(data.date);
                 
               date = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            }
        }
    }
  } catch (e) {
    console.error('OG Image Fetch Error:', e);
  }

  // 4. Generate the Image
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
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* --- LAYER 1: BACKGROUND IMAGE --- */}
        {imageUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
                src={imageUrl}
                alt="Background"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            />
        ) : null}

        {/* --- LAYER 2: DARK GRADIENT OVERLAY --- */}
        {/* This ensures text is readable even if the image is white/bright */}
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.9))',
            }}
        />

        {/* --- LAYER 3: GOLD BORDER --- */}
        <div style={{
            position: 'absolute',
            top: '20px', left: '20px', right: '20px', bottom: '20px',
            border: '2px solid rgba(212, 175, 55, 0.5)', // Gold with transparency
            display: 'flex',
            pointerEvents: 'none'
        }} />

        {/* --- LAYER 4: CONTENT --- */}
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10, // Sit on top of overlay
            padding: '0 60px',
            textAlign: 'center',
        }}>
            {/* Brand Label */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#D4AF37', // Gold
                color: '#000',
                fontSize: 14,
                fontWeight: 900,
                padding: '8px 20px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: 30,
                borderRadius: '2px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}>
                GrowShare Capital
            </div>

            {/* Article Title */}
            <div style={{
                display: 'flex',
                textAlign: 'center',
                fontSize: 60,
                fontWeight: 'bold',
                lineHeight: 1.1,
                color: '#ffffff',
                textShadow: '0 4px 12px rgba(0,0,0,0.8)', // Shadow for readability
            }}>
                {title}
            </div>

            {/* Date */}
            {date && (
                <div style={{
                    marginTop: 30,
                    fontSize: 20,
                    color: '#e5e5e5',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                }}>
                    {date}
                </div>
            )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}