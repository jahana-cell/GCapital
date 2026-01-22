
// /src/lib/firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getFunctions, Functions } from "firebase/functions";
import { getAuth, Auth } from "firebase/auth";
import { AppCheck, initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getStorage } from "firebase/storage";

// --- Augment Window Interface ---
// This tells TypeScript that our custom property can exist on the window object.
declare global {
  interface Window {
    FIREBASE_APPCHECK_INITIALIZED?: boolean;
  }
}

// --- Firebase Config ---
// Removed the '!' non-null assertions to handle build-time environments safely.
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// --- Conditionally Initialize Firebase on the Client ---
let app: FirebaseApp;
let db: Firestore;
let functions: Functions;
let auth: Auth;
let storage: any;
let appCheck: AppCheck | undefined;

// This block ensures Firebase is only initialized in the browser where 'window' is defined
// and the necessary API key is present. It prevents server-side build errors.
if (typeof window !== 'undefined' && firebaseConfig.apiKey) {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }

  db = getFirestore(app);
  functions = getFunctions(app, "nam5");
  auth = getAuth(app);
  storage = getStorage(app);

  if (!window.FIREBASE_APPCHECK_INITIALIZED && app.options.appId) {
    try {
      appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider("6Ld0k_UrAAAAAAkeU8nhe6nn2haxSbOeXPVRm407"),
        isTokenAutoRefreshEnabled: true,
      });
      window.FIREBASE_APPCHECK_INITIALIZED = true;
    } catch (e) {
      console.info("Firebase App Check failed to initialize or running in a non-browser environment.", e);
    }
  }
} else {
    // If on the server or config is missing, we provide mock/empty objects
    // to prevent errors when components import these services.
    // @ts-ignore
    app = {}; 
    // @ts-ignore
    db = {}; 
    // @ts-ignore
    functions = {};
    // @ts-ignore
    auth = {};
    // @ts-ignore
    storage = {};
}


// --- EXPORTS ---
// Export the (potentially null) services.
// @ts-ignore
export { app, db, functions, auth, storage, appCheck };
export type { Firestore };
