'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FadeIn } from "@/components/fade-in";
import { 
  TrendingUp, Target, Factory, ShieldCheck, PieChart, Scale, 
  Briefcase, CheckCircle2, Landmark, ScrollText, Handshake, Gem, ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AgricultureNav } from "@/components/agriculture-nav";
import React from "react";

// --- UTILS & CUSTOM COMPONENTS ---

// A bespoke card component with luxury styling (subtle gold borders, richer background)
const LuxuryCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white border-t-2 border-amber-400/60 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden ${className}`}>
    {children}
  </div>
);

const LuxuryCardHeader = ({ title, icon: Icon, subtitle }: { title: string; icon?: any; subtitle?: string }) => (
  <div className="px-8 pt-8 pb-4 border-b border-stone-100">
    <h3 className="text-2xl font-serif text-stone-900 flex items-center gap-3">
      {Icon && <Icon className="w-6 h-6 text-amber-500" strokeWidth={1.5} />}
      {title}
    </h3>
    {subtitle && <p className="text-stone-500 text-sm mt-1 ml-9">{subtitle}</p>}
  </div>
);

const HeroMetric = ({ label, value, subtext }: { label: string, value: string, subtext?: string }) => (
    <div className="p-6 bg-stone-50 border-l-2 border-amber-400/60 rounded-r-lg">
        <p className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-3">{label}</p>
        <p className="text-4xl font-serif text-stone-900 mb-1">{value}</p>
        {subtext && <p className="text-xs text-stone-600 font-medium flex items-center gap-1">
          <ArrowUpRight className="w-3 h-3 text-emerald-600" /> {subtext}
        </p>}
    </div>
);

// --- PROSPECTUS DATA ---

const customerSegments = [
    { segment: "Halal Grocers & Markets", strategy: "Contract pricing for 'Boxed Beef/Goat' to replace frozen imports.", volume: "High", margin: "Low-Medium" },
    { segment: "Restaurants & Caterers", strategy: "Value-added services (pre-cubed, patties) to save kitchen labor.", volume: "Medium", margin: "High" },
    { segment: "Masjids & Community", strategy: "Direct-to-community bulk drops; 'Share a Cow' programs.", volume: "Seasonal", margin: "Medium" },
    { segment: "Ethical/Local Buyers", strategy: "Market 'Farm-to-Table' & humane handling to high-end butchers.", volume: "Low-Medium", margin: "Very High" },
    { segment: "Local Farmers (Service)", strategy: "Toll Processing fees to process farmers' own livestock.", volume: "Variable", margin: "High (No COGS)" },
];

const procurementData = [
    { 
        type: "Community Beef (Economy)", 
        target: "Boner Cows (80-85% Lean)", 
        marketPrice: "$1.56", 
        finalCost: "~$6.00/lb" 
    },
    { 
        type: "High-Volume Processing", 
        target: "Slaughter Bulls (YG 1-2)", 
        marketPrice: "$1.89", 
        finalCost: "High Yield" 
    },
    { 
        type: "Premium Steak Option", 
        target: "Heavy Feeder Steers", 
        marketPrice: "$3.10", 
        finalCost: "~$9.75/lb" 
    },
];

const fixedCosts = [
    { item: "Core Staff Salaries", cost: "$25,000" },
    { item: "Facility Overhead", cost: "$8,500" },
    { item: "Insurance & Compliance", cost: "$3,000" },
    { item: "Lease / Debt Service", cost: "$5,000" },
];

const breakEvenScenarios = [
    { title: "Beef Service Only", daily: "~5 Head", icon: Factory },
    { title: "Goat Service Only", daily: "~26 Head", icon: Target },
    { title: "Wholesale Beef Sales", daily: "~3.5 Head", icon: TrendingUp },
];

// --- HEADER COMPONENT ---

const ProspectusHeader = () => (
    <div className="relative bg-stone-900 text-white py-24 overflow-hidden">
        {/* Luxurious subtle background texture and gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-950/40 via-stone-900 to-stone-900"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png')] mix-blend-overlay"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-amber-500/30 bg-amber-500/10 rounded-full text-amber-300 text-xs font-bold uppercase tracking-widest mb-8">
                <Gem className="w-4 h-4" /> Confidential Investment Memo • Feb 2026
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight mb-6 tracking-tight">
                Cullman Meat Processors
            </h1>
            <p className="text-xl md:text-2xl text-stone-300 max-w-3xl mx-auto font-light leading-relaxed">
                A vertically integrated Halal meat processing facility bridging the critical gap between Alabama's producers and the <span className="text-amber-200 font-medium">$20B+ domestic market.</span>
            </p>
        </div>
    </div>
);

// --- MAIN PAGE ---

export default function CullmanMeatProcessorsPlan() {
  return (
    <div className="bg-stone-100 min-h-screen text-stone-800 font-sans selection:bg-amber-100 selection:text-amber-900">
        
        <ProspectusHeader />

        <main className="container mx-auto px-4 py-16 -mt-20 relative z-20 space-y-20">
            
            {/* Navigation Anchor */}
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-2 shadow-lg border-t border-white/50 max-w-fit mx-auto mb-12">
                <AgricultureNav />
            </div>

            {/* 1. EXECUTIVE SUMMARY & KEY METRICS */}
            <FadeIn>
                <section className="grid lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8">
                        <LuxuryCard>
                            <LuxuryCardHeader title="Executive Summary" icon={Landmark} />
                            <div className="px-8 py-6 prose prose-stone prose-lg max-w-none">
                                <p className="leading-relaxed text-stone-700">
                                    Cullman Meat Processors is strategically positioned to become the premier Halal processing hub in the Southern US. By leveraging Cullman, Alabama's status as a livestock center, we will utilize USDA-inspected infrastructure to service the high-volume, unmet demand within the Muslim community and the rapidly growing ethical meat sector.
                                </p>
                                <div className="grid md:grid-cols-2 gap-6 mt-8 not-prose">
                                    <div className="p-6 rounded-xl bg-stone-50 border-l-2 border-emerald-600">
                                        <h4 className="font-bold text-stone-900 flex items-center gap-2 mb-3 text-lg">
                                            <Target className="w-5 h-5 text-emerald-700" /> The Mission
                                        </h4>
                                        <p className="text-stone-600 leading-relaxed">To provide a transparent, ethically sourced, and Shariah-compliant meat supply chain that empowers local farmers and feeds communities with dignity.</p>
                                    </div>
                                    <div className="p-6 rounded-xl bg-stone-50 border-l-2 border-emerald-600">
                                        <h4 className="font-bold text-stone-900 flex items-center gap-2 mb-3 text-lg">
                                            <TrendingUp className="w-5 h-5 text-emerald-700" /> The Advantage
                                        </h4>
                                        <p className="text-stone-600 leading-relaxed">Located at the source of supply with direct Interstate logistics to major metro hubs: Birmingham, Atlanta, and Nashville.</p>
                                    </div>
                                </div>
                            </div>
                        </LuxuryCard>
                    </div>
                    <div className="lg:col-span-4 space-y-4">
                        <HeroMetric label="Market Opportunity" value="$20B+" subtext="Domestic Halal Market Growth" />
                        <HeroMetric label="Daily Capacity Target" value="80 Head" subtext="Small Ruminant (Goat/Lamb)" />
                        <HeroMetric label="Beef Break-Even" value="5 Head" subtext="Daily Service Volume" />
                    </div>
                </section>
            </FadeIn>

            {/* 2. MARKET STRATEGY */}
            <FadeIn>
                <section>
                    <div className="mb-10 text-center">
                        <h2 className="text-4xl font-serif text-stone-900 mb-2">Market Strategy</h2>
                        <p className="text-stone-500 uppercase tracking-widest font-bold text-sm">Phase 1: Regional Dominance</p>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-8">
                        <LuxuryCard>
                            <LuxuryCardHeader title="The Gap & Opportunity" icon={PieChart} />
                            <div className="px-8 py-6">
                                <ul className="space-y-8">
                                    <li className="flex gap-5">
                                        <div className="mt-1.5 flex-shrink-0"><div className="w-3 h-3 rounded-full bg-red-400 ring-4 ring-red-50"></div></div>
                                        <div>
                                            <h4 className="font-bold text-lg text-stone-900 mb-2">The Problem</h4>
                                            <p className="text-stone-600 leading-relaxed">High demand for fresh Zabiha meat is currently met by frozen imports due to a lack of regional USDA infrastructure capable of high-volume, religious-compliant processing.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-5">
                                        <div className="mt-1.5 flex-shrink-0"><div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></div></div>
                                        <div>
                                            <h4 className="font-bold text-lg text-stone-900 mb-2">The Solution</h4>
                                            <p className="text-stone-600 leading-relaxed">A local, USDA-inspected facility combining high-volume slaughter with value-added processing (marination, portioning) tailored for restaurants and grocers.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </LuxuryCard>

                        <div className="space-y-4">
                            {customerSegments.map((item, i) => (
                                <div key={i} className="group p-6 bg-white border-l-2 border-stone-200 hover:border-amber-400 rounded-r-xl shadow-sm transition-all duration-300 hover:shadow-md hover:translate-x-1">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-bold text-xl text-stone-900 group-hover:text-amber-600 transition-colors">{item.segment}</h4>
                                        <span className="text-xs font-bold uppercase tracking-wider bg-stone-100 text-stone-500 px-3 py-1 rounded-full">{item.margin} Margin</span>
                                    </div>
                                    <p className="text-stone-600 mb-3">{item.strategy}</p>
                                    <p className="text-sm font-mono text-stone-400 flex items-center gap-2">
                                        <Scale className="w-4 h-4"/> Volume: {item.volume}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </FadeIn>

            {/* 3. OPERATIONAL PLAN */}
            <FadeIn>
                <LuxuryCard className="bg-stone-900 text-white border-t-amber-500">
                    <div className="px-8 py-10">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 bg-amber-500/20 rounded-lg">
                                <Factory className="w-8 h-8 text-amber-400" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-serif text-white">Operational Plan: Phase 1</h2>
                                <p className="text-stone-400">Years 1–2 Focus: Stability & Compliance</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-12">
                            <div className="md:col-span-2 space-y-8">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-6 bg-white/5 border border-white/10 rounded-xl text-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-50"></div>
                                        <p className="text-sm text-stone-400 mb-2 relative z-10">Goat/Lamb Capacity</p>
                                        <p className="text-4xl font-serif text-white relative z-10">40-80 <span className="text-lg font-sans text-stone-400">Head/Day</span></p>
                                    </div>
                                    <div className="p-6 bg-white/5 border border-white/10 rounded-xl text-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-50"></div>
                                        <p className="text-sm text-stone-400 mb-2 relative z-10">Beef Capacity</p>
                                        <p className="text-4xl font-serif text-white relative z-10">10-25 <span className="text-lg font-sans text-stone-400">Head/Day</span></p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-lg mb-4">Compliance Framework</h4>
                                    <ul className="grid grid-cols-1 gap-3">
                                        <li className="flex items-center gap-3 text-stone-300 bg-white/5 p-3 rounded-lg"><CheckCircle2 className="w-5 h-5 text-emerald-400"/> <strong>Zabiha:</strong> Strict hand-slaughter protocols.</li>
                                        <li className="flex items-center gap-3 text-stone-300 bg-white/5 p-3 rounded-lg"><CheckCircle2 className="w-5 h-5 text-emerald-400"/> <strong>USDA:</strong> HACCP plans & daily inspection workflows.</li>
                                        <li className="flex items-center gap-3 text-stone-300 bg-white/5 p-3 rounded-lg"><CheckCircle2 className="w-5 h-5 text-emerald-400"/> <strong>Retail:</strong> Permits for on-site DTC sales.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="border-l border-white/10 pl-12">
                                <h4 className="font-bold text-white text-lg mb-6">Lean Staffing Model</h4>
                                <div className="space-y-6 relative">
                                    {/* Timeline connecting line */}
                                    <div className="absolute left-0 top-2 bottom-2 w-px bg-white/20"></div>
                                    
                                    <div className="relative pl-6">
                                        <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 bg-amber-500 rounded-full shadow-[0_0_10px_theme(colors.amber.500)]"></div>
                                        <p className="text-xs font-bold uppercase text-amber-400 mb-1">Management</p>
                                        <p className="text-stone-300">Plant Manager, QA/HACCP Coordinator</p>
                                    </div>
                                    <div className="relative pl-6">
                                         <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 bg-stone-600 rounded-full"></div>
                                        <p className="text-xs font-bold uppercase text-stone-500 mb-1">Production</p>
                                        <p className="text-stone-300">Slaughter Lead + 4-8 Staff</p>
                                        <p className="text-stone-300">2-6 Skilled Butchers</p>
                                    </div>
                                    <div className="relative pl-6">
                                         <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 bg-stone-600 rounded-full"></div>
                                        <p className="text-xs font-bold uppercase text-stone-500 mb-1">Logistics</p>
                                        <p className="text-stone-300">Route Coordinator, Driver</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </LuxuryCard>
            </FadeIn>

            {/* 4. FINANCIALS (INVESTOR CORE) */}
            <FadeIn>
                <section className="space-y-10">
                    <div className="flex items-end justify-between border-b-2 border-stone-200 pb-6">
                        <h2 className="text-4xl font-serif text-stone-900 flex items-center gap-4">
                            <Scale className="w-10 h-10 text-amber-500" /> Financial Analysis
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10">
                        {/* Procurement Table */}
                        <LuxuryCard>
                            <LuxuryCardHeader title="Procurement Strategy" icon={Briefcase} subtitle="Based on Jan 20, 2026 USDA Cullman Stockyard Data."/>
                            <div className="px-8 py-6">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-stone-200 hover:bg-transparent">
                                            <TableHead className="text-stone-900 font-bold text-base">Category</TableHead>
                                            <TableHead className="text-right text-stone-900 font-bold text-base">Mkt Price</TableHead>
                                            <TableHead className="text-right text-amber-600 font-bold text-base">Est. Cost</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {procurementData.map((item, i) => (
                                            <TableRow key={i} className="border-stone-100 hover:bg-stone-50/50">
                                                <TableCell>
                                                    <div className="font-bold text-stone-800 text-lg">{item.type}</div>
                                                    <div className="text-sm text-stone-500">{item.target}</div>
                                                </TableCell>
                                                <TableCell className="text-right font-mono text-stone-600 text-lg">{item.marketPrice}</TableCell>
                                                <TableCell className="text-right font-mono font-bold text-amber-600 text-lg">{item.finalCost}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </LuxuryCard>

                        {/* Fixed Costs & Break Even */}
                        <div className="space-y-10">
                            {/* Monthly Nut Dashboard styled card */}
                            <div className="bg-stone-900 rounded-xl shadow-xl overflow-hidden relative">
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 text-stone-800/20">
                                    <Gem className="w-32 h-32" />
                                </div>
                                <div className="px-8 py-6 border-b border-white/10">
                                    <h3 className="text-xl font-serif text-white flex items-center gap-2">
                                        <Gem className="w-5 h-5 text-amber-400" /> Monthly "Nut" (Fixed Costs)
                                    </h3>
                                </div>
                                <div className="px-8 py-6">
                                    <div className="space-y-4">
                                        {fixedCosts.map((item, i) => (
                                            <div key={i} className="flex justify-between items-center border-b border-white/10 pb-3 last:border-0 last:pb-0">
                                                <span className="text-stone-300 font-medium">{item.item}</span>
                                                <span className="font-mono text-white text-lg">{item.cost}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-8 pt-6 border-t-2 border-amber-500/30 flex justify-between items-center">
                                        <span className="font-bold uppercase tracking-widest text-amber-400">Total Burn Rate</span>
                                        <span className="font-mono text-3xl font-bold text-white">~$41,500</span>
                                    </div>
                                </div>
                            </div>

                            {/* Break Even Indicators */}
                            <div className="grid grid-cols-3 gap-6">
                                {breakEvenScenarios.map((item, i) => (
                                    <div key={i} className="bg-white p-6 rounded-xl border-t-4 border-emerald-500 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center hover:-translate-y-1 transition-transform">
                                        <item.icon className="w-8 h-8 text-emerald-700 mx-auto mb-3 opacity-80" strokeWidth={1.5} />
                                        <p className="text-[11px] uppercase font-bold text-stone-400 mb-2 leading-tight">{item.title}</p>
                                        <p className="text-2xl font-serif text-stone-900 font-bold">{item.daily}</p>
                                        <p className="text-xs text-stone-500 font-medium mt-1">Daily Volume</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </FadeIn>

            {/* 5. NEXT STEPS CTA */}
            <FadeIn>
                <div className="bg-gradient-to-br from-stone-900 to-emerald-950 rounded-2xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10">
                        <div className="inline-flex p-4 bg-white/10 rounded-full mb-8 backdrop-blur-sm ring-1 ring-white/20">
                            <ScrollText className="w-10 h-10 text-amber-300" strokeWidth={1.5} />
                        </div>
                        <h2 className="text-4xl font-serif mb-6">Immediate Next Steps</h2>
                        
                        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12 text-left">
                            {/* Step 1 */}
                            <div className="bg-white/5 p-8 rounded-xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors group">
                                <h4 className="font-bold text-xl text-white mb-3 flex items-center gap-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 group-hover:bg-amber-500 group-hover:text-white transition-colors">1</span>
                                    Licensing
                                </h4>
                                <p className="text-stone-300 leading-relaxed">Confirm regulatory requirements for Retail Sales exemption versus securing a separate license.</p>
                            </div>
                             {/* Step 2 */}
                            <div className="bg-white/5 p-8 rounded-xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors group">
                                <h4 className="font-bold text-xl text-white mb-3 flex items-center gap-3">
                                     <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 group-hover:bg-amber-500 group-hover:text-white transition-colors">2</span>
                                    Audit
                                </h4>
                                <p className="text-stone-300 leading-relaxed">Verify current facility rail capacity to handle target throughput for both Goat and Beef.</p>
                            </div>
                             {/* Step 3 */}
                            <div className="bg-white/5 p-8 rounded-xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors group">
                                <h4 className="font-bold text-xl text-white mb-3 flex items-center gap-3">
                                     <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 group-hover:bg-amber-500 group-hover:text-white transition-colors">3</span>
                                    Pilot
                                </h4>
                                <p className="text-stone-300 leading-relaxed">Secure Letters of Intent (LOIs) from 3 major Halal grocers in the Birmingham area.</p>
                            </div>
                        </div>

                        <div className="mt-16">
                            <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold px-8 py-6 text-lg shadow-lg shadow-amber-500/20 border-0">
                                <Link href="/agriculture">Return to Portfolio Overview</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </FadeIn>

        </main>
    </div>
  );
}