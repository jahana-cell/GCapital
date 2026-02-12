'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Phone, Star, 
  Truck, Instagram, Facebook, Sparkles, ChefHat, X,
  Ban, Leaf, Check, ChevronRight, ChevronLeft
} from 'lucide-react';

// --- UTILITY: Class Merger ---
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// --- ASSETS ---
const HERO_IMAGE = "https://i.imgur.com/klLlEA4.jpeg"; 
const SAFURA_IMAGE = "https://i.imgur.com/47VIaGf.jpeg"; 
const CHEF_IMAGE = "https://i.imgur.com/oKurtPO.jpeg"; 
const TEXTURE_URL = "https://www.transparenttextures.com/patterns/cream-paper.png"; 

// --- LUXURY ANIMATION COMPONENTS ---
const LuxurySparkle = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
    <motion.svg viewBox="0 0 24 24" fill="currentColor" className={cn("absolute pointer-events-none z-20", className)} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.1, 0.5], rotate: [0, 45, 0] }} transition={{ duration: 4, repeat: Infinity, delay: delay, ease: "easeInOut" }}>
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </motion.svg>
);

const LuxurySheen = () => (
    <motion.div className="absolute inset-0 z-10 pointer-events-none" initial={{ x: '-100%' }} animate={{ x: '200%' }} transition={{ repeat: Infinity, repeatDelay: 5, duration: 1.5, ease: "easeInOut" }} style={{ background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0.0) 60%)', mixBlendMode: 'overlay' }} />
);

// --- DATA ---
type Variant = {
    title: string;
    images: string[]; 
    ingredients: string;
};

type CollectionItem = {
    title: string;
    price: string;
    img: string; // Main thumbnail for the grid
    ingredients: string;
    variants?: Variant[]; 
};

const COLLECTIONS: CollectionItem[] = [
    { 
        title: "The Cake Collection", 
        price: "From $65", 
        // UPDATED: Main Picture changed as requested
        img: "https://i.imgur.com/zfhCw5I.png",
        ingredients: "Layered sponge cakes with artisan fillings.",
        variants: [
            {
                title: "Luxury Chocolate Berry Cake",
                images: [
                    "https://i.imgur.com/zfhCw5I.png", 
                    "https://i.imgur.com/f4ggfx9.png"
                ],
                ingredients: "Rich chocolate sponge, fresh berry compote, smooth buttercream, gold leaf"
            },
            {
                title: "Chocolate Walnut Cake",
                images: ["https://i.imgur.com/wnfAXbT.jpeg"],
                ingredients: "Belgian chocolate cake, toasted walnuts, 70% ganache"
            },
            {
                title: "Lemon Elderflower",
                images: ["https://i.imgur.com/KMjQe7w.jpeg"],
                ingredients: "Zesty lemon cake, elderflower soak, lemon curd filling"
            },
            {
                title: "Hazelnut Rocher Royale",
                // UPDATED: Confirmed image
                images: ["https://i.imgur.com/0y5XJ9x.png"],
                ingredients: "Roasted hazelnut meringue, milk chocolate ganache, whole toasted hazelnuts, gold leaf"
            }
        ]
    },
    { 
        title: "Artisan Cupcakes", 
        price: "$6 / 12 Cupcakes", 
        img: "https://i.imgur.com/9wVuwPK.jpeg",
        ingredients: "Our signature miniature cakes.",
        variants: [
            {
                title: "Vanilla Whipped Cream",
                images: ["https://i.imgur.com/mREpZSN.png"],
                ingredients: "Madagascan vanilla bean sponge, house-made airy whipped cream"
            },
            {
                title: "Midnight Silk",
                images: ["https://i.imgur.com/JiRSUy2.png"],
                ingredients: "Valrhona dark chocolate sponge, ganache core"
            },
            {
                title: "Strawberry Rose",
                images: ["https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1000"],
                ingredients: "Fresh strawberry reduction, rose water infused sponge"
            },
            {
                title: "Salted Caramel",
                images: ["https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?q=80&w=1000"],
                ingredients: "Brown butter sponge, house-made salted caramel drizzle"
            }
        ]
    },
    { 
        title: "Bespoke Wedding Cakes", 
        price: "Bespoke Pricing", 
        img: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=1000",
        ingredients: "Designed for your special day.",
        variants: [
            {
                title: "Classic Vanilla Tier",
                images: ["https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=1000"],
                ingredients: "European cultured butter, Swiss meringue, edible gold leaf"
            },
            {
                title: "Hand Piped Floral",
                images: [
                    "https://i.imgur.com/zqk9uCy.jpeg", 
                    "https://i.imgur.com/2QZnRBO.jpeg"
                ],
                ingredients: "Intricate hand-piped buttercream flowers, smooth white fondant base"
            },
            {
                title: "Rustic Naked Cake",
                images: ["https://images.unsplash.com/photo-1519340333755-56e9c1d04579?q=80&w=1000"],
                ingredients: "Almond amaretto sponge, semi-exposed crumb, fresh berries"
            }
        ]
    },
    { 
        title: "Fudgy Brownies", 
        price: "Box of 6 / $35", 
        img: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?q=80&w=1000",
        ingredients: "Dense, rich, and intensely chocolatey.",
        variants: [
            {
                title: "Double Chocolate",
                images: [
                    "https://images.unsplash.com/photo-1589119908995-c6837fa14848?q=80&w=1000",
                    "https://images.unsplash.com/photo-1515037893149-de7f840978e2?q=80&w=1000"
                ],
                ingredients: "Belgian dark chocolate chunks folded into fudge batter"
            },
            {
                title: "Salted Caramel Swirl",
                images: ["https://images.unsplash.com/photo-1589119908995-c6837fa14848?q=80&w=1000"],
                ingredients: "House-made caramel ribbons, sea salt flake topping"
            },
            {
                title: "Walnut Crunch",
                images: ["https://images.unsplash.com/photo-1515037893149-de7f840978e2?q=80&w=1000"],
                ingredients: "Toasted California walnuts, espresso infusion"
            }
        ]
    },
    { 
        title: "Signature Tiramisu", 
        price: "$45 / Tray", 
        img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000",
        ingredients: "The classic Italian pick-me-up.",
        variants: [
            {
                title: "Classic Espresso",
                images: ["https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000"],
                ingredients: "Savoiardi ladyfingers, espresso soak, mascarpone cream"
            },
            {
                title: "Biscoff Tiramisu",
                images: ["https://i.imgur.com/zGcGIrf.png"],
                ingredients: "Lotus Biscoff cookie soak, spiced spread swirls, mascarpone cream, crushed biscuit topping"
            },
            {
                title: "Matcha Green Tea",
                images: ["https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1000"],
                ingredients: "Kyoto matcha powder, white chocolate shavings"
            },
            {
                title: "Berry Infusion",
                images: ["https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1000"],
                ingredients: "Raspberry reduction soak, fresh berry topping"
            }
        ]
    },
    { 
        title: "Tres Leches", 
        price: "$40 / Tray", 
        img: "https://i.imgur.com/kN0qZa8.png",
        ingredients: "Soaked in three milks for melt-in-the-mouth texture.",
        variants: [
            {
                title: "Classic Vanilla",
                images: ["https://i.imgur.com/kN0qZa8.png"],
                ingredients: "Evaporated milk, condensed milk, whole cream soak, cinnamon dust"
            },
            {
                title: "Rose & Pistachio",
                images: ["https://i.imgur.com/hDw8y4g.jpeg"],
                ingredients: "Rose water infusion, crushed pistachio garnish, edible rose petals"
            }
        ]
    }
];

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
    const [selectedItem, setSelectedItem] = useState<CollectionItem | null>(null);
    const [activeVariant, setActiveVariant] = useState(0);
    const [activeImageIndex, setActiveImageIndex] = useState(0); 

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow = 'hidden';
            setActiveVariant(0);
            setActiveImageIndex(0);
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedItem]);

    // Reset image index when user switches flavor variant
    useEffect(() => {
        setActiveImageIndex(0);
    }, [activeVariant]);

    // Helper to get current display data
    const currentDisplayItem = selectedItem?.variants ? selectedItem.variants[activeVariant] : selectedItem;
    
    // Helper to get image data
    const variantImages = selectedItem?.variants ? selectedItem.variants[activeVariant].images : [];
    
    // Handle Arrow Clicks
    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (variantImages.length > 0) {
            setActiveImageIndex((prev) => (prev + 1) % variantImages.length);
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (variantImages.length > 0) {
            setActiveImageIndex((prev) => (prev - 1 + variantImages.length) % variantImages.length);
        }
    };

    const currentImageSrc = variantImages.length > 0 
        ? variantImages[activeImageIndex] 
        : selectedItem?.img;

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
            <section className="relative h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center pb-12 md:pb-24">
                
                {/* --- TOP BANNER --- */}
                <div className="absolute top-0 left-0 w-full z-50 bg-[#F4EBE8] text-[#5D4037] py-3 md:py-4 text-center px-4 shadow-sm border-b border-[#E8D8D5] flex flex-col items-center justify-center gap-1">
                     <p className="font-serif italic text-xs md:text-base leading-none text-[#8C6A64]">
                        Complimentary Concierge Delivery
                    </p>
                    <p className="font-sans text-[8px] md:text-[10px] tracking-[0.2em] uppercase font-semibold text-[#5D4037]/80">
                        Exclusive to Hoover & Birmingham
                    </p>
                </div>

                {/* Mobile-Friendly Back Button */}
                <div className="absolute top-24 md:top-28 left-4 md:left-6 z-40">
                    <a href="/services" className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                        <ArrowLeft size={18} />
                    </a>
                </div>

                <div className="absolute inset-0 z-0">
                    <img 
                        src={HERO_IMAGE} 
                        alt="Hero" 
                        className="w-full h-full object-cover object-[center_25%] brightness-[0.85] contrast-[1.0] saturate-[1.0] blur-[0.5px]" 
                    />
                    <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-b from-black/50 via-black/25 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#FFFDFD] via-[#FFFDFD]/80 to-transparent" />
                </div>
                
                <div className="relative z-10 text-center px-4 w-full max-w-5xl mt-20 md:mt-32"> 
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        <div className="flex items-center justify-center gap-4 mb-4 md:mb-8 opacity-90">
                            <div className="h-[1px] bg-[#FFF5F5]/70 w-8 md:w-20" />
                            <div className="text-[#FFF5F5]/90 flex items-center gap-2 text-[9px] md:text-xs tracking-[0.3em] uppercase font-sans font-bold">
                                Est. 2024 • Hoover, AL
                            </div>
                            <div className="h-[1px] bg-[#FFF5F5]/70 w-8 md:w-20" />
                        </div>
                        
                        {/* HERO TITLE: Responsive Text Size */}
                        <h1 className="text-[#FFF5F5] font-serif text-[3.2rem] md:text-[6.5rem] lg:text-[8rem] leading-[0.9] tracking-normal font-normal mb-0 drop-shadow-sm uppercase">
                            SAFURA'S
                        </h1>

                        <p className="font-script text-[#FFD9D5] text-[2.8rem] md:text-[6rem] lg:text-[8rem] leading-[1.2] mb-8 md:mb-12 mt-2 relative z-10 drop-shadow-md">
                            Atelier & Bakery
                        </p>
                        
                        <div className="flex flex-col items-center justify-center gap-3 md:gap-4 w-full max-w-xs mx-auto mt-16 md:mt-32">
                            <a href="#collections" className="bg-[#CC8C82] text-white px-6 py-3 md:px-8 md:py-4 text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-sans font-bold hover:bg-[#B57970] transition-all duration-500 w-full rounded-[2px] shadow-lg text-center">
                                View Collection
                            </a>
                            <a href="#contact" className="bg-[#F5D0CD] text-[#5A3A35] px-6 py-3 md:px-8 md:py-4 text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-sans font-bold hover:bg-[#EBC5C2] transition-all w-full rounded-[2px] shadow-lg text-center">
                                Custom Inquiry
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- INTRO / MEET SAFURA SECTION (UPDATED TEXT) --- */}
            <section id="meet-safura" className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                    
                    {/* LEFT: SAFURA IMAGE */}
                    <div className="lg:col-span-5 order-2 lg:order-1 relative">
                       <Reveal>
                            <div className="aspect-[4/5] w-full relative overflow-hidden rounded-lg shadow-xl border border-[#2B120A]/5 group">
                                 <ParallaxImage 
                                    src={SAFURA_IMAGE} 
                                    alt="Safura - Founder & Artist" 
                                    className="w-full h-full grayscale-[5%] contrast-[1.05]" 
                                 />
                                 <LuxurySheen />
                                 <LuxurySparkle className="w-8 h-8 top-6 right-6 text-[#FFD9D5]/80" delay={0} />
                                 <LuxurySparkle className="w-6 h-6 bottom-8 left-8 text-[#FFD9D5]/60" delay={1.5} />
                            </div>
                       </Reveal>
                    </div>

                    {/* RIGHT: BIO TEXT */}
                    <div className="lg:col-span-7 order-1 lg:order-2">
                        <Reveal delay={0.2}>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="h-[1px] w-8 bg-[#D48F85]"></span>
                                <span className="text-[10px] uppercase tracking-[0.3em] text-[#D48F85] font-bold">The Patissier</span>
                            </div>

                            <h2 className="font-serif text-4xl md:text-6xl text-[#2B120A] leading-[1.1] mb-6 md:mb-8">
                                The Art of <br/> 
                                Edible Couture.
                            </h2>
                            
                            <p className="font-sans text-[#8C6A64] text-sm md:text-base leading-relaxed md:leading-loose max-w-xl font-light mb-6">
                                "Welcome to my <strong>Atelier</strong>. To me, a cake is more than a dessert; it is a moment of architecture and emotion. We don't just mix ingredients; we curate experiences."
                            </p>

                            <p className="font-sans text-[#8C6A64] text-sm md:text-base leading-relaxed md:leading-loose max-w-xl font-light mb-6">
                                My promise is simple: absolute beauty, uncompromised taste, and <strong>strictly Halal ingredients</strong>. This is a labor of love for my community. I use only the finest and halal products, yet I charge only for the ingredients.
                            </p>

                            <p className="font-sans text-[#8C6A64] text-sm md:text-base leading-relaxed md:leading-loose max-w-xl font-light mb-10">
                                My time and labor are a gift, because my goal is simply to provide fresh, healthy, and affordable luxuries to my friends and families.
                            </p>

                            <div className="flex flex-col items-start gap-1">
                                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#2B120A]/60">With Love,</span>
                                <span className="font-script text-5xl md:text-7xl text-[#D48F85]">Safura</span>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* --- PHILOSOPHY SECTION (UPDATED) --- */}
            <section id="our-philosophy" className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* LEFT: TEXT */}
                    <div className="lg:col-span-7 order-1 lg:order-1">
                        <Reveal delay={0.2}>
                            <h2 className="font-serif text-4xl md:text-6xl text-[#2B120A] leading-[1.1] mb-6 md:mb-8">
                                Pure Butter. <br/> 
                                Rich Cocoa. <br/>
                                <span className="font-script text-[#D48F85] text-5xl md:text-7xl relative -top-2">Unforgettable.</span>
                            </h2>
                            <p className="font-sans text-[#8C6A64] text-sm md:text-base leading-relaxed md:leading-loose max-w-xl font-light mb-8">
                                Safura's is a boutique bakery for the romantic at heart. We specialize in the art of chocolate and floral design, sculpting flavor using premium Belgian cocoa and locally sourced botanicals.
                            </p>
                            
                            {/* --- MOBILE OPTIMIZED PURE PROMISE GRID --- */}
                            <div className="grid grid-cols-2 gap-x-4 gap-y-8 mt-10 border-t border-[#D48F85]/20 pt-8">
                                <div className="flex gap-3 md:gap-4 items-start">
                                    <div className="w-8 h-8 md:w-8 md:h-8 rounded-full bg-[#D48F85]/10 flex items-center justify-center text-[#D48F85] flex-shrink-0">
                                        <Ban size={16} />
                                    </div>
                                    <div>
                                        <h4 className="font-serif text-base md:text-lg text-[#2B120A] leading-tight">No Preservatives</h4>
                                        <p className="text-[9px] md:text-[10px] uppercase tracking-wider text-[#8C6A64] mt-1">100% Natural</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 md:gap-4 items-start">
                                    <div className="w-8 h-8 md:w-8 md:h-8 rounded-full bg-[#D48F85]/10 flex items-center justify-center text-[#D48F85] flex-shrink-0">
                                        <Leaf size={16} />
                                    </div>
                                    <div>
                                        <h4 className="font-serif text-base md:text-lg text-[#2B120A] leading-tight">No Chemicals</h4>
                                        <p className="text-[9px] md:text-[10px] uppercase tracking-wider text-[#8C6A64] mt-1">Clean Label</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 md:gap-4 items-start">
                                    <div className="w-8 h-8 md:w-8 md:h-8 rounded-full bg-[#D48F85]/10 flex items-center justify-center text-[#D48F85] flex-shrink-0">
                                        <Sparkles size={16} />
                                    </div>
                                    <div>
                                        <h4 className="font-serif text-base md:text-lg text-[#2B120A] leading-tight">Baked Fresh</h4>
                                        <p className="text-[9px] md:text-[10px] uppercase tracking-wider text-[#8C6A64] mt-1">Made to Order</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 md:gap-4 items-start">
                                    <div className="w-8 h-8 md:w-8 md:h-8 rounded-full bg-[#D48F85]/10 flex items-center justify-center text-[#D48F85] flex-shrink-0">
                                        <Check size={16} />
                                    </div>
                                    <div>
                                        <h4 className="font-serif text-base md:text-lg text-[#2B120A] leading-tight">100% Halal</h4>
                                        <p className="text-[9px] md:text-[10px] uppercase tracking-wider text-[#8C6A64] mt-1">Certified Ingredients</p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* RIGHT: CHEF IMAGE */}
                    <div className="lg:col-span-5 order-2 lg:order-2">
                       <Reveal>
                            <div className="aspect-[4/5] w-full relative overflow-hidden rounded-lg shadow-sm">
                                 <ParallaxImage 
                                    src={CHEF_IMAGE} 
                                    alt="Safura Cake Detail" 
                                    className="w-full h-full grayscale-[10%] contrast-[1.1]" 
                                 />
                            </div>
                       </Reveal>
                    </div>
                </div>
            </section>

            {/* --- COLLECTIONS --- */}
            <section id="collections" className="py-20 md:py-32 bg-[#FFFDFD] px-4 md:px-12 relative">
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#FDF5F5] to-transparent" />
                
                <div className="max-w-[1200px] mx-auto">
                    <SectionHeading subtitle="The Atelier" title="Curated Sweets" />
                    
                    {/* GRID */}
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-x-12 md:gap-y-20">
                        {COLLECTIONS.map((item, i) => (
                            <Reveal key={i} delay={i * 0.05} width="100%">
                                <div 
                                    className="group cursor-pointer flex flex-col items-center text-center touch-manipulation"
                                    onClick={() => setSelectedItem(item)}
                                >
                                    <div className="relative w-full aspect-[4/5] mb-4 md:mb-6 overflow-hidden bg-gradient-to-b from-[#F9F7F5] to-[#F0EFED] rounded-[4px]">
                                        <img 
                                            src={item.img} 
                                            alt={item.title}
                                            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-[#D48F85]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                    
                                    <h3 className="font-sans text-sm md:text-lg text-[#2B120A] font-medium uppercase tracking-widest mb-1 md:mb-2 group-hover:text-[#D48F85] transition-colors">
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

            {/* --- PRODUCT MODAL (UPDATED FOR MOBILE VISIBILITY) --- */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedItem(null)}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-8"
                    >
                        <motion.div 
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#FFFDFD] w-full md:max-w-4xl h-[90vh] md:h-auto max-h-[90vh] overflow-hidden md:overflow-y-auto rounded-t-2xl md:rounded-lg shadow-2xl relative flex flex-col md:flex-row"
                        >
                            <button 
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-4 right-4 z-30 p-2 bg-white/50 hover:bg-white rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-[#2B120A]" />
                            </button>

                            {/* --- MODAL IMAGE GALLERY (LEFT SIDE) --- */}
                            <div className="w-full md:w-1/2 h-56 md:h-auto relative bg-[#F9F7F5] flex-shrink-0 flex flex-col group">
                                <div className="flex-grow relative overflow-hidden">
                                     <AnimatePresence mode="wait">
                                        <motion.img 
                                            key={`${currentDisplayItem?.title}-${activeImageIndex}`}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.4 }}
                                            src={currentImageSrc} 
                                            alt={currentDisplayItem?.title} 
                                            className="absolute inset-0 w-full h-full object-contain p-2"
                                        />
                                     </AnimatePresence>
                                     
                                     {/* ARROW BUTTONS */}
                                     {variantImages && variantImages.length > 1 && (
                                         <>
                                            <button 
                                                onClick={prevImage}
                                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md z-20 transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <ChevronLeft className="w-5 h-5 text-[#2B120A]" />
                                            </button>
                                            <button 
                                                onClick={nextImage}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md z-20 transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <ChevronRight className="w-5 h-5 text-[#2B120A]" />
                                            </button>
                                            
                                            {/* Mobile Always Visible Hint */}
                                            <div className="md:hidden absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded-full pointer-events-none">
                                                {activeImageIndex + 1} / {variantImages.length}
                                            </div>
                                         </>
                                     )}
                                </div>
                            </div>

                            {/* Modal Content - FIX: Reduced padding on mobile (p-6) */}
                            <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-start md:justify-center overflow-y-auto">
                                <div className="mb-4 md:mb-8">
                                    <motion.h3 
                                        key={currentDisplayItem?.title}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="font-serif text-2xl md:text-4xl text-[#2B120A] mb-2"
                                    >
                                        {currentDisplayItem?.title}
                                    </motion.h3>
                                    <p className="font-sans text-[#D48F85] text-xs md:text-sm uppercase tracking-widest font-bold">{selectedItem.price}</p>
                                </div>

                                <div className="space-y-4 md:space-y-6">
                                    <div>
                                        <h4 className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#8C6A64] mb-3 md:mb-4 border-b border-[#2B120A]/10 pb-2">Key Notes & Ingredients</h4>
                                        <motion.ul 
                                            key={currentDisplayItem?.ingredients}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="space-y-2 md:space-y-3"
                                        >
                                            {currentDisplayItem?.ingredients.split(',').map((ingredient: string, idx: number) => (
                                                <li key={idx} className="flex items-start gap-3 text-[#2B120A] font-serif text-base md:text-lg leading-relaxed">
                                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#D48F85] flex-shrink-0" />
                                                    <span className="capitalize">{ingredient.trim()}</span>
                                                </li>
                                            ))}
                                        </motion.ul>
                                    </div>

                                    {/* --- LUXURY FLAVOR PALETTE --- */}
                                    {selectedItem.variants && (
                                        <div className="mt-4 pt-4 border-t border-[#2B120A]/10">
                                             <div className="flex items-center gap-2 mb-3">
                                                <Sparkles className="w-3 h-3 text-[#D48F85]" />
                                                <p className="font-sans text-[9px] uppercase tracking-widest text-[#8C6A64]">Select Flavor to Preview</p>
                                             </div>
                                             
                                             <div className="grid grid-cols-4 gap-2 md:gap-3">
                                                {selectedItem.variants.map((v, i) => (
                                                    <button 
                                                        key={i} 
                                                        onClick={() => setActiveVariant(i)}
                                                        className={cn(
                                                            "group flex flex-col items-center gap-2 transition-all duration-300",
                                                            activeVariant === i ? "opacity-100 scale-105" : "opacity-60 hover:opacity-100"
                                                        )}
                                                        title={v.title}
                                                    >
                                                        <div className={cn(
                                                            "relative w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden border-2 transition-all shadow-sm",
                                                            activeVariant === i ? "border-[#D48F85] ring-1 ring-[#D48F85]/30" : "border-transparent group-hover:border-[#D48F85]/30"
                                                        )}>
                                                            <img src={v.images[0]} alt={v.title} className="w-full h-full object-cover" />
                                                        </div>
                                                        <span className={cn(
                                                            "text-[7px] md:text-[8px] font-sans uppercase tracking-wider text-center leading-tight max-w-[60px]",
                                                            activeVariant === i ? "text-[#2B120A] font-bold" : "text-[#8C6A64]"
                                                        )}>
                                                            {v.title.split(' ')[0]}
                                                        </span>
                                                    </button>
                                                ))}
                                             </div>
                                        </div>
                                    )}
                                    
                                    <div className="pt-6 pb-8 md:pb-0">
                                        <a 
                                            href={WHATSAPP_LINK}
                                            className="inline-block w-full text-center bg-[#2B120A] text-[#FFFDFD] py-4 px-8 text-xs uppercase tracking-[0.2em] hover:bg-[#4A3228] transition-colors rounded-[2px]"
                                        >
                                            Inquire to Order
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- GALLERY --- */}
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

                        {/* --- DIGITAL ATELIER NOTICE --- */}
                        <div className="mt-12 mb-8 max-w-2xl mx-auto bg-[#FDF5F5] border border-[#D48F85]/20 p-6 rounded-sm">
                            <div className="flex flex-col items-center gap-3">
                                <Sparkles className="w-4 h-4 text-[#D48F85]" />
                                <p className="font-serif text-[#2B120A] text-lg text-center">
                                    Digital Atelier Preview
                                </p>
                                <p className="font-sans text-[#8C6A64] text-xs text-center leading-relaxed max-w-md">
                                    Please note: Our digital home is currently being refined. Pricing and collection details may vary as we perfect the experience. For confirmed availability, kindly inquire directly.
                                </p>
                            </div>
                        </div>

                    </Reveal>
                </div>
            </section>
        </div>
    );
}