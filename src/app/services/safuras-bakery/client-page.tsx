'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Phone, Star, 
  Truck, Instagram, Facebook, Sparkles, Heart, ChefHat
} from 'lucide-react';

// --- UTILITY: Class Merger ---
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// --- ASSETS ---
const HERO_IMAGE = "https://i.imgur.com/klLlEA4.jpeg"; 
const CHEF_IMAGE = "https://i.imgur.com/oKurtPO.jpeg"; 
const TEXTURE_URL = "https://www.transparenttextures.com/patterns/cream-paper.png"; 

// --- DATA: 10 ITEMS (2x5 Grid) ---
const COLLECTIONS = [
    { 
        title: "Wedding Cakes", 
        price: "Bespoke", 
        img: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=1000&auto=format&fit=crop" 
    },
    { 
        title: "Signature Cupcakes", 
        price: "Box of 6 / $35", 
        img: "https://i.imgur.com/9wVuwPK.jpeg" 
    },
    { 
        title: "Artisan Macarons", 
        price: "Box of 12 / $45", 
        img: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=1000&auto=format&fit=crop" 
    },
    { 
        title: "Rustic Tarts", 
        price: "From $55", 
        img: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=1000&auto=format&fit=crop" 
    },
    { 
        title: "Sourdough Loaves", 
        price: "$18", 
        img: "https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    },
    { 
        title: "Cream Puffs", 
        price: "Set of 4 / $28", 
        img: "https://images.unsplash.com/photo-1633424411336-f5b7a6886d88?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    },
    { 
        title: "Dark Chocolates", 
        price: "Gift Box / $40", 
        img: "https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=1000&auto=format&fit=crop" 
    },
    { 
        title: "Croissants", 
        price: "Dozen / $48", 
        img: "https://images.unsplash.com/photo-1651604033534-e66b281f1981?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    },
    { 
        title: "Layered Parfaits", 
        price: "$12 ea", 
        img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1000&auto=format&fit=crop" 
    },
    { 
        title: "Custom Gift Sets", 
        price: "Inquire", 
        img: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?q=80&w=1000&auto=format&fit=crop" 
    }
];

// 8 Images for a perfect 4x2 Grid
const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=1200", 
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200", 
  "https://images.unsplash.com/photo-1668887461930-44237b5eb558?q=80&w=1319", 
  "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?q=80&w=1200", 
  "https://images.unsplash.com/photo-1558326567-98ae2405596b?q=80&w=759", 
  "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?q=80&w=1200", 
  "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200", 
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1000&auto=format&fit=crop"  
];

const BRAND_NAME = "SAFURA'S";
const WHATSAPP_LINK = "https://wa.me/12144736888"; 
const FACEBOOK_LINK = "https://www.facebook.com/people/Safuras-Bakery/61587138013896/";

// --- CUSTOM ICONS ---
const BowIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M12 14.5C14 14.5 15.5 13 15.5 11C15.5 9 14 8.5 12 8.5C10 8.5 8.5 9 8.5 11C8.5 13 10 14.5 12 14.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.5 11C17.5 11 19.5 11.5 20.5 13.5C21.5 15.5 20.5 17.5 19 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.5 11C6.5 11 4.5 11.5 3.5 13.5C2.5 15.5 3.5 17.5 5 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 14.5V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 17.5L10 20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 17.5L14 20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// --- ANIMATION COMPONENTS ---
const Reveal = ({ children, delay = 0, width = "fit-content" }: { children: React.ReactNode, delay?: number, width?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }} 
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};

const ParallaxImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
    return (
        <div className={cn("overflow-hidden bg-[#EAE5DE]", className)}>
            <motion.img 
                src={src} 
                alt={alt}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-full h-full object-cover transition-opacity duration-700"
            />
        </div>
    );
};

