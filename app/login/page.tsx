"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowLeft, Loader2, ShieldAlert } from "lucide-react";

/**
 * Admin Login Page
 * Handles authentication for the private dashboard.
 */
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const logIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Success: Route to dashboard
      router.push("/admin");
    } catch (error: any) {
      console.error("Login error:", error);
      // Generic error message for security (don't reveal if email or password was wrong)
      setErrorMsg("Authentication failed. Please check your credentials.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-brand-dark flex items-center justify-center p-6">
      <div className="bg-white dark:bg-white/5 p-10 md:p-12 shadow-2xl rounded-4xl border border-gray-100 dark:border-white/10 max-w-md w-full relative animate-in fade-in zoom-in duration-500">
        
        {/* Back Navigation */}
        <Link 
          href="/" 
          className="absolute top-6 left-8 text-gray-400 hover:text-brand-purple transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={14} /> Back to Site
        </Link>

        {/* Header Section */}
        <div className="flex flex-col items-center mt-12 mb-10">
          <div className="w-16 h-16 bg-brand-teal/10 rounded-2xl text-brand-teal flex items-center justify-center mb-6 shadow-inner">
            <Lock size={32} />
          </div>
          <h1 className="text-4xl font-black dark:text-white tracking-tighter mb-2">
            Admin Access
          </h1>
          <p className="text-gray-400 text-sm font-medium tracking-tight">
            Authorization required to proceed.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="flex items-center gap-3 text-red-600 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 p-4 rounded-2xl mb-8 animate-in slide-in-from-top-2">
            <ShieldAlert size={20} className="shrink-0" />
            <p className="text-sm font-bold leading-tight">{errorMsg}</p>
          </div>
        )}

        {/* Form Logic */}
        <form onSubmit={logIn} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] ml-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-teal outline-none transition-all dark:text-white placeholder:text-gray-300"
              placeholder="admin@aevaksnes.no"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] ml-1">
              Secret Key
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-teal outline-none transition-all dark:text-white placeholder:text-gray-300"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 p-5 rounded-2xl font-black text-white bg-brand-teal hover:bg-brand-teal/90 transition-all shadow-xl shadow-brand-teal/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Verifying...
              </>
            ) : (
              "Unlock Dashboard"
            )}
          </button>
        </form>

        <p className="mt-10 text-center text-[10px] text-gray-400 font-mono uppercase tracking-widest opacity-50">
          Protected by Firebase Auth
        </p>
      </div>
    </main>
  );
}