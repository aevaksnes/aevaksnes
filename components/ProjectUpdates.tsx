"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Update } from "@/types/firebase_types";
import { Loader2, History } from "lucide-react";
import { UpdateCard } from "./UpdateCard";

/**
 * Renders a vertical timeline of updates for a specific project.
 */
export function ProjectUpdates({ projectId }: { projectId: string }) {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const q = query(
          collection(db, "updates"),
          where("projectId", "==", projectId),
          orderBy("date", "desc")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Update[];
        setUpdates(data);
      } catch (error) {
        console.error("Error fetching updates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUpdates();
  }, [projectId]);

  if (loading) return (
    <div className="flex justify-center py-12">
      <Loader2 className="animate-spin text-brand-teal" size={32} />
    </div>
  );

  if (updates.length === 0) return null;

  return (
    <section className="mt-32 pt-16 border-t border-gray-100 dark:border-white/10">
      <div className="flex items-center gap-3 mb-16">
        <div className="p-2 bg-brand-purple/10 rounded-lg text-brand-purple">
          <History size={24} />
        </div>
        <h2 className="text-4xl font-black dark:text-white tracking-tighter">
          Project Updates
        </h2>
      </div>

      {/* Timeline of Updates for this Project */}
      <div className="max-w-3xl">
        {updates.map((update, index) => (
          <UpdateCard
            key={update.id}
            update={update}
            isLast={index === updates.length - 1}
            showProjectTitle={false}
          />
        ))}
      </div>
    </section>
  );
}