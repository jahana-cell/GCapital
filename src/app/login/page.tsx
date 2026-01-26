'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  signInWithRedirect, // CHANGED: Redirect avoids popup blockers
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { auth } from '@/lib/firebase'; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, ArrowRight } from 'lucide-react';

// --- MAIN LOGIN FORM COMPONENT ---
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Login and Sign Up
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // 1. Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      // Using redirect prevents browser popup blockers
      await signInWithRedirect(auth, provider);
      // No router.push needed; the page redirects automatically
    } catch (err: any) {
      setError('Could not sign in with Google. Please try again.');
      console.error(err);
      setIsLoading(false);
    }
  };

  // 2. Handle Email/Password Auth
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      }
      router.push(redirect);
    } catch (err: any) {
      // Friendly error messages
      if (err.code === 'auth/invalid-credential') setError('Invalid email or password.');
      else if (err.code === 'auth/email-already-in-use') setError('This email is already registered.');
      else if (err.code === 'auth/weak-password') setError('Password should be at least 6 characters.');
      else setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 bg-card border border-border p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Decorative Gold Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />

        {/* Header */}
        <div className="text-center space-y-2 relative z-10">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground">
            {isSignUp ? 'Join the Legacy' : 'Welcome Back'}
          </h1>
          <p className="text-muted-foreground text-sm tracking-wide">
            {isSignUp ? 'Begin your investment journey.' : 'Access your portfolio.'}
          </p>
        </div>

        {/* Google Button */}
        <Button 
          variant="outline" 
          className="w-full h-12 border-border hover:bg-muted/50 transition-all gap-3 text-base font-medium"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        >
          {isLoading ? (
             <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              {/* Google Logo SVG */}
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground tracking-widest">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="h-11 bg-muted/20 border-border focus:border-primary transition-colors"
            />
            <Input
              type="password"
              placeholder="Password"
              required
              minLength={6}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="h-11 bg-muted/20 border-border focus:border-primary transition-colors"
            />
          </div>

          {error && (
            <p className="text-destructive text-sm text-center font-medium animate-in fade-in slide-in-from-top-1">
              {error}
            </p>
          )}

          <Button 
            type="submit" 
            className="w-full h-11 text-base tracking-wide font-semibold shadow-lg hover:shadow-primary/20 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
               <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                {isSignUp ? 'Create Account' : 'Sign In'} <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        {/* Toggle Sign Up / Sign In */}
        <div className="text-center pt-2">
          <p className="text-sm text-muted-foreground">
            {isSignUp ? 'Already a member?' : 'New to GrowShare Capital?'}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              className="ml-2 text-primary hover:text-primary/80 font-semibold hover:underline underline-offset-4 transition-all"
            >
              {isSignUp ? 'Sign In' : 'Join Now'}
            </button>
          </p>
        </div>
    </div>
  );
}

// --- PAGE WRAPPER ---
export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Suspense fallback={<div className="flex items-center gap-3 text-muted-foreground"><Loader2 className="animate-spin" /> Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}