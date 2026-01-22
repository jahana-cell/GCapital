'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  User,
  Auth
} from 'firebase/auth';
import { auth, appCheck } from '@/lib/firebase';
import { getToken } from 'firebase/app-check';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isSigner: boolean;
  isNotary: boolean;
  isMember: boolean;
  signIn: (email: string, pass: string) => Promise<any>;
  signUp: (email: string, pass: string, displayName: string) => Promise<any>;
  signOut: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  isSigner: false,
  isNotary: false,
  isMember: false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

const memberEmails = [
    'aminuddin.khan@growshare.capital',
    'ashif.jahan@growshare.capital',
    'abid.abdullah@growshare.capital',
    'md.mansur@growshare.capital',
    'usman.nawid@growshare.capital',
    'babacar.thiaw@growshare.capital',
    'kazi.haque@growshare.capital',
    'khan.kaukab@icloud.com',
    'abir.hossain@growshare.capital',
    'mmansur9908@gmail.com',
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSigner, setIsSigner] = useState(false);
  const [isNotary, setIsNotary] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [appCheckReady, setAppCheckReady] = useState(false);

  useEffect(() => {
    // This logic checks for App Check availability and runs only in the browser.
    if (typeof window !== 'undefined' && appCheck) {
      const checkAppCheck = async () => {
          try {
            await getToken(appCheck, false);
            setAppCheckReady(true);
          } catch (error) {
            console.error("App Check failed to initialize:", error);
            // Even if it fails, we set ready to true so the app doesn't hang forever
            setAppCheckReady(true);
          }
      };
      checkAppCheck();
    } else {
        // If App Check isn't active (or on server), we proceed immediately.
        setAppCheckReady(true);
    }
  }, []);

  useEffect(() => {
    // CRITICAL FIX: 
    // 1. We check '!auth' to handle null cases.
    // 2. We check '!auth.onAuthStateChanged' to handle the empty "dummy" object {} 
    //    that we created in lib/firebase.ts to prevent build crashes.
    // 3. We wait for appCheckReady to ensure security.
    if (!auth || !auth.onAuthStateChanged || !appCheckReady) {
      // If we are on the server (build time), stop loading immediately so pages can render.
      if (typeof window === 'undefined') {
          setLoading(false); 
      }
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          const tokenResult = await user.getIdTokenResult();
          const hasAdminClaim = tokenResult.claims.admin === true;
          const isSuperUser = user.email === 'khan.kaukab@icloud.com';
          
          const effectiveIsAdmin = hasAdminClaim || isSuperUser;
          const userIsMember = user.email ? memberEmails.includes(user.email) : false;

          setIsAdmin(effectiveIsAdmin);
          setIsSigner(effectiveIsAdmin);
          setIsNotary(effectiveIsAdmin);
          setIsMember(userIsMember || effectiveIsAdmin);
        } catch (error) {
            console.error("Error getting ID token result:", error);
            setIsAdmin(false);
            setIsSigner(false);
            setIsNotary(false);
            setIsMember(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
        setIsSigner(false);
        setIsNotary(false);
        setIsMember(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [appCheckReady]); 

  const signIn = (email: string, pass: string) => {
    if (!auth) return Promise.reject(new Error("Firebase Auth is not available."));
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const signUp = async (email: string, pass: string, displayName: string) => {
    if (!auth) return Promise.reject(new Error("Firebase Auth is not available."));
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
    }
    return userCredential;
  };

  const signOut = () => {
    if (!auth) return Promise.reject(new Error("Firebase Auth is not available."));
    return firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, isSigner, isNotary, isMember, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);