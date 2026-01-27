'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Car, 
  ShoppingBasket, 
  Home,
  Download,
  CheckCircle2,
  Layers
} from 'lucide-react';

// --- IMAGES CONFIGURATION ---
const IMAGES = {
  hero: "https://i.imgur.com/cLGTKIk.png",       // Aerial Shot
  sitePlan: "https://i.imgur.com/kuZC1Hb.png",   // 3D Site Map
  anchor: "https://i.imgur.com/rxhCvZ3.jpeg",    // Brooks Market Exterior
  interior: "https://i.imgur.com/Q3idXhM.png",   // Living Room Render
  annex: "https://i.imgur.com/iHKj1iW.png",      // Garage Building
  townhome: "https://i.imgur.com/UWysOpZ.png"    // Townhome Row
};

export default function PlatformBrooksPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#111] font-sans selection:bg-[#D4AF37] selection:text-white pb-[120px] md:pb-24">
      
      {/* --- 1. IMMERSIVE CINEMATIC HERO (Mobile Optimized) --- */}
      <section className="relative w-full h-[100svh]">
        <Image
           src={IMAGES.hero}
           alt="The PLATFORM @ Brooks"
           fill
           className="object-cover"
           priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/90" />
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
           <div className="animate-fade-in-up space-y-6 max-w-4xl mx-auto">
              {/* Luxury Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2 border border-[#D4AF37]/50 bg-black/40 backdrop-blur-xl rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"/>
                <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase">
                  Institutional Asset
                </span>
              </div>
              
              <div className="space-y-2">
                <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-white tracking-tighter drop-shadow-2xl">
                    The PLATFORM
                </h1>
                <p className="text-2xl md:text-3xl font-light text-white/80 font-serif italic">
                    @ Brooks
                </p>
              </div>

              <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto my-6 opacity-70"></div>

              <p className="text-neutral-200 max-w-xs md:max-w-lg mx-auto text-sm md:text-base leading-relaxed tracking-wide font-light">
                A 58,590 SF mixed-use ecosystem transforming a strategic corner into a high-yield community hub.
              </p>
           </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60">
            <span className="text-[9px] text-white uppercase tracking-[0.2em]">Explore</span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* --- 2. EXECUTIVE FINANCIAL DASHBOARD (App Style Grid) --- */}
      <section className="relative -mt-12 md:-mt-20 z-10 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-white shadow-2xl border-t-4 border-[#D4AF37] grid grid-cols-2 md:grid-cols-4">
            
            {/* Stat 1 */}
            <div className="p-6 md:p-10 border-b md:border-b-0 border-r border-neutral-100 text-center md:text-left">
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-2">Project Cost</p>
                <p className="text-2xl md:text-4xl font-serif text-[#111]">$10.14 M</p>
            </div>

            {/* Stat 2 */}
            <div className="p-6 md:p-10 border-b md:border-b-0 md:border-r border-neutral-100 text-center md:text-left bg-neutral-50/50">
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-2">Target Yield</p>
                <p className="text-2xl md:text-4xl font-serif text-[#D4AF37]">5.42%</p>
                <p className="hidden md:block text-xs text-neutral-500 font-medium mt-1">On Cost</p>
            </div>

            {/* Stat 3 */}
            <div className="p-6 md:p-10 border-r border-neutral-100 text-center md:text-left">
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-2">Equity Mult.</p>
                <p className="text-2xl md:text-4xl font-serif text-[#111]">2.1x</p>
            </div>

            {/* Stat 4 */}
            <div className="p-6 md:p-10 text-center md:text-left">
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-2">Total Density</p>
                <p className="text-2xl md:text-4xl font-serif text-[#111]">52 Units</p>
            </div>

        </div>
      </section>

      {/* --- 3. THE NARRATIVE --- */}
      <section className="py-20 md:py-32 space-y-24 md:space-y-32 overflow-hidden">
        
        {/* BLOCK 1: THE ANCHOR */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Mobile Order: Image First, Text Second */}
            <div className="order-2 lg:order-1 space-y-8">
                <div className="inline-flex items-center gap-3 text-[#D4AF37]">
                    <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">The Anchor</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-serif leading-tight text-[#111]">
                    Recession-Resistant <br/> Commercial Stability.
                </h2>
                <p className="text-neutral-600 text-lg leading-relaxed font-light">
                    At the heart lies <span className="font-semibold text-black">Brooks Market</span>. A 5,000 SF grocery anchor addressing a critical "Food Desert" void. The NNN lease structure creates a defensive moat against economic downturns.
                </p>
                
                <div className="grid grid-cols-2 gap-8 pt-6 border-t border-neutral-200">
                    <div>
                        <p className="text-2xl md:text-3xl font-serif">$226k</p>
                        <p className="text-[9px] uppercase tracking-wider text-neutral-500 mt-1">Est. Annual Revenue</p>
                    </div>
                    <div>
                        <p className="text-2xl md:text-3xl font-serif">12 Units</p>
                        <p className="text-[9px] uppercase tracking-wider text-neutral-500 mt-1">Boutique Residential</p>
                    </div>
                </div>
            </div>
            
            {/* Image Frame (Gallery Style) */}
            <div className="order-1 lg:order-2">
                <div className="relative h-[300px] md:h-[500px] w-full bg-white shadow-2xl p-4 border border-neutral-100">
                    <div className="relative w-full h-full">
                        <Image 
                            src={IMAGES.anchor} 
                            alt="Brooks Market" 
                            fill 
                            className="object-contain" 
                        />
                    </div>
                    {/* Floating Label */}
                    <div className="absolute -bottom-4 -left-4 bg-[#111] text-white px-6 py-3 shadow-lg z-10">
                         <span className="text-[10px] uppercase tracking-widest font-bold">Street-Front Activation</span>
                    </div>
                </div>
            </div>
        </div>

        {/* BLOCK 2: THE TOWNHOMES (Dark Mode) */}
        <div className="bg-[#111] text-white py-20 md:py-24 -mx-0 relative">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Image Frame */}
                <div className="relative h-[300px] md:h-[500px] w-full bg-white shadow-2xl p-3 border border-white/20">
                    <div className="relative w-full h-full">
                        <Image 
                            src={IMAGES.townhome} 
                            alt="Townhomes" 
                            fill 
                            className="object-contain" 
                        />
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="inline-flex items-center gap-3 text-[#D4AF37]">
                         <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">Residential</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif leading-tight text-white">
                        The "Missing Middle" <br/> Solution.
                    </h2>
                    <p className="text-neutral-400 text-lg leading-relaxed font-light">
                        Designed for the demographic "sweet spot" — tenants who desire the space of a single-family home without the maintenance. This asset class historically drives the <span className="text-white font-medium">highest retention rates</span>.
                    </p>
                    <ul className="space-y-6 pt-4">
                        <li className="flex items-start gap-5">
                            <div className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center shrink-0 border border-white/10">
                                <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                            </div>
                            <div>
                                <p className="font-serif text-xl">Secure Courtyard Layout</p>
                                <p className="text-sm text-neutral-500 mt-1">54 protected parking spaces.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-5">
                            <div className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center shrink-0 border border-white/10">
                                <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                            </div>
                            <div>
                                <p className="font-serif text-xl">High-End Finishes</p>
                                <p className="text-sm text-neutral-500 mt-1">Quartz counters & stainless appliances.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        {/* BLOCK 3: THE ANNEX (Arbitrage) */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
                <div className="inline-flex items-center gap-3 text-[#D4AF37]">
                    <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">The Annex</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif leading-tight">
                    The Garage <br/> Arbitrage Strategy.
                </h2>
                <p className="text-neutral-600 text-lg leading-relaxed font-light">
                    We utilize the ground plane for unheated storage to reduce construction complexity while generating premium yield. This "found money" strategy adds <span className="font-semibold text-black">$36k/year</span> to the bottom line.
                </p>
                <div className="bg-[#F9F9F7] p-8 border-l-2 border-[#D4AF37]">
                    <p className="font-serif italic text-xl md:text-2xl text-[#111]">"High margin revenue on otherwise low-cost space."</p>
                    <p className="text-[10px] uppercase tracking-widest text-neutral-500 mt-4">— Investment Thesis</p>
                </div>
            </div>
            
             {/* Image Frame */}
             <div className="relative h-[300px] md:h-[500px] w-full bg-white shadow-2xl p-4 border border-neutral-100">
                <div className="relative w-full h-full">
                    <Image 
                        src={IMAGES.annex} 
                        alt="The Annex" 
                        fill 
                        className="object-contain" 
                    />
                </div>
            </div>
        </div>

      </section>

      {/* --- 4. SITE PLAN (Gallery Feel) --- */}
      <section className="bg-white py-20 md:py-24 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-serif mb-4">Master Planned Efficiency</h2>
                <p className="text-neutral-500 font-light text-sm md:text-base">
                    Traffic segregation ensures commercial customers never encroach on residential privacy.
                </p>
            </div>
            
            <div className="relative aspect-square md:aspect-[16/9] w-full border border-neutral-200 shadow-inner bg-[#FAFAFA] p-4 md:p-8">
                <Image src={IMAGES.sitePlan} alt="Site Circulation Plan" fill className="object-contain" />
            </div>
        </div>
      </section>

      {/* --- 5. PREMIUM STICKY FOOTER (Mobile Optimized) --- */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-lg border-t border-neutral-200 p-4 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pb-safe">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            
            <div className="hidden md:block">
                <p className="text-sm font-serif text-[#111]">The PLATFORM @ Brooks</p>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest">Target Yield: 5.42%</p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
                {/* Download Button */}
                <a 
                  href="https://firebasestorage.googleapis.com/v0/b/growshare-capital.firebasestorage.app/o/Real%20Estate%2FThe%20Platform%2FThe%20Platform.pdf?alt=media&token=3433b90b-c4e4-41a7-99e2-402ea6e0fed5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-none flex items-center justify-center gap-3 px-4 h-14 bg-neutral-100 hover:bg-neutral-200 text-[#111] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] transition-colors"
                >
                    <Download className="w-4 h-4" />
                    <span className="hidden md:inline">Download</span> PDF
                </a>
                
                {/* Invest Button - Taller and bolder for mobile */}
                <Link 
                  href="/contact" 
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 h-14 bg-[#111] hover:bg-[#D4AF37] hover:text-black text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-lg"
                >
                    Request Access
                </Link>
            </div>
        </div>
      </div>

    </div>
  );
}