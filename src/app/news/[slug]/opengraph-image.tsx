import { ImageResponse } from 'next/og';
import { dbAdmin } from '@/lib/firebase-admin';

// 1. Force Node.js runtime (Required for Firebase Admin)
export const runtime = 'nodejs';

export const alt = 'GrowShare Capital News';

export const size = {
  width: 1200,
  height: 630,
};

// 2. CRITICAL FOR WHATSAPP: 
// ImageResponse generates PNGs by default. 
// Do not set this to 'image/jpeg' or the file will be corrupt.
export const contentType = 'image/png';

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Helper to ensure background images aren't too massive.
 * WhatsApp fails if the final OG image is >300KB.
 * We request a smaller version from the CDN if possible.
 */
const optimizeImageUrl = (url: string) => {
  if (!url) return '';
  
  // If using Unsplash, we can control quality via URL params
  if (url.includes('unsplash.com')) {
    // w=1200: Resize to fit OG width
    // q=60: Lower quality to reduce file size
    // fm=jpg: Fetch as JPEG source (smaller download)
    return `${url}&w=1200&q=60&fm=jpg`;
  }
  
  // For Firebase Storage, we use the URL as is, 
  // but the overlay in the CSS will help hide artifacts if we scale it.
  return url;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  
  // Default values
  let title = 'Investment Insights';
  let date = '';
  let imageUrl = '';

  console.log(`Generating OpenGraph Image for: ${slug}`);

  try {
    if (dbAdmin) {
        // A. Try fetching by Document ID first
        const docRef = dbAdmin.collection('stories').doc(slug);
        const docSnap = await docRef.get();
        let data: any = null;
        
        if (docSnap.exists) {
            data = docSnap.data();
        } else {
             // B. Fallback: Query by 'slug' field
             const q = dbAdmin.collection('stories').where('slug', '==', slug).limit(1);
             const qSnap = await q.get();
             if (!qSnap.empty) {
                 data = qSnap.docs[0].data();
             }
        }

        // C. Extract Data
        if (data) {
            title = data.title || title;
            // Optimize the image URL to prevent bloating the PNG size
            imageUrl = optimizeImageUrl(data.image || ''); 
            
            if (data.date) {
               // Handle Firebase Timestamp or String dates
               const d = typeof data.date.toDate === 'function' 
                 ? data.date.toDate() 
                 : new Date(data.date);
                 
               // Check if date is valid
               if (!isNaN(d.getTime())) {
                   date = d.toLocaleDateString('en-US', { 
                       month: 'long', 
                       day: 'numeric', 
                       year: 'numeric' 
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
        {/* LAYER 1: BACKGROUND IMAGE OR FALLBACK PATTERN */}
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
                }}
            />
        ) : (
            // Fallback pattern if no image exists
            <div 
                style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    backgroundImage: 'radial-gradient(circle at 25px 25px, #1a1a1a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1a1a1a 2%, transparent 0%)',
                    backgroundSize: '100px 100px',
                    backgroundColor: '#111',
                }}
            />
        )}

        {/* LAYER 2: DARK OVERLAY 
            We use a strong overlay (0.85 opacity).
            Why? It dramatically reduces the color complexity of the image,
            which makes the final PNG file size much smaller (fixing WhatsApp issues)
            while still showing the texture of the background image.
        */}
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(5, 5, 5, 0.85)', 
            }}
        />

        {/* LAYER 3: CONTENT CONTAINER */}
        <div style={{
            position: 'relative',
            zIndex: 10,
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 80px', // Extra padding to prevent text hitting edges
        }}>
            {/* Decorative Border */}
            <div style={{
                position: 'absolute',
                top: '24px', left: '24px', right: '24px', bottom: '24px',
                border: '2px solid #444',
                display: 'flex',
                pointerEvents: 'none'
            }} />

            {/* Brand Badge */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#D4AF37', // Gold
                color: '#000',
                fontSize: 14,
                fontWeight: 900,
                padding: '8px 20px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: 30,
                borderRadius: '2px',
            }}>
                GrowShare Capital
            </div>

            {/* Title - Clamped and Centered */}
            <div style={{
                display: 'flex',
                textAlign: 'center',
                fontSize: 56, 
                fontWeight: 'bold',
                lineHeight: 1.1,
                color: '#f5f5f5',
                textShadow: '0 4px 12px rgba(0,0,0,0.6)',
                maxWidth: '100%',
                wordWrap: 'break-word',
            }}>
                {title}
            </div>

            {/* Date Footer */}
            {date && (
                <div style={{
                    marginTop: 30,
                    fontSize: 18,
                    color: '#a3a3a3',
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