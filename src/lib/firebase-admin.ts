// src/lib/firebase-admin.ts
import "server-only";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

// Define a global interface to prevent TypeScript errors
declare global {
  var firebaseAdminApp: admin.app.App | undefined;
}

let app: admin.app.App;

// 1. Initialize the App (Singleton Pattern)
if (!global.firebaseAdminApp) {
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccountKey) {
    // A. Use provided Service Account (Local Dev)
    try {
      const cleanKey = serviceAccountKey.replace(/\\n/g, '\n');
      const serviceAccount = JSON.parse(cleanKey);
      
      app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: "growshare-capital",
      }, "ADMIN_INSTANCE"); // Give it a unique name
      
      console.log("✅ [Server] Admin SDK initialized with Key.");
    } catch (e) {
      console.error("❌ [Server] Failed to parse Service Account Key:", e);
      // Fallback to default to avoid crash
      app = admin.initializeApp({ projectId: "growshare-capital" }, "ADMIN_INSTANCE");
    }
  } else {
    // B. Use Default Credentials (Cloud / Production)
    app = admin.initializeApp({
      projectId: "growshare-capital",
    }, "ADMIN_INSTANCE");
    console.log("⚠️ [Server] Using Default Credentials (ADC).");
  }
  
  // Save to global so we don't re-init on refresh
  global.firebaseAdminApp = app;
} else {
  // Use existing app
  app = global.firebaseAdminApp;
}

// 2. Get Firestore Database
const dbAdmin = getFirestore(app);

// 3. Prevent "undefined" errors in queries
dbAdmin.settings({ ignoreUndefinedProperties: true });

export { dbAdmin };