import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, CheckCircle2, Construction, AlertTriangle, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: "The PLATFORM @ Brooks | Real Estate",
  description: "Workforce housing initiative in Whitehaven, TN. Page under construction.",
};

export default function PlatformBrooksPage() {
  return (
    <div className="min-h-screen bg-[#F9F9F7]">
      
      {/* --- 1. HERO SECTION (Warning Mode) --- */}
      <div className="relative w-full h-[60vh] bg-neutral-900 overflow-hidden">
        {/* Background Image: Apartment / Community Placeholder */}
        <Image
           src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop" 
           alt="The PLATFORM @ Brooks"
           fill
           className="object-cover opacity-40 grayscale"
           priority
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/40 to-black/80" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
           
           {/* ⚠️ PAGE UNDER CONSTRUCTION BADGE ⚠️ */}
           <div className="inline-flex items-center gap-3 border border-amber-500/50 px-6 py-3 bg-amber-950/40 backdrop-blur-md mb-8 rounded-sm">
              <Construction className="w-4 h-4 text-amber-500" />
              <span className="text-amber-500 text-[11px] md:text-xs tracking-[0.25em] uppercase font-bold">
                 Page Under Construction
              </span>
           </div>

           <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 drop-shadow-2xl tracking-tight opacity-90">
              The PLATFORM @ Brooks
           </h1>
           
           <p className="text-neutral-400 font-light text-lg md:text-xl max-w-2xl leading-relaxed tracking-wide">
              Full resident data, impact metrics, and community gallery are currently being uploaded.
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
               
               {/* Left Column: Description */}
               <div className="md:col-span-2 space-y-8">
                  <div>
                    <h2 className="text-3xl font-serif text-[#1a1a1a] mb-6">Workforce Housing Initiative</h2>
                    <p className="text-neutral-600 text-lg leading-loose font-light">
                       A fully occupied workforce housing community in Whitehaven, designed to provide dignity and stability to local families. We are currently compiling the latest occupancy reports and renovation showcases.
                    </p>
                  </div>

                  {/* ⚠️ HIGH VISIBILITY WARNING BOX ⚠️ */}
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-6 flex items-start gap-4">
                      <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                      <div>
                          <h3 className="text-amber-900 font-bold text-xs tracking-widest uppercase mb-2">Content Unavailable</h3>
                          <p className="text-amber-800/80 text-sm leading-relaxed">
                            Our web team is actively working on this section. Please check back shortly for the full project case study and investment performance data.
                          </p>
                      </div>
                  </div>
               </div>

               {/* Right Column: Status (Green for Success) */}
               <div className="space-y-8 border-t md:border-t-0 md:border-l border-neutral-100 pt-8 md:pt-0 md:pl-12 opacity-80 hover:opacity-100 transition-opacity duration-500">
                  
                  {/* Status: Occupied */}
                  <div>
                     <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 block mb-3">Current Status</span>
                     <div className="flex items-center gap-3 text-[#1a1a1a]">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" /> {/* Green for success */}
                        <span className="font-serif text-xl">Fully Occupied</span>
                     </div>
                  </div>

                  {/* Location */}
                  <div>
                     <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 block mb-3">Location</span>
                     <div className="flex items-center gap-3 text-[#1a1a1a]">
                        <MapPin className="w-5 h-5 text-neutral-400" />
                        <span className="font-serif text-xl">Whitehaven, TN</span>
                     </div>
                  </div>

                  {/* Category */}
                  <div>
                     <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 block mb-3">Asset Type</span>
                     <div className="flex items-center gap-3 text-[#1a1a1a]">
                        <Users className="w-5 h-5 text-neutral-400" />
                        <span className="font-serif text-xl">Multifamily</span>
                     </div>
                  </div>

               </div>
            </div>
         </div>
      </div>
    </div>
  );
}