'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useMemo, useTransition } from 'react';
import { Loader2, AlertTriangle, ArrowRight } from 'lucide-react';
import type { Story } from '@/app/news/stories-data';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { formatInTimeZone } from 'date-fns-tz';
import { CategoryFilter } from '@/components/category-filter';
import { LoadMoreButton } from '@/components/load-more-button';

// --- DATE FORMATTER ---
function FormattedDate({ dateValue }: { dateValue: string | Date | Timestamp | null | undefined }) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (!dateValue) {
      setFormattedDate('');
      return;
    }
    try {
      const date = dateValue instanceof Timestamp ? dateValue.toDate() : new Date(dateValue);
      setFormattedDate(formatInTimeZone(date, 'UTC', 'MMMM d, yyyy'));
    } catch (e) {
      setFormattedDate('');
    }
  }, [dateValue]);

  return <>{formattedDate}</>;
}

const PAGE_SIZE = 9;

export default function NewsClientPage({ initialStories }: { initialStories: Story[] }) {
    const [stories, setStories] = useState<Story[]>(initialStories);
    const [activeCategory, setActiveCategory] = useState('All');
    const [displayedCount, setDisplayedCount] = useState(PAGE_SIZE);
    const [loading, setLoading] = useState(initialStories.length === 0);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    // 1. Get Categories
    const categories = useMemo(() => {
        const uniqueCategories = new Set(stories.map(p => p.category));
        return ["All", "Company News", "Real Estate", "Agriculture", "Healthcare", "AI & Technology", "Reports", "In The Media"].filter(cat => cat === "All" || uniqueCategories.has(cat));
    }, [stories]);

    // 2. Fetch Data (Client Fallback)
    useEffect(() => {
        if (initialStories.length > 0) {
            setLoading(false);
            return;
        };

        const fetchStories = async () => {
            setLoading(true);
            setError(null);
            try {
                const storiesCollection = collection(db, "stories");
                const q = query(storiesCollection, orderBy("date", "desc"));
                const querySnapshot = await getDocs(q);
                const storiesData = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    const date = data.date instanceof Timestamp ? data.date.toDate().toISOString() : data.date;
                    return {
                        id: doc.id,
                        slug: doc.id,
                        ...data,
                        date,
                    } as Story;
                });
                setStories(storiesData);
            } catch (err: any) {
                console.error("Fetch error:", err);
                setError("Unable to load the journal.");
            } finally {
                setLoading(false);
            }
        };
        fetchStories();
    }, [initialStories]);

    // 3. Filter Stories
    const filteredStories = useMemo(() => {
        const published = stories.filter(story => story.status !== 'Coming Soon');
        if (activeCategory === 'All') return published;
        return published.filter(story => story.category === activeCategory);
    }, [stories, activeCategory]);

    // 4. Determine Featured Article (Always show one if available)
    const featuredArticle = useMemo(() => {
        if (filteredStories.length === 0) return undefined;
        // Find explicit feature, OR default to the newest one
        return filteredStories.find(s => s.isFeatured) || filteredStories[0];
    }, [filteredStories]);

    // 5. List Logic (Exclude featured)
    const listArticles = useMemo(() => {
        const list = featuredArticle 
            ? filteredStories.filter(a => a.id !== featuredArticle.id)
            : filteredStories;
        return list.slice(0, displayedCount);
    }, [filteredStories, displayedCount, featuredArticle]);

    // 6. Pagination Logic
    const hasMore = useMemo(() => {
        const totalInList = filteredStories.length;
        const effectiveTotal = featuredArticle ? totalInList - 1 : totalInList;
        return displayedCount < effectiveTotal;
    }, [displayedCount, filteredStories.length, featuredArticle]);

    const handleLoadMore = () => {
        startTransition(() => {
            setDisplayedCount(prev => prev + PAGE_SIZE);
        });
    };

    useEffect(() => {
        setDisplayedCount(PAGE_SIZE);
    }, [activeCategory]);
    
    // --- LOADING / ERROR STATES ---
    if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" /></div>;
    
    if (error) return <div className="flex h-screen items-center justify-center text-red-500 p-4"><AlertTriangle className="w-6 h-6 mr-2" />{error}</div>;

    if (stories.length === 0) {
        return (
             <div className="flex h-screen items-center justify-center text-center p-4">
                 <div>
                    <h1 className="text-3xl font-serif text-[#1a1a1a]">Journal Empty</h1>
                    <p className="text-neutral-400 mt-2 font-light">No entries found.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white pb-32">
            
            {/* --- HERO HEADER (Fixes Mobile Spacing) --- */}
            <div className="pt-32 md:pt-40 px-6 md:px-12 max-w-[1600px] mx-auto mb-12 md:mb-20">
                <h1 className="text-5xl md:text-8xl font-serif text-[#1a1a1a] mb-8 leading-[0.9]">
                  The Journal
                </h1>
                <div className="h-[1px] w-full bg-neutral-200"></div>
            </div>

            {/* --- FEATURED SECTION --- */}
            {featuredArticle && (
                 <section className="w-full bg-[#F9F9F7] border-y border-neutral-100 mb-16">
                    <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        
                        {/* Text Content */}
                        <div className="order-2 lg:order-1 space-y-6 md:space-y-8">
                            <div className="flex items-center gap-4">
                                <span className="px-3 py-1 bg-[#1a1a1a] text-white text-[9px] tracking-[0.25em] uppercase font-bold">Featured</span>
                                <span className="text-[10px] tracking-[0.2em] text-neutral-500 uppercase font-medium">
                                    {featuredArticle.category} — <FormattedDate dateValue={featuredArticle.date} />
                                </span>
                            </div>
                            
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light leading-[1.1] text-[#1a1a1a]">
                                {featuredArticle.title}
                            </h2>
                            
                            <p className="text-base md:text-lg text-neutral-500 font-light leading-relaxed max-w-xl">
                                {featuredArticle.description}
                            </p>
                            
                            <Link href={`/news/${featuredArticle.slug}`} className="group inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase font-bold border-b border-[#1a1a1a] pb-2 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300">
                                Read Full Story
                                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                        
                        {/* Image Content */}
                        <div className="order-1 lg:order-2 relative aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden bg-neutral-200 shadow-sm">
                            <Image
                                src={featuredArticle.image}
                                alt={featuredArticle.title}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover transition-transform duration-[1.5s] hover:scale-105"
                                priority
                                style={{ objectPosition: featuredArticle.imagePosition || 'center' }}
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* --- CATEGORY FILTER --- */}
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-12">
                <CategoryFilter
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />
            </div>

            {/* --- STANDARD GRID --- */}
            <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                {listArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
                        {listArticles.map((article) => (
                        <Link 
                            key={article.id} 
                            href={`/news/${article.slug}`} 
                            className="group block h-full flex flex-col"
                        >
                            {/* Image Wrapper */}
                            <div className="relative aspect-[3/2] overflow-hidden bg-neutral-100 mb-6 w-full">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-grow">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-[#1a1a1a]">
                                        {article.category}
                                    </span>
                                    <span className="h-[1px] w-3 bg-neutral-300" />
                                    <span className="text-[9px] tracking-[0.1em] uppercase text-neutral-400">
                                        <FormattedDate dateValue={article.date} />
                                    </span>
                                </div>
                                
                                <h3 className="text-2xl font-serif font-light leading-snug text-[#1a1a1a] mb-3 group-hover:underline underline-offset-4 decoration-[1px] decoration-[#D4AF37] transition-all">
                                    {article.title}
                                </h3>
                                
                                <p className="text-sm text-neutral-500 font-light leading-relaxed line-clamp-3 mb-4 flex-grow">
                                    {article.description}
                                </p>

                                <div className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 group-hover:text-[#D4AF37] transition-colors mt-auto flex items-center gap-2">
                                    Read Article <ArrowRight className="w-3 h-3" />
                                </div>
                            </div>
                        </Link>
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center border-t border-neutral-100">
                        <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-400">
                            No articles found in <span className="text-[#1a1a1a] font-bold">{activeCategory}</span>.
                        </p>
                    </div>
                )}
                
                {hasMore && (
                    <div className="mt-20 flex justify-center">
                        <LoadMoreButton onClick={handleLoadMore} isLoading={isPending} />
                    </div>
                )}
            </div>
        </div>
    );
}