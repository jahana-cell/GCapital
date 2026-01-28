'use client';

import { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  DocumentData, 
  QueryDocumentSnapshot, 
  query, 
  orderBy, 
  QuerySnapshot 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  UserCog, 
  Mailbox, 
  AlertCircle 
} from 'lucide-react';
import { FadeIn } from '@/components/fade-in';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// --- TYPES ---

interface Subscriber {
  id: string;
  email: string;
  createdAt: any;
}

// --- LUXURY COMPONENTS ---

const LuxuryCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <Card className={`border-0 shadow-xl shadow-neutral-900/5 ring-1 ring-neutral-900/5 bg-white overflow-hidden ${className}`}>
    {children}
  </Card>
);

const LuxuryHeader = ({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle?: string }) => (
  <div className="flex flex-col space-y-2 mb-6 border-b border-neutral-100 pb-6">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-[#D4AF37]/10 rounded-md">
        <Icon className="w-5 h-5 text-[#D4AF37]" />
      </div>
      <h3 className="font-serif text-2xl text-neutral-900 tracking-tight">{title}</h3>
    </div>
    {subtitle && <p className="text-sm text-neutral-500 font-light ml-12">{subtitle}</p>}
  </div>
);

// --- SUB-COMPONENTS ---

function SubscribersTable({ subscribers, isLoading }: { subscribers: Subscriber[], isLoading: boolean }) {
  return (
    <LuxuryCard>
      <CardContent className="p-8">
        <LuxuryHeader icon={Mailbox} title="Subscriber Base" subtitle="Manage newsletter subscriptions and marketing leads." />
        
        <div className="overflow-hidden rounded-lg border border-neutral-100">
            {isLoading ? (
               <div className="p-8 text-center text-neutral-400">Syncing database...</div>
            ) : subscribers.length > 0 ? (
            <Table>
                <TableHeader className="bg-neutral-50">
                    <TableRow>
                        <TableHead className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold py-4 pl-6">Email Address</TableHead>
                        <TableHead className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold py-4 pr-6 text-right">Date Joined</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {subscribers.map(sub => (
                    <TableRow key={sub.id} className="hover:bg-neutral-50/50 transition-colors border-neutral-100">
                        <TableCell className="font-medium text-neutral-900 py-4 pl-6">
                            {/* Check if email exists, otherwise show ID for debugging */}
                            {sub.email || <span className="text-red-400 italic text-xs">Missing 'email' field</span>}
                        </TableCell>
                        <TableCell className="text-right text-neutral-500 py-4 pr-6">
                            {sub.createdAt?.seconds 
                                ? format(new Date(sub.createdAt.seconds * 1000), 'MMM dd, yyyy') 
                                : <span className="text-neutral-300 text-xs">No Date</span>
                            }
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            ) : (
            <div className="p-8 text-center text-neutral-400 font-light italic">No subscribers found in database.</div>
            )}
        </div>
      </CardContent>
    </LuxuryCard>
  );
}

// --- MAIN PAGE ---

export default function AdminPage() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();
  
  const [error, setError] = useState('');
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Auth Protection
  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push('/login?redirect=/services/admin');
    }
  }, [user, authLoading, isAdmin, router]);

  // Data Fetching
  useEffect(() => {
    if (!isAdmin) return;

    // 1. Fetch Subscribers
    // We remove 'orderBy' on the server to prevent missing-index errors or missing-field filtering
    const ref = collection(db, 'subscribers');
    const q = query(ref); 

    const unsubscribe = onSnapshot(q, 
      (snapshot: QuerySnapshot<DocumentData>) => {
        const data = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
            const docData = doc.data();
            return { 
                id: doc.id, 
                ...docData 
            } as Subscriber;
        });

        // Client-side Sort (Safe for missing dates)
        data.sort((a, b) => {
            const dateA = a.createdAt?.seconds || 0;
            const dateB = b.createdAt?.seconds || 0;
            return dateB - dateA; // Newest first
        });

        setSubscribers(data);
        setIsLoadingData(false);
      },
      (error) => {
          console.error("Error fetching subscribers:", error);
          setError("Permission Error: Check Firestore Rules.");
          setIsLoadingData(false);
      }
    );

    return () => unsubscribe();
  }, [isAdmin]);

  if (authLoading || !isAdmin) {
    return (
        <div className="flex h-screen items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]" />
                <p className="text-sm font-serif text-neutral-600 tracking-widest uppercase">Authenticating Access</p>
            </div>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-32">
      
      {/* --- HEADER SECTION --- */}
      <div className="bg-[#1a1a1a] text-white py-20 px-4 mb-12">
          <div className="container mx-auto max-w-5xl">
              <FadeIn>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
                              <UserCog className="w-8 h-8 text-[#1a1a1a]" />
                          </div>
                          <div>
                              <h1 className="font-serif text-3xl md:text-4xl tracking-tight text-white mb-2">Executive Dashboard</h1>
                              <p className="text-neutral-400 font-light">Centralized command for database operations.</p>
                          </div>
                      </div>
                      <div className="flex gap-3">
                          <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white" asChild>
                              <Link href="/seed-db">Database Seeder</Link>
                          </Button>
                      </div>
                  </div>
              </FadeIn>
          </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl space-y-12">
        <FadeIn>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-8 flex items-center gap-3">
                <AlertCircle className="w-5 h-5" />
                {error}
            </div>
          )}

          {/* MAIN CONTENT AREA */}
          <div className="space-y-8">
             <SubscribersTable subscribers={subscribers} isLoading={isLoadingData} />
          </div>

        </FadeIn>
      </div>
    </div>
  );
}