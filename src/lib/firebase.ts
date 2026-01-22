// src/lib/firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider, AppCheck } from "firebase/app-check";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "growshare-capital.firebaseapp.com",
  projectId: "growshare-capital",
  storageBucket: "growshare-capital.firebasestorage.app",
  messagingSenderId: "655144442348",
  appId: "1:655144442348:web:5316340277259160538a7c"
};

// Singleton variables
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;
let appCheck: AppCheck | null = null; // Initialize as null for SSR

if (typeof window === 'undefined') {
    // ⚠️ SERVER-SIDE (SSR/Build)
    // Create dummy objects to prevent import crashes during 'next build'
    app = {} as FirebaseApp;
    auth = {} as Auth;
    db = {} as Firestore;
    storage = {} as FirebaseStorage;
} else {
    // ✅ CLIENT-SIDE (Browser)
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);

    // Initialize App Check only if a Site Key exists
    const reCaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (reCaptchaKey) {
        try {
            appCheck = initializeAppCheck(app, {
                provider: new ReCaptchaV3Provider(reCaptchaKey),
                isTokenAutoRefreshEnabled: true
            });
        } catch (e) {
            console.warn("App Check initialization skipped.");
        }
    }
}

// Export appCheck so auth-context.tsx can find it
export { app, auth, db, storage, appCheck };