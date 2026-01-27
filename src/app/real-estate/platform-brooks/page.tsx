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
    <div className="min-h-screen bg-[#F5F5F0] text-[#111] font-sans selection:bg-[#D4AF37] selection:text-white pb-24">
      
      {/* --- 1. IMMERSIVE CINEMATIC HERO --- */}
      <section className="relative w-full h-screen">
        <Image
           src={IMAGES.hero}
           alt="The PLATFORM @ Brooks"
           fill
           className="object-cover"
           priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
           <div className="animate-fade-in-up space-y-6 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#D4AF37] bg-black/40 backdrop-blur-md rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"/>
                <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.25em] uppercase">
                  Institutional Opportunity
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-white tracking-tighter drop-shadow-2xl">
                The PLATFORM
              </h1>
              
              <p className="text-xl md:text-3xl font-light text-white/90 font-serif italic">
                @ Brooks
              </p>

              <p className="text-neutral-300 max-w-lg mx-auto text-sm md:text-base leading-relaxed tracking-wide pt-4">
                A 58,590 SF mixed-use ecosystem transforming a strategic corner into a high-yield community hub.
              </p>
           </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
            <span className="text-[9px] text-white uppercase tracking-widest">Explore the Asset</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* --- 2. EXECUTIVE FINANCIAL DASHBOARD --- */}
      <section className="relative -mt-20 z-10 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-white shadow-2xl border-t-4 border-[#D4AF37] p-8 md:p-12 grid grid-cols-1 md:grid-cols-4 gap-8 md:divide-x divide-neutral-100">
            
            <div className="text-center md:text-left space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">Total Project Cost</p>
                <p className="text-3xl md:text-4xl font-serif text-[#111]">$10.14 M</p>
            </div>

            <div className="text-center md:text-left space-y-1 md:pl-8">
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">Stabilized Yield</p>
                <p className="text-3xl md:text-4xl font-serif text-[#D4AF37]">5.42%</p>
                <p className="text-xs text-neutral-500 font-medium">On Cost (Current Cap)</p>
            </div>

            <div className="text-center md:text-left space-y-1 md:pl-8">
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">Equity Multiple</p>
                <p className="text-3xl md:text-4xl font-serif text-[#111]">2.1x</p>
                <p className="text-xs text-neutral-500 font-medium">5-Year Hold Projection</p>
            </div>

            <div className="text-center md:text-left space-y-1 md:pl-8">
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">Total Density</p>
                <p className="text-3xl md:text-4xl font-serif text-[#111]">52 Units</p>
                <p className="text-xs text-neutral-500 font-medium">+ 5k SF Retail & 24 Garages</p>
            </div>

        </div>
      </section>

      {/* --- 3. THE NARRATIVE (Zig-Zag Layout) --- */}
      <section className="py-24 space-y-32">
        
        {/* BLOCK 1: THE ANCHOR */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-8">
                <div className="inline-flex items-center gap-2 text-[#D4AF37]">
                    <ShoppingBasket className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">The Anchor</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif leading-tight">
                    Recession-Resistant <br/> Commercial Stability.
                </h2>
                <p className="text-neutral-600 text-lg leading-relaxed font-light">
                    At the heart of the development lies <span className="font-semibold text-black">Brooks Market</span>. A 5,000 SF grocery anchor addressing a critical "Food Desert" void. The NNN lease structure shields ownership from operational cost inflation, creating a defensive moat against economic downturns.
                </p>
                
                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-neutral-200">
                    <div>
                        <p className="text-2xl font-serif">$226k</p>
                        <p className="text-[10px] uppercase tracking-wider text-neutral-500">Est. Annual Revenue</p>
                    </div>
                    <div>
                        <p className="text-2xl font-serif">12 Units</p>
                        <p className="text-[10px] uppercase tracking-wider text-neutral-500">Boutique Residential Above</p>
                    </div>
                </div>
            </div>
            {/* Image Fix: Object-contain with white bg to fit the slide */}
            <div className="order-1 lg:order-2 relative h-[500px] w-full shadow-2xl bg-white border border-neutral-100">
                <Image 
                    src={IMAGES.anchor} 
                    alt="Brooks Market" 
                    fill 
                    className="object-contain p-4" 
                />
            </div>
        </div>

        {/* BLOCK 2: THE TOWNHOMES (Dark Mode) */}
        <div className="bg-[#111] text-white py-24 -mx-6 md:-mx-0">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Image Fix: Added bg-white and object-contain to make the slide visible on dark background */}
                <div className="relative h-[500px] w-full shadow-2xl border border-white/10 bg-white">
                    <Image 
                        src={IMAGES.townhome} 
                        alt="Townhomes" 
                        fill 
                        className="object-contain p-2" 
                    />
                </div>
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 text-[#D4AF37]">
                        <Home className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-widest">Residential</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif leading-tight text-white">
                        The "Missing Middle" <br/> Solution.
                    </h2>
                    <p className="text-neutral-400 text-lg leading-relaxed font-light">
                        Designed for the demographic "sweet spot" — tenants who desire the space of a single-family home without the maintenance. This asset class historically drives the <span className="text-white font-medium">highest retention rates</span> in the market.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-4">
                            <CheckCircle2 className="w-5 h-5 text-[#D4AF37] mt-1" />
                            <div>
                                <p className="font-serif text-lg">Secure Courtyard Layout</p>
                                <p className="text-sm text-neutral-500">54 protected parking spaces.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <CheckCircle2 className="w-5 h-5 text-[#D4AF37] mt-1" />
                            <div>
                                <p className="font-serif text-lg">High-End Finishes</p>
                                <p className="text-sm text-neutral-500">Quartz counters & stainless appliances.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        {/* BLOCK 3: THE ANNEX (Arbitrage) */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
                <div className="inline-flex items-center gap-2 text-[#D4AF37]">
                    <Car className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">The Annex</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif leading-tight">
                    The Garage <br/> Arbitrage Strategy.
                </h2>
                <p className="text-neutral-600 text-lg leading-relaxed font-light">
                    We utilize the ground plane for unheated storage to reduce construction complexity while generating premium yield. This "found money" strategy adds <span className="font-semibold text-black">$36k/year</span> to the bottom line with minimal maintenance overhead.
                </p>
                <div className="bg-[#F5F5F0] p-6 border-l-2 border-[#D4AF37]">
                    <p className="font-serif italic text-xl text-[#111]">"High margin revenue on otherwise low-cost space."</p>
                    <p className="text-xs uppercase tracking-widest text-neutral-500 mt-2">— Investment Thesis</p>
                </div>
            </div>
            {/* Image Fix: Object-contain with white bg to fit the slide */}
            <div className="relative h-[500px] w-full shadow-2xl bg-white border border-neutral-100">
                <Image 
                    src={IMAGES.annex} 
                    alt="The Annex" 
                    fill 
                    className="object-contain p-4" 
                />
            </div>
        </div>

      </section>

      {/* --- 4. SITE PLAN & BLUEPRINT --- */}
      <section className="bg-white py-24 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-serif mb-4">Master Planned Efficiency</h2>
                <p className="text-neutral-500 font-light">
                    Traffic segregation ensures commercial customers never encroach on residential privacy.
                </p>
            </div>
            
            <div className="relative aspect-[16/9] w-full border border-neutral-200 shadow-inner bg-neutral-50">
                <Image src={IMAGES.sitePlan} alt="Site Circulation Plan" fill className="object-contain p-4 md:p-8" />
                
                {/* Annotations */}
                <div className="absolute top-10 left-10 hidden md:block">
                    <div className="flex items-center gap-2 bg-white px-4 py-2 shadow-lg border border-neutral-100 rounded-full">
                        <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className="text-xs font-bold uppercase tracking-widest">North Bay: Commercial</span>
                    </div>
                </div>
                <div className="absolute bottom-10 right-10 hidden md:block">
                    <div className="flex items-center gap-2 bg-white px-4 py-2 shadow-lg border border-neutral-100 rounded-full">
                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                        <span className="text-xs font-bold uppercase tracking-widest">South Gate: Residential</span>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- 5. STICKY INVESTOR BAR (Bottom) --- */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-neutral-200 p-4 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="hidden md:block">
                <p className="text-sm font-serif text-[#111]">The PLATFORM @ Brooks</p>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest">Target Yield: 5.42%</p>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
                {/* PDF DOWNLOAD BUTTON */}
                <a 
                  href="https://firebasestorage.googleapis.com/v0/b/growshare-capital.firebasestorage.app/o/Real%20Estate%2FThe%20Platform%2FThe%20Platform.pdf?alt=media&token=3433b90b-c4e4-41a7-99e2-402ea6e0fed5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-[#111] text-xs font-bold uppercase tracking-widest transition-colors"
                >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                </a>
                
                <Link href="/contact" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-[#111] hover:bg-[#D4AF37] hover:text-black text-white text-xs font-bold uppercase tracking-widest transition-all shadow-lg">
                    Request Access
                </Link>
            </div>
        </div>
      </div>

    </div>
  );
}