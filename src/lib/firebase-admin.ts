import "server-only";
import admin from "firebase-admin";

let dbAdmin: FirebaseFirestore.Firestore | null = null;

try {
  if (!admin.apps.length) {
    // 🤖 Use Application Default Credentials (ADC)
    // This automatically detects your Cloud Workstation identity
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: "growshare-capital" 
    });
    console.log("✅ [Admin SDK] Initialized via Default Credentials.");
  }

  if (admin.apps.length) {
    dbAdmin = admin.firestore();
  }
} catch (error) {
  console.error("❌ [Admin SDK] Initialization Error:", error);
  dbAdmin = null;
}

export { dbAdmin };