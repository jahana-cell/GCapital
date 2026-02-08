
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Database, ArrowRight, UploadCloud, DownloadCloud } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } }
};

const Section = ({ id, title, subtitle, children }: { id: string, title: string, subtitle: string, children: React.ReactNode }) => (
    <motion.section id={id} variants={fadeUp} className="mb-16 md:mb-24 last:mb-0">
        <div className="flex items-start gap-6">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-stone-900 text-white flex items-center justify-center shrink-0">
                    <span className="font-serif text-xl">{id.split('-')[1]}</span>
                </div>
                 <div className="w-px h-8 bg-stone-200 mt-2"></div>
            </div>
            <div>
                <h2 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight mb-2">{title}</h2>
                <p className="text-base text-stone-500 font-light leading-relaxed max-w-2xl">{subtitle}</p>
            </div>
        </div>
        <div className="pl-[72px] mt-8 luxury-prose">
            {children}
        </div>
    </motion.section>
);

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-stone-800 text-stone-300 p-4 rounded-md text-xs md:text-sm overflow-x-auto my-6 font-mono">
        <code>{children}</code>
    </pre>
);

export default function AiRebuildGuidePage() {
    return (
        <div className="bg-[#FDFCFB] text-[#141F14] min-h-screen font-sans selection:bg-[#D4AF37]/30 selection:text-[#141F14]">
             <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Manrope:wght@200;300;400;500;600&display=swap');
                .font-serif { font-family: 'Cinzel', serif; }
                .font-sans { font-family: 'Manrope', sans-serif; }
                body > header, body > footer, body > nav { display: none !important; }
                
                .luxury-prose h3 { font-family: 'Manrope', sans-serif; font-weight: 700; font-size: 1.1rem; margin-top: 2rem; margin-bottom: 1rem; color: #141F14; letter-spacing: 0.05em; text-transform: uppercase; }
                .luxury-prose p { margin-bottom: 1.5rem; line-height: 1.8; color: #525252; font-weight: 300; }
                .luxury-prose ul { list-style: none; padding-left: 0; margin-bottom: 2rem; }
                .luxury-prose li { position: relative; padding-left: 1.5rem; margin-bottom: 1rem; line-height: 1.6; color: #525252; font-weight: 300; }
                .luxury-prose li::before { content: ''; position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; background-color: #D4AF37; border-radius: 50%; }
                .luxury-prose strong { color: #141F14; font-weight: 600; }
                .luxury-prose a { color: #141F14; text-decoration: none; border-bottom: 1px solid #D4AF37; transition: all 0.3s; }
                .luxury-prose a:hover { color: #D4AF37; border-bottom-color: transparent; }
            `}} />

            {/* --- HERO SECTION --- */}
            <header className="relative w-full pt-40 pb-20 md:pt-48 md:pb-24 px-6 md:px-12 border-b border-[#141F14]/5 bg-white">
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                     <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-[#D4AF37]/30 bg-[#F9F9F7] mb-10 shadow-lg shadow-[#141F14]/5"
                    >
                        <Bot className="w-8 h-8 text-[#D4AF37]" />
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-4xl md:text-6xl font-serif leading-tight mb-8 text-[#141F14]"
                    >
                        AI Development Guide
                    </motion.h1>

                    <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-base md:text-lg text-stone-500 font-light max-w-3xl mx-auto leading-relaxed"
                    >
                        This document outlines the strategic, high-level prompts used to guide an AI assistant in the incremental construction of the GrowShare Capital web application. By following these steps in sequence, a developer can leverage AI to rapidly prototype and build the entire platform, from initial project setup and Firebase integration to implementing core features like the newsroom, e-commerce functionality, and user authentication, culminating in a production-ready application.
                    </motion.p>
                </div>
            </header>

            {/* --- CONTENT --- */}
            <main className="w-full py-20 md:py-32 px-6 md:px-12 relative z-10">
                <div className="container mx-auto max-w-4xl">
                    <Section id="step-1" title="Initial Setup" subtitle="Start by providing the AI with the core requirements and project files.">
                        <p>Begin with a foundational prompt that establishes the project's name, core features, and design language. Upload all essential project configuration files (like `package.json`, `tailwind.config.ts`, `apphosting.yaml`, etc.) to give the AI the necessary context of the existing environment.</p>
                        <h3>Example Prompt:</h3>
                        <CodeBlock>
                            {`You are a skilled AI coding partner. I am building an application named "Artisanal Abode". Please review the following project requirements and existing files. Your first task is to set up the global styles in 'src/app/globals.css' based on the specified color palette and implement a basic header and footer component.`}
                        </CodeBlock>
                    </Section>

                    <Section id="step-2" title="AI-Driven Development" subtitle="Use iterative prompts to build out the application feature by feature.">
                        <p>Systematically request the creation of each page and component. For each feature, describe the desired functionality and layout. The AI will generate the necessary code, including JSX for components and server-side logic for actions.</p>
                        <h3>Example Prompts:</h3>
                        <ul>
                            <li><strong>Building a Page:</strong> "Create a new page at `/about` for the company's story. It should include a hero section, a mission statement, and a timeline of company milestones."</li>
                            <li><strong>Implementing a Feature:</strong> "Add a newsletter signup form to the footer. It should capture an email address and use a Next.js Server Action to save it to a 'subscribers' collection in Firestore."</li>
                            <li><strong>Refining UI:</strong> "Update the header. Make it sticky on scroll and add a subtle backdrop blur effect for a more modern feel."</li>
                        </ul>
                    </Section>

                    <Section id="step-3" title="Migrating Firestore Data (Optional)" subtitle="Follow these steps to transfer your existing database content to the new project.">
                        <p>If you are creating a duplicate of this application in a new Firebase project, you will need to migrate your Firestore data (like news articles) from the old project to the new one. The following commands use the `gcloud` command-line tool.</p>

                        <h3>Prerequisites</h3>
                        <ul>
                            <li><strong>Billing:</strong> Must be enabled on both the source (old) and destination (new) Firebase projects.</li>
                            <li><strong>Permissions:</strong> You must have Owner or Editor permissions on both projects.</li>
                        </ul>
                        
                        <h3>Step 1: Export from Source Project</h3>
                        <p>Open the Cloud Shell terminal in your **OLD** project and run the following commands to export your data to a Cloud Storage bucket.</p>
                        <CodeBlock>
                            {`# 1. Create a storage bucket (if one doesn't exist)
gsutil mb -p [YOUR_OLD_PROJECT_ID] gs://transfer-bucket-[YOUR_OLD_PROJECT_ID]

# 2. Export the Firestore data to the bucket
gcloud firestore export gs://transfer-bucket-[YOUR_OLD_PROJECT_ID] --project=[YOUR_OLD_PROJECT_ID]`}
                        </CodeBlock>
                        <p><strong>Note:</strong> Replace `[YOUR_OLD_PROJECT_ID]` with the Project ID of the project you are copying FROM.</p>

                        <h3>Step 2: Grant Permissions to Destination Project</h3>
                        <p>Your new project needs permission to read data from the old project's storage bucket.</p>
                        <ul>
                            <li>Navigate to the Google Cloud Console and select your **old project**.</li>
                            <li>Go to <strong>Cloud Storage {'>'} Buckets</strong> and find the `transfer-bucket-...` you just created.</li>
                            <li>Click on the **Permissions** tab and then click **Grant Access**.</li>
                            <li>In the "New principals" box, you will need to add the service account email of your **new** project. It will follow this format: `[NEW_PROJECT_ID]@appspot.gserviceaccount.com`.</li>
                            <li>Assign the role: **Storage Object Viewer**.</li>
                            <li>Click **Save**.</li>
                        </ul>

                        <h3>Step 3: Import into Destination Project</h3>
                        <p>Now, run the import command. You will need the full path to the export folder inside the bucket, which typically looks like a timestamp (e.g., `2024-02-08T...`).</p>
                        <CodeBlock>
                            {`gcloud firestore import gs://transfer-bucket-[YOUR_OLD_PROJECT_ID]/[YOUR_EXPORT_FOLDER_NAME] --project=[YOUR_NEW_PROJECT_ID]`}
                        </CodeBlock>
                         <p><strong>Note:</strong> Remember to replace `[YOUR_OLD_PROJECT_ID]`, `[YOUR_EXPORT_FOLDER_NAME]`, and `[YOUR_NEW_PROJECT_ID]` with your specific values.</p>

                    </Section>
                </div>
            </main>
        </div>
    );
}


    