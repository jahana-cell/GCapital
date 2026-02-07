
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Check, Copy, Milestone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const PromptCard = ({ title, prompt, step }: { title: string, prompt: string, step: number }) => {
    const { toast } = useToast();

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt);
        toast({
            title: "Prompt Copied!",
            description: "The prompt has been copied to your clipboard.",
        });
    };

    return (
        <div className="flex gap-6 items-start">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg font-mono">
                    {step}
                </div>
                <div className="w-px h-full bg-border mt-2"></div>
            </div>
            <div className="flex-1 pb-10">
                <Card className="hover:border-primary/50 transition-all">
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-muted/50 p-4 rounded-md border relative group">
                            <p className="text-muted-foreground text-sm italic">{prompt}</p>
                            <button onClick={handleCopy} className="absolute top-2 right-2 p-1.5 rounded-md bg-background border hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity">
                                <Copy className="w-3 h-3" />
                                <span className="sr-only">Copy prompt</span>
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default function RebuildGuidePage() {
    const prompts = [
        { title: "Project Initialization", prompt: "Set up a new Next.js project using the App Router. Integrate TypeScript, Tailwind CSS, and install ShadCN UI components. Create a standard project structure with directories for components, lib, and context." },
        { title: "Firebase Integration", prompt: "Integrate Firebase. Create a client-side config file to initialize the Auth, Firestore, and Storage SDKs. Set up a server-side admin config for the Admin SDK. Ensure all Firebase keys are stored in environment variables." },
        { title: "Core Layout & Navigation", prompt: "Build the main site layout with a header and a footer. The header should contain a logo, a responsive navigation menu for mobile, and a mega-menu for desktop that showcases different investment sectors. Add a global search component placeholder." },
        { title: "Homepage Construction", prompt: "Create the homepage. It should feature a large hero section with a title and a prominent logo. Below that, add sections for 'Investment Thesis' with cards for each sector (Real Estate, Agriculture, Healthcare), a 'Philosophy' section, a 'Journal' section to display the 3 most recent articles, and sections for 'Partners' and 'Leadership'." },
        { title: "Dynamic Content: Newsroom", prompt: "Build a newsroom at '/news'. The page should fetch articles from a 'stories' collection in Firestore and display them. Create a dynamic route '[slug]' to display individual articles. Implement a category filter and a 'Load More' button for pagination." },
        { title: "Authentication & User Roles", prompt: "Implement user authentication using Firebase Auth. Create a login page and a registration page. Set up an Auth context to manage user state globally. Add logic to check for custom claims like 'isAdmin' to control access to restricted pages." },
        { title: "E-commerce & Payments", prompt: "Add a shop page at '/shop'. Create a cart context to manage items. The checkout flow should use Stripe for payment processing. Create a server action to generate a payment intent and a webhook to listen for successful payments and update Firestore." },
        { title: "Sector & Service Pages", prompt: "Build out the main pages for each investment sector (e.g., '/real-estate', '/services'). These pages should act as hubs, linking to specific projects or services within that category. Create a few example sub-pages like '/real-estate/foundry55' to demonstrate detailed project showcases." },
        { title: "Admin & Internal Tools", prompt: "Create a protected admin area at '/services/admin'. This dashboard should fetch and display data from internal Firestore collections like 'subscribers'. Add other tools like a 'Certificate Generator' and an 'IT Roadmap' page, ensuring they are only accessible to authorized users." },
        { title: "Final Polish & SEO", prompt: "Create a sitemap, privacy policy, and terms of service pages. Ensure all pages have appropriate metadata for SEO. Add utility components like a 'WhatsApp' floating button and a 'View Counter' to track page views in Firestore." }
    ];

    return (
        <div className="bg-background">
            <header className="py-24 bg-muted/50 border-b">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 mx-auto">
                        <Bot className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold">AI Development Guide</h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        A step-by-step guide on how to instruct an AI assistant to build this application from the ground up.
                    </p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto">
                    <div className="prose prose-lg max-w-none text-center mb-16 text-muted-foreground">
                        <p>This document outlines the strategic, high-level prompts used to guide an AI assistant in the incremental construction of the GrowShare Capital web application. By following these steps in sequence, a developer can leverage AI to rapidly prototype and build the entire platform, from initial project setup and Firebase integration to implementing core features like the newsroom, e-commerce functionality, and user authentication, culminating in a production-ready application.</p>
                    </div>

                    {prompts.map((p, i) => (
                        <PromptCard key={i} step={i + 1} title={p.title} prompt={p.prompt} />
                    ))}
                    <div className="flex gap-6 items-start">
                        <div className="flex flex-col items-center">
                             <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center">
                                <Check className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="flex-1 pt-2">
                             <Card>
                                <CardHeader>
                                    <CardTitle className="font-headline text-xl">And That's It!</CardTitle>
                                    <CardDescription>By following these high-level prompts, an AI assistant can progressively build the entire application, feature by feature.</CardDescription>
                                </CardHeader>
                             </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
