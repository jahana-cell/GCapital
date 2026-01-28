import { ImageResponse } from 'next/og';
import { dbAdmin } from '@/lib/firebase-admin';

// 1. Force Node.js runtime
export const runtime = 'nodejs';

export const alt = 'GrowShare Capital News';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * OPTIMIZATION HELPER
 * WhatsApp Limit: 300KB.
 * We must request a tiny, low-quality version of the background image.
 * Since we put a dark overlay on top, the user won't notice the low quality.
 */
const optimizeImageUrl = (url: string) => {
  if (!url) return '';
  
  // 1. Unsplash Optimization (Aggressive)
  if (url.includes('unsplash.com')) {
    // w=600: Fetch half-width (we stretch it, which blurs it slightly - good for backgrounds)
    // q=10: Very low quality (hidden by overlay)
    // fm=jpg: Force JPEG source
    return `${url}&w=600&q=10&fm=jpg&blur=20`; 
  }

  // 2. Firebase Optimization
  // Firebase doesn't support dynamic resizing easily, so we can't force it here.
  // If you use Firebase images, ensure you upload smaller versions or use a cloud function resizer.
  return url;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  
  let title = 'Investment Insights';
  let date = '';
  let imageUrl = '';

  try {
    if (dbAdmin) {
        const docRef = dbAdmin.collection('stories').doc(slug);
        const docSnap = await docRef.get();
        let data: any = null;
        
        if (docSnap.exists) {
            data = docSnap.data();
        } else {
             const q = dbAdmin.collection('stories').where('slug', '==', slug).limit(1);
             const qSnap = await q.get();
             if (!qSnap.empty) {
                 data = qSnap.docs[0].data();
             }
        }

        if (data) {
            title = data.title || title;
            imageUrl = optimizeImageUrl(data.image || ''); 
            
            if (data.date) {
               const d = typeof data.date.toDate === 'function' 
                 ? data.date.toDate() 
                 : new Date(data.date);
               
               if (!isNaN(d.getTime())) {
                   date = d.toLocaleDateString('en-US', { 
                       month: 'long', day: 'numeric', year: 'numeric' 
                   });
               }
            }
        }
    }
  } catch (e) {
    console.error('OG Image Fetch Error:', e);
  }

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
          overflow: 'hidden',
        }}
      >
        {/* LAYER 1: BACKGROUND */}
        {imageUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
                src={imageUrl}
                alt="bg"
                width="1200"
                height="630"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    // CSS Blur to hide the low quality artifacts
                    filter: 'blur(4px)', 
                    transform: 'scale(1.1)', // Scale up slightly to hide blurred edges
                }}
            />
        ) : (
            <div 
                style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    backgroundImage: 'radial-gradient(circle at 25px 25px, #222 2%, transparent 0%)',
                    backgroundSize: '50px 50px',
                    backgroundColor: '#111',
                }}
            />
        )}

        {/* LAYER 2: DARK OVERLAY (Opacity 0.9 = Darker = Less Colors = Smaller File) */}
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(10, 10, 10, 0.9)', 
            }}
        />

        {/* LAYER 3: CONTENT */}
        <div style={{
            position: 'relative',
            zIndex: 10,
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 80px',
        }}>
            {/* Border */}
            <div style={{
                position: 'absolute',
                top: '24px', left: '24px', right: '24px', bottom: '24px',
                border: '2px solid #444',
                display: 'flex',
                pointerEvents: 'none'
            }} />

            {/* Logo */}
            <div style={{
                display: 'flex',
                backgroundColor: '#D4AF37',
                color: '#000',
                fontSize: 16,
                fontWeight: 900,
                padding: '8px 24px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: 30,
                borderRadius: '2px',
            }}>
                GrowShare Capital
            </div>

            {/* Title */}
            <div style={{
                display: 'flex',
                textAlign: 'center',
                fontSize: 60, 
                fontWeight: 'bold',
                lineHeight: 1.1,
                color: '#fff',
                textShadow: '0 4px 10px rgba(0,0,0,0.8)',
                maxWidth: '90%',
            }}>
                {title}
            </div>

            {/* Date */}
            {date && (
                <div style={{
                    marginTop: 30,
                    fontSize: 20,
                    color: '#ccc',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontFamily: 'sans-serif',
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