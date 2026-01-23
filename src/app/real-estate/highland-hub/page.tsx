import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, CheckCircle2, Construction, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: "887 S. Highland Hub | Coming Soon",
  description: "Mixed-use development in Memphis, TN. Page under construction.",
};

export default function HighlandHubPage() {
  return (
    <div className="min-h-screen bg-[#F9F9F7]">
      
      {/* --- 1. HERO SECTION (Warning Mode) --- */}
      <div className="relative w-full h-[60vh] bg-neutral-900 overflow-hidden">
        {/* Background: Darkened significantly to make text pop */}
        <Image
           src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" 
           alt="Highland Hub Construction"
           fill
           className="object-cover opacity-40 grayscale"
           priority
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/40 to-black/80" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
           
           {/* ⚠️ THE WARNING BADGE ⚠️ */}
           <div className="inline-flex items-center gap-3 border border-amber-500/50 px-6 py-3 bg-amber-950/40 backdrop-blur-md mb-8 rounded-sm">
              <Construction className="w-4 h-4 text-amber-500" />
              <span className="text-amber-500 text-[11px] md:text-xs tracking-[0.25em] uppercase font-bold">
                 Page Under Construction
              </span>
           </div>

           <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 drop-shadow-2xl tracking-tight opacity-90">
              887 S. Highland
           </h1>
           
           <p className="text-neutral-400 font-light text-lg md:text-xl max-w-2xl leading-relaxed tracking-wide">
              Full project details, renderings, and floor plans are currently being uploaded.
           </p>
        </div>
      </div>

      {/* --- 2. CONTENT CARD --- */}
      <div className="max-w-5xl mx-auto px-6 pb-24 relative z-10 -mt-20">
         <div className="bg-white p-8 md:p-16 shadow-2xl border-t-4 border-amber-500">
            
            <Link 
              href="/real-estate" 
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-400 hover:text-black transition-colors mb-10 group"
            >
              <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" /> 
              Return to Projects
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
               
               <div className="md:col-span-2 space-y-8">
                  <div>
                    <h2 className="text-3xl font-serif text-[#1a1a1a] mb-6">Project Overview</h2>
                    <p className="text-neutral-600 text-lg leading-loose font-light">
                       Located in the heart of Memphis, this mixed-use acquisition represents a strategic entry into the university district corridor. 
                    </p>
                  </div>

                  {/* ⚠️ HIGH VISIBILITY WARNING BOX ⚠️ */}
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-6 flex items-start gap-4">
                      <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                      <div>
                          <h3 className="text-amber-900 font-bold text-xs tracking-widest uppercase mb-2">Content Unavailable</h3>
                          <p className="text-amber-800/80 text-sm leading-relaxed">
                            We are actively working on this page. The full investment prospectus and architectural gallery will be available here shortly.
                          </p>
                      </div>
                  </div>
               </div>

               {/* Sidebar Details */}
               <div className="space-y-8 border-t md:border-t-0 md:border-l border-neutral-100 pt-8 md:pt-0 md:pl-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                  <div>
                     <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 block mb-3">Status</span>
                     <div className="flex items-center gap-3 text-[#1a1a1a]">
                        <CheckCircle2 className="w-5 h-5 text-neutral-400" />
                        <span className="font-serif text-xl">Acquired</span>
                     </div>
                  </div>

                  <div>
                     <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 block mb-3">Location</span>
                     <div className="flex items-center gap-3 text-[#1a1a1a]">
                        <MapPin className="w-5 h-5 text-neutral-400" />
                        <span className="font-serif text-xl">Memphis, TN</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}