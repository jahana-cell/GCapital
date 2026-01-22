
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
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// --- Singleton Pattern for Firebase Services ---
// This function ensures that Firebase is only initialized on the client-side.
// On the server, it returns null for all services to prevent build errors.
const getFirebaseServices = () => {
    if (typeof window !== 'undefined' && firebaseConfig.apiKey) {
        const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        const db = getFirestore(app);
        const functions = getFunctions(app, "nam5");
        const auth = getAuth(app);
        const storage = getStorage(app);
        let appCheck: AppCheck | undefined;

        if (!window.FIREBASE_APPCHECK_INITIALIZED && app.options.appId) {
            try {
                appCheck = initializeAppCheck(app, {
                    provider: new ReCaptchaV3Provider("6Ld0k_UrAAAAAAkeU8nhe6nn2haxSbOeXPVRm407"),
                    isTokenAutoRefreshEnabled: true,
                });
                window.FIREBASE_APPCHECK_INITIALIZED = true;
            } catch (e) {
                console.info("Firebase App Check failed to initialize in this environment.", e);
            }
        }
        return { app, db, functions, auth, storage, appCheck };
    }
    // On the server or if config is missing, return nulls.
    return { app: null, db: null, functions: null, auth: null, storage: null, appCheck: undefined };
};

const { app, db, functions, auth, storage, appCheck } = getFirebaseServices();

export { app, db, functions, auth, storage, appCheck };
export type { Firestore };