function SectionHeading({ subtitle, title, align = "center", dark = false }: { subtitle: string, title: string, align?: 'center' | 'left', dark?: boolean }) {
    return (
        <Reveal width="100%">
            <div className={cn("mb-12 md:mb-24", align === "center" ? "text-center" : "text-left")}>
                <div className={cn("inline-flex items-center gap-2 mb-4 md:mb-6", align === "center" ? "justify-center" : "justify-start")}>
                    {/* Bow Icon Decoration */}
                    <BowIcon className={cn("w-4 h-4 opacity-70", dark ? "text-[#D48F85]" : "text-[#D48F85]")} />
                    <span className={cn(
                        "block text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] font-sans",
                        dark ? "text-[#D48F85]" : "text-[#D48F85]"
                    )}>
                        {subtitle}
                    </span>
                    <BowIcon className={cn("w-4 h-4 opacity-70", dark ? "text-[#D48F85]" : "text-[#D48F85]")} />
                </div>
                <h2 className={cn(
                    "font-serif text-4xl md:text-5xl lg:text-7xl leading-[1.1] md:leading-[0.95] tracking-tight",
                    dark ? "text-[#FDF5F5]" : "text-[#2B120A]"
                )}>
                    {title}
                </h2>
            </div>
        </Reveal>
    );
}

// --- MAIN PAGE COMPONENT ---

export default function SafuraLuxuryPage() {
    const { scrollYProgress } = useScroll();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="bg-[#FFFDFD] text-[#2B120A] min-h-screen font-sans selection:bg-[#D48F85] selection:text-white relative">
            
            {/* Fonts & Global Styles */}
            <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@200;300;400;500;600&family=Pinyon+Script&display=swap" rel="stylesheet" />
            
            <style dangerouslySetInnerHTML={{ __html: `
                html { scroll-behavior: smooth; }
                body > header, body > footer, body > nav, #main-header, #site-footer { display: none !important; }
                .font-serif { font-family: 'Cormorant Garamond', serif; }
                .font-sans { font-family: 'Montserrat', sans-serif; }
                .font-script { font-family: 'Pinyon Script', cursive; }
            `}} />
            
            {/* Soft Film Grain Texture */}
            <div 
                className="fixed inset-0 pointer-events-none z-50 opacity-[0.15] mix-blend-multiply bg-[#FFEFEF]"
                style={{ backgroundImage: `url(${TEXTURE_URL})` }}
            />

            {/* --- HERO SECTION --- */}
            {/* 'justify-center' to vertically center everything */}
            <section className="relative h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center pb-12 md:pb-24">
                
                {/* --- TOP BANNER (Exact Light Beige) --- */}
                <div className="absolute top-0 left-0 w-full z-50 bg-[#F4EBE8] text-[#5D4037] py-3 md:py-4 text-center px-4 shadow-sm border-b border-[#E8D8D5] flex flex-col items-center justify-center gap-1">
                     <p className="font-serif italic text-xs md:text-base leading-none text-[#8C6A64]">
                        Complimentary Concierge Delivery
                    </p>
                    <p className="font-sans text-[8px] md:text-[10px] tracking-[0.2em] uppercase font-semibold text-[#5D4037]/80">
                        Exclusive to Hoover & Birmingham
                    </p>
                </div>

                {/* Back Button */}
                <div className="absolute top-24 md:top-28 left-6 z-40">
                    <a href="/services" className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                        <ArrowLeft size={16} />
                    </a>
                </div>

                <div className="absolute inset-0 z-0">
                    {/* IMAGE STYLING */}
                    <img 
                        src={HERO_IMAGE} 
                        alt="Hero" 
                        className="w-full h-full object-cover object-[center_25%] brightness-[0.85] contrast-[1.0] saturate-[1.0] blur-[0.5px]" 
                    />
                    
                    {/* --- LAYERS --- */}
                    {/* Lighter Gradient Overlay: 50% via 25% */}
                    <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-b from-black/50 via-black/25 to-transparent" />
                    
                    {/* Bottom Fade */}
                    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#FFFDFD] via-[#FFFDFD]/80 to-transparent" />
                </div>
                
                {/* POSITIONING:
                   - 'mt-20 md:mt-32': Pushes text down onto the cake.
                */}
                <div className="relative z-10 text-center px-4 w-full max-w-5xl mt-20 md:mt-32"> 
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        {/* DECORATIVE LINES (Very Light Pink) */}
                        <div className="flex items-center justify-center gap-4 mb-4 md:mb-8 opacity-90">
                            <div className="h-[1px] bg-[#FFF5F5]/70 w-8 md:w-20" />
                            <div className="text-[#FFF5F5]/90 flex items-center gap-2 text-[9px] md:text-xs tracking-[0.3em] uppercase font-sans font-bold">
                                Est. 2024 • Hoover, AL
                            </div>
                            <div className="h-[1px] bg-[#FFF5F5]/70 w-8 md:w-20" />
                        </div>
                        
                        {/* MAIN TITLE (Very Light Pink / Almost White - #FFF5F5) */}
                        <h1 className="text-[#FFF5F5] font-serif text-[3.5rem] md:text-[6.5rem] lg:text-[8rem] leading-[0.85] tracking-normal font-normal mb-0 drop-shadow-sm uppercase">
                            SAFURA'S
                        </h1>

                        {/* SCRIPT SUBTITLE (UPDATED: Lighter Pink #FFD9D5) */}
                        {/* Changed from #E09F99 to #FFD9D5 for better readability on dark cake */}
                        <p className="font-script text-[#FFD9D5] text-[3rem] md:text-[6rem] lg:text-[8rem] leading-[1.1] mb-8 md:mb-12 mt-4 relative z-10 drop-shadow-md">
                            Atelier & Bakery
                        </p>
                        
                        {/* BUTTONS CONTAINER:
                           - 'mt-24 md:mt-32': Pushes buttons further down to keep them at the bottom.
                        */}
                        <div className="flex flex-col items-center justify-center gap-3 md:gap-4 w-full max-w-xs mx-auto mt-24 md:mt-32">
                            {/* Top Button: "Deep Terracotta" */}
                            <a href="#collections" className="bg-[#CC8C82] text-white px-6 py-3 md:px-8 md:py-4 text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-sans font-bold hover:bg-[#B57970] transition-all duration-500 w-full rounded-[2px] shadow-lg text-center">
                                View Collection
                            </a>
                            
                            {/* Bottom Button: "Pale Blush" */}
                            <a href="#contact" className="bg-[#F5D0CD] text-[#5A3A35] px-6 py-3 md:px-8 md:py-4 text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-sans font-bold hover:bg-[#EBC5C2] transition-all w-full rounded-[2px] shadow-lg text-center">
                                Custom Inquiry
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- PHILOSOPHY SECTION --- */}
            <section id="our-story" className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    <div className="lg:col-span-5 order-2 lg:order-1">
                       <Reveal>
                            <div className="aspect-[4/5] relative p-4 border border-[#D48F85]/20 rounded-t-[100px] rounded-b-[20px]">
                                <div className="absolute inset-0 border border-[#D48F85]/10 rounded-t-[100px] rounded-b-[20px] -rotate-2 z-0" />
                                <div className="relative h-full w-full overflow-hidden rounded-t-[90px] rounded-b-[10px]">
                                     <ParallaxImage src={CHEF_IMAGE} alt="Safura Signature Cake" className="relative z-10 w-full h-full grayscale-[10%] contrast-[1.1]" />
                                </div>
                            </div>
                       </Reveal>
                    </div>
                    <div className="lg:col-span-7 order-1 lg:order-2">
                        <Reveal delay={0.2}>
                            <h2 className="font-serif text-4xl md:text-6xl text-[#2B120A] leading-[1.1] mb-6 md:mb-8">
                                Pure Butter. <br/> 
                                Rich Cocoa. <br/>
                                <span className="font-script text-[#D48F85] text-5xl md:text-7xl relative -top-2">Unforgettable.</span>
                            </h2>
                            <p className="font-sans text-[#8C6A64] text-sm md:text-base leading-relaxed md:leading-loose max-w-xl font-light mb-8">
                                Safura's is a boutique bakery for the romantic at heart. We specialize in the art of chocolate and floral design, sculpting flavor using premium Belgian cocoa and locally sourced botanicals.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="border-l border-[#D48F85] pl-4">
                                    <h4 className="font-serif text-xl text-[#2B120A] flex items-center gap-2"><Heart size={14} className="text-[#D48F85]" /> Small Batch</h4>
                                    <p className="text-xs text-[#8C6A64] mt-1">Baked fresh with love.</p>
                                </div>
                                <div className="border-l border-[#D48F85] pl-4">
                                    <h4 className="font-serif text-xl text-[#2B120A] flex items-center gap-2"><BowIcon className="w-4 h-4 text-[#D48F85]" /> Hand Piped</h4>
                                    <p className="text-xs text-[#8C6A64] mt-1">No molds, just artistry.</p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* --- COLLECTIONS (2x5 Grid - LV Style) --- */}
            <section id="collections" className="py-20 md:py-32 bg-[#FFFDFD] px-4 md:px-12 relative">
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#FDF5F5] to-transparent" />
                
                <div className="max-w-[1200px] mx-auto">
                    <SectionHeading subtitle="The Atelier" title="Curated Sweets" />
                    
                    {/* LOUIS VUITTON STYLE GRID: 2 Columns, 10 Items */}
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-x-12 md:gap-y-20">
                        {COLLECTIONS.map((item, i) => (
                            <Reveal key={i} delay={i * 0.05} width="100%">
                                <div className="group cursor-pointer flex flex-col items-center text-center">
                                    {/* Image Container with Soft Gradient Background (LV Style) */}
                                    <div className="relative w-full aspect-[4/5] mb-6 overflow-hidden bg-gradient-to-b from-[#F9F7F5] to-[#F0EFED] rounded-[4px]">
                                        <img 
                                            src={item.img} 
                                            alt={item.title}
                                            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                                        />
                                    </div>
                                    
                                    {/* Minimal Text Below */}
                                    <h3 className="font-sans text-sm md:text-lg text-[#2B120A] font-medium uppercase tracking-widest mb-2 group-hover:text-[#D48F85] transition-colors">
                                        {item.title}
                                    </h3>
                                    <span className="font-serif text-sm md:text-base text-[#8C6A64] italic">
                                        {item.price}
                                    </span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- GALLERY (8 IMAGES) --- */}
            <section className="py-20 md:py-32 bg-[#FDF5F5] overflow-hidden">
                <div className="max-w-[1600px] mx-auto px-6">
                    <Reveal>
                        <div className="flex flex-col items-center justify-center mb-16">
                            <SectionHeading subtitle="Moments of Sweetness" title="The Gallery" />
                        </div>
                    </Reveal>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {GALLERY_IMAGES.map((src, index) => (
                            <Reveal key={index} delay={index * 0.05}>
                                <div className="aspect-[4/5] relative group overflow-hidden rounded-[4px]">
                                    <ParallaxImage src={src} alt={`Gallery ${index}`} className="w-full h-full group-hover:scale-105 transition-transform duration-1000" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#D48F85]/20 backdrop-blur-[2px]">
                                        <div className="bg-white/90 p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <Instagram className="text-[#D48F85] w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- THE PROCESS --- */}
            <section id="the-process" className="py-20 md:py-32 px-6 md:px-12 bg-[#2B120A] text-[#FDF5F5]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
                        
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <Sparkles className="text-[#D48F85] w-5 h-5" />
                                <span className="text-[10px] uppercase tracking-[0.3em] text-[#D48F85] font-bold">The Experience</span>
                            </div>
                            <h2 className="font-serif text-4xl md:text-5xl text-[#FDF5F5] mb-12 leading-tight">
                                From Sketch <br/> to <span className="font-script text-[#D48F85] text-5xl md:text-7xl relative top-2">Slice.</span>
                            </h2>

                            <div className="space-y-12">
                                {[
                                    { icon: Star, title: "01. Consultation", text: "We discuss your vision via WhatsApp or phone to curate the perfect flavor profile." },
                                    { icon: ChefHat, title: "02. The Bake", text: "We use premium dark chocolate and European butter. No preservatives, ever." },
                                    { icon: Truck, title: "03. Delivery", text: "White-glove delivery to Hoover & Birmingham. We ensure it arrives pristine." }
                                ].map((step, idx) => (
                                    <Reveal key={idx} delay={idx * 0.1}>
                                        <div className="flex gap-5 md:gap-6 group">
                                            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#FDF5F5]/20 flex items-center justify-center text-[#D48F85] group-hover:border-[#D48F85] group-hover:bg-[#D48F85] group-hover:text-white transition-all duration-500 shadow-[0_0_20px_-5px_rgba(212,143,133,0)] group-hover:shadow-[0_0_20px_-5px_rgba(212,143,133,0.5)]">
                                                <step.icon size={18} />
                                            </div>
                                            <div>
                                                <h4 className="font-serif text-xl md:text-2xl mb-2 text-[#FDF5F5]">{step.title}</h4>
                                                <p className="text-[#FDF5F5]/60 font-sans text-xs md:text-sm font-light leading-relaxed max-w-sm">
                                                    {step.text}
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>

                        <div className="relative mt-8 lg:mt-0 hidden md:block">
                            <div className="absolute -inset-4 border border-[#FDF5F5]/10 z-0 rounded-t-[100px]" />
                            <div className="h-[600px] w-full z-10 relative overflow-hidden rounded-t-[100px]">
                                <ParallaxImage 
                                    src="https://images.unsplash.com/photo-1519340333755-56e9c1d04579?q=80&w=1200" 
                                    className="h-full w-full opacity-80" 
                                    alt="Process Image"
                                />
                            </div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="absolute -bottom-10 -left-10 z-20 bg-[#FDF5F5] p-10 max-w-xs shadow-2xl rounded-tr-[40px]"
                            >
                                <p className="font-serif italic text-2xl text-[#2B120A] leading-tight">
                                    "Luxury is in each detail."
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <section id="contact" className="relative bg-white pt-24 pb-16 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FADADD]/20 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative max-w-4xl mx-auto text-center z-10">
                    <Reveal>
                        <h2 className="font-serif text-6xl md:text-8xl text-[#2B120A] mb-8 md:mb-10">Let's Celebrate.</h2>
                        
                        <p className="font-sans text-[#8C6A64] mb-12 max-w-md mx-auto leading-loose text-sm md:text-base">
                            Ready to commission your centerpiece? <br/>
                            We accept a limited number of bookings per month.
                        </p>
                        
                        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 mb-16">
                            <div className="flex items-center justify-center gap-4 px-10 py-5 bg-[#FDF5F5]/80 backdrop-blur-sm rounded-full border border-[#2B120A]/5 min-w-[240px] hover:border-[#D48F85]/30 hover:bg-[#FFF0F0] transition-colors w-full md:w-auto">
                                <MapPin className="w-4 h-4 text-[#C08A82]" />
                                <div className="flex flex-col text-left">
                                    <span className="text-[10px] md:text-[11px] uppercase tracking-widest font-bold text-[#2B120A]">Hoover,</span>
                                    <span className="text-[10px] md:text-[11px] uppercase tracking-widest font-bold text-[#2B120A]">AL</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-4 px-10 py-5 bg-[#FDF5F5]/80 backdrop-blur-sm rounded-full border border-[#2B120A]/5 min-w-[240px] hover:border-[#D48F85]/30 hover:bg-[#FFF0F0] transition-colors w-full md:w-auto">
                                <Truck className="w-4 h-4 text-[#C08A82]" />
                                <div className="flex flex-col text-left">
                                    <span className="text-[10px] md:text-[11px] uppercase tracking-widest font-bold text-[#2B120A]">Complimentary</span>
                                    <span className="text-[10px] md:text-[11px] uppercase tracking-widest font-bold text-[#2B120A]">Delivery</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center gap-8 mb-16">
                             <a 
                                href={FACEBOOK_LINK} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-14 h-14 rounded-full border border-[#2B120A]/10 flex items-center justify-center hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all text-[#2B120A] shadow-sm hover:shadow-md"
                            >
                                <Facebook size={20}/>
                            </a>

                            <a href="#" className="w-14 h-14 rounded-full border border-[#2B120A]/10 flex items-center justify-center hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F] transition-all text-[#2B120A] shadow-sm hover:shadow-md">
                                <Instagram size={20}/>
                            </a>
                            
                            <a href={WHATSAPP_LINK} className="w-14 h-14 rounded-full border border-[#2B120A]/10 flex items-center justify-center hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all text-[#2B120A] shadow-sm hover:shadow-md">
                                <Phone size={20}/>
                            </a>
                        </div>

                        <div className="h-[1px] w-full bg-[#2B120A]/5 mb-10" />

                        <div className="flex flex-col items-center gap-3 animate-fade-in-up">
                            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#8C6A64]/70 font-sans">
                                © 2026 {BRAND_NAME}. ALL RIGHTS RESERVED.
                            </p>
                            
                            <div className="flex items-baseline justify-center gap-2 text-[#C08A82]">
                                <span className="font-serif italic text-lg md:text-xl">A</span>
                                <span className="font-sans font-bold text-xs md:text-sm tracking-[0.15em] uppercase">Growshare Capital</span>
                                <span className="font-serif italic text-lg md:text-xl">Company</span>
                            </div>
                        </div>

                    </Reveal>
                </div>
            </section>
        </div>
    );
}