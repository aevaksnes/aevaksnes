"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth"; 
import { auth } from "../../lib/firebase"; 
import { ShieldCheck, LogOut, LayoutDashboard, Database, Zap } from "lucide-react"; 
import Link from "next/link";

/**
 * AdminLayout acts as a client-side route guard.
 * It ensures only authenticated users can access children components.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Firebase Auth Observer
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setHasAccess(true);
        setLoading(false);
      } else {
        console.warn("Unauthorized access attempt. Redirecting to login...");
        router.push("/login"); 
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Loading State 
  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center">
          <ShieldCheck size={80} className="text-brand-orange animate-pulse mb-8" />
          <div className="absolute inset-0 rounded-full border-t-2 border-brand-teal/30 animate-spin" />
        </div>
        <h2 className="text-sm font-mono font-bold tracking-[0.3em] text-white/50">
          Decrypting...
        </h2>
      </div>
    );
  }

  if (!hasAccess) return null;

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-brand-dark pb-24">
      
      {/* Internal Admin Navigation */}
      <nav className="bg-white dark:bg-white/5 border-b border-gray-100 dark:border-white/10 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="flex items-center gap-2 font-black text-brand-orange dark:text-white tracking-tighter">
              <LayoutDashboard size={18} />
              <span>Admin Dashboard</span>
            </Link>
            
            {/* Quick Links inside admin */}
            <div className="hidden sm:flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-gray-400">
               <Link href="/admin/projects" className="hover:text-brand-purple transition-colors">Projects</Link>
               <Link href="/admin/updates" className="hover:text-brand-purple transition-colors">Updates</Link>
               <Link href="/admin/downloads" className="hover:text-brand-purple transition-colors">Downloads</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-full uppercase tracking-tighter">
            <Zap size={12} fill="currentColor" />
            Live Session
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {children}
      </main>
      
      {/* Floating Logout Button */}
      <button 
        onClick={handleLogOut}
        className="fixed bottom-8 right-8 bg-white dark:bg-red-600 dark:text-white p-4 md:px-6 md:py-3 rounded-2xl shadow-2xl border border-gray-100 dark:border-none hover:bg-red-50 dark:hover:bg-red-700 transition-all flex items-center justify-center gap-2 z-50 group hover:-translate-y-1 active:scale-95"
        title="Terminate session"
      >
        <LogOut size={18} className="text-red-600 dark:text-white" />
        <span className="hidden md:inline font-black tracking-tighter text-sm text-red-600 dark:text-white">
          End Session
        </span>
      </button>
    </div>
  );
}