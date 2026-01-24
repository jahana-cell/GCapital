import { ImageResponse } from 'next/og';
import { dbAdmin } from '@/lib/firebase-admin';

// ✅ Force Node.js runtime so we can use Firebase Admin SDK
export const runtime = 'nodejs';

export const alt = 'GrowShare Capital News';
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
  let imageUrl = ''; // <--- Variable to store the article image

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
            imageUrl = data.image || ''; // <--- Fetch the specific image
            
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
        {/* --- LAYER 1: BACKGROUND (Dynamic Image OR Old Pattern) --- */}
        {imageUrl ? (
            // A. If image exists, show it stretched full width/height
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={imageUrl}
                alt="bg"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            />
        ) : (
            // B. If NO image, use your ORIGINAL "dots" pattern exactly as before
            <div 
                style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    backgroundImage: 'radial-gradient(circle at 25px 25px, #1a1a1a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1a1a1a 2%, transparent 0%)',
                    backgroundSize: '100px 100px',
                }}
            />
        )}

        {/* --- LAYER 2: DARK OVERLAY (Only if image exists) --- */}
        {/* We need this so the text is readable. It's just a dark tint. */}
        {imageUrl && (
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.6)', // 60% dark overlay
                }}
            />
        )}

        {/* --- LAYER 3: CONTENT (EXACTLY YOUR OLD CODE) --- */}
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10, 
            width: '100%',
            height: '100%',
        }}>
            {/* Border (Your original #333 border) */}
            <div style={{
                position: 'absolute',
                top: '20px', left: '20px', right: '20px', bottom: '20px',
                border: '2px solid #333',
                display: 'flex',
                pointerEvents: 'none'
            }} />

            {/* Brand Label (Gold Badge) */}
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
      </div>
    ),
    {
      ...size,
    }
  );
}