import 'server-only';
import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Priority: Env Var -> Cloud Run Default -> Hardcoded Fallback
const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 
                   process.env.GCLOUD_PROJECT || 
                   'growshare-capital'; 

let app;

if (!getApps().length) {
  // In Cloud Run (Production), we normally don't need credentials if IAM is set,
  // BUT we MUST provide the projectId so it knows where to look.
  app = initializeApp({
    projectId: PROJECT_ID,
    // credential: applicationDefault() // Optional: usually auto-detected if projectId is present
  });
} else {
  app = getApp();
}

const dbAdmin = getFirestore(app);

// Optimize for serverless environments
dbAdmin.settings({ ignoreUndefinedProperties: true });

export { dbAdmin };