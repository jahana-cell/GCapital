'use client';

import { ArrowLeft, BrainCircuit, Database } from 'lucide-react';
import Link from 'next/link';

export default function RebuildGuidePage() {
  return (
    <div className="bg-white text-neutral-800 min-h-screen">
      <main className="container mx-auto px-6 py-16 md:py-24 max-w-4xl">
        <div className="mb-12">
          <Link href="/" className="group inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </div>

        <header className="mb-16 text-center">
          <BrainCircuit className="w-12 h-12 mx-auto text-primary mb-4" />
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-neutral-900">AI Development Guide</h1>
          <p className="mt-4 text-lg text-neutral-600">A step-by-step guide to rebuilding this application with an AI assistant.</p>
        </header>

        <div className="prose prose-lg max-w-none">
          
          <div className="bg-neutral-50 border-l-4 border-primary p-6 rounded-r-lg mb-12">
            <h2 className="!mt-0">Executive Summary</h2>
            <p className="!mb-0">
             This document outlines the strategic, high-level prompts used to guide an AI assistant in the incremental construction of the GrowShare Capital web application. By following these steps in sequence, a developer can leverage AI to rapidly prototype and build the entire platform, from initial project setup and Firebase integration to implementing core features like the newsroom, e-commerce functionality, and user authentication, culminating in a production-ready application.
            </p>
          </div>

          <h2>Phase 1: Project Setup & Core Structure</h2>
          <ol>
            <li><strong>Initialize Project:</strong> "Create a new Next.js application using TypeScript, Tailwind CSS, and ShadCN UI components. Set up a basic file structure with a `src` directory."</li>
            <li><strong>Theme & Styling:</strong> "Define a luxury-themed color palette in `globals.css` using HSL variables for background, foreground, primary, and accent colors. Use a 'Creamy Luxury' theme with a warm, off-white background, dark text, and a gold accent."</li>
            <li><strong>Firebase Integration:</strong> "Integrate Firebase into the project. Create a `lib/firebase.ts` file to initialize the client-side SDK and a `lib/firebase-admin.ts` for the server-side Admin SDK. Ensure App Check is configured for security."</li>
            <li><strong>Layout & Navigation:</strong> "Create a global layout with a responsive header and footer. The header should include navigation links for the main sections: Real Estate, Healthcare, Agriculture, and Services. The footer should contain company info and legal links."</li>
            <li><strong>Authentication Context:</strong> "Implement a React Context for authentication (`context/auth-context.tsx`) that manages user state, provides sign-in/sign-up/sign-out functions, and checks for custom user roles like 'isAdmin'."</li>
          </ol>

          <h2>Phase 2: Feature Implementation</h2>
          <ol>
            <li><strong>Newsroom & Firestore:</strong> "Build a newsroom feature. Articles should be stored in a 'stories' collection in Firestore. Create a main news page displaying all articles and dynamic pages for individual articles. Ensure dates are formatted correctly and handle cases where articles are not found."</li>
            <li><strong>E-commerce (Shop):</strong> "Develop an e-commerce section at `/shop`. Create a cart context (`context/cart-context.tsx`) to manage state. The shop should display products, allow adding to a cart, and lead to a checkout page."</li>
            <li><strong>Payment Processing (Stripe):</strong> "Integrate Stripe for payments. Create server actions to generate PaymentIntents for both shop checkouts and project investments. Handle webhook events from Stripe to update order statuses in Firestore."</li>
            <li><strong>Static Pages:</strong> "Create the primary static pages for 'About', 'Leadership', 'Contact', 'Privacy Policy', and 'Terms of Service'. Use a consistent, high-end design language with professional typography and layout."</li>
            <li><strong>Sector Pages:</strong> "Build the main overview pages for each investment sector: `/real-estate`, `/agriculture`, and `/healthcare`. These pages should act as hubs, linking to specific projects within each sector."</li>
          </ol>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-8 rounded-r-lg my-16">
            <div className="flex items-start gap-4">
                <Database className="w-8 h-8 text-blue-600 mt-1 shrink-0" />
                <div>
                    <h2 className="!mt-0 !text-2xl">Phase 3: Data Migration</h2>
                    <p className="!mb-0">
                        After the application structure is built, migrate your existing Firestore data from the old project to the new one using these Google Cloud commands.
                    </p>
                </div>
            </div>
          </div>
          
           <h3>Prerequisites (Crucial)</h3>
            <ul>
                <li><strong>Billing:</strong> Must be enabled on both your source project and the destination project.</li>
                <li><strong>Permissions:</strong> You must have Owner or Editor IAM roles on both Firebase projects.</li>
            </ul>

            <h3>Step 1: Export from Source Project</h3>
            <p>Open the Cloud Shell terminal in your <strong>OLD</strong> project (the one you're copying data <strong>from</strong>) and run these commands:</p>
            <pre><code># 1. Create a storage bucket (if you don't have one)
gsutil mb -p [YOUR_OLD_PROJECT_ID] gs://transfer-bucket-[YOUR_OLD_PROJECT_ID]

# 2. Export the Firestore data to the bucket
gcloud firestore export gs://transfer-bucket-[YOUR_OLD_PROJECT_ID] --project=[YOUR_OLD_PROJECT_ID]
            </code></pre>
            <p>Replace `[YOUR_OLD_PROJECT_ID]` with the ID of the project you are copying from.</p>

            <h3>Step 2: Grant Permissions</h3>
            <p>The new project needs permission to read the data from the bucket you just created.</p>
            <ol>
                <li>Go to the Google Cloud Console &gt; Cloud Storage &gt; Buckets.</li>
                <li>Find and click on the bucket named `transfer-bucket-[YOUR_OLD_PROJECT_ID]`.</li>
                <li>Go to the <strong>Permissions</strong> tab and click <strong>Grant Access</strong>.</li>
                <li>In the "New Principals" box, paste the service account email of your <strong>destination project</strong>. For this app, it is: <br/><code>studio-1704117883-ed97d@appspot.gserviceaccount.com</code></li>
                <li>Assign the role: `Storage Object Viewer`.</li>
                <li>Click <strong>Save</strong>.</li>
            </ol>

            <h3>Step 3: Import into Destination Project</h3>
            <p>Now, you can import the data into your new GrowShare project.</p>
            <p><strong>Important:</strong> First, go to the bucket in the Cloud Console and find the export folder name. It will be a timestamp, like `2024-02-08T10:30:00_12345`.</p>
            <p>Run the following command, replacing the placeholders:</p>
            <pre><code>gcloud firestore import gs://transfer-bucket-[YOUR_OLD_PROJECT_ID]/[YOUR_EXPORT_FOLDER_NAME] --project=studio-1704117883-ed97d
            </code></pre>

            <h3>Troubleshooting</h3>
            <ul>
                <li><strong>"Not Found" error?</strong> Make sure you included the specific timestamp folder name (e.g., `.../2024-02-08T10:30:00_12345`) in the path and not just the bucket name.</li>
                <li><strong>"Permission Denied" error?</strong> Double-check Step 2. The service account for the destination project must have the `Storage Object Viewer` role on the bucket in the old project.</li>
            </ul>

        </div>
      </main>
    </div>
  );
}
