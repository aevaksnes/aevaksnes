"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Update } from "@/types/firebase_types";
import { Loader2 } from "lucide-react";
import { UpdateCard } from "@/components/UpdateCard";

/**
 * Main Updates Page
 * Uses the shared UpdateCard to display a global feed of all project activities.
 */
export default function UpdatesPage() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const q = query(collection(db, "updates"), orderBy("date", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Update[];
        setUpdates(data);
      } catch (error) {
        console.error("Error fetching global updates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUpdates();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-purple" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-24 px-6 animate-in fade-in duration-700">

      {/* Page Header */}
      <header className="mb-24">
        <h1 className="text-5xl md:text-7xl font-black mb-6 dark:text-white tracking-tighter">
          Updates
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
          A technical log of my progress, features, and experiments.
          Documenting the journey of building digital tools.
        </p>
      </header>

      {/* Global Feed */}
      <div className="space-y-0">
        {updates.map((update, index) => (
          <UpdateCard
            key={update.id}
            update={update}
            isLast={index === updates.length - 1}
            showProjectTitle={true} 
          />
        ))}
      </div>

      {updates.length === 0 && (
        <div className="py-20 text-center rounded-4xl border-2 border-dashed border-gray-100 dark:border-white/5">
          <p className="text-gray-500 italic">No logs found. Stay tuned for more.</p>
        </div>
      )}
    </div>
  );
}