"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Project } from "@/types/firebase_types";
import ProjectCard from "@/components/ProjectCard";
import { Loader2, LayoutGrid } from "lucide-react";

/**
 * Projects page that fetches and displays the portfolio in a bento-style grid.
 * Sorts projects based on the 'order' field from Firestore.
 */
export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetching projects sorted by their display order
        const q = query(collection(db, "projects"), orderBy("order", "asc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        })) as Project[];
        
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-brand-purple" size={48} />
        <p className="text-gray-500 font-mono text-sm animate-pulse">Loading gallery...</p>
      </div>
    </div>
  );

  return (
    <main className="max-w-7xl mx-auto py-24 px-6">
      
      {/* Header Section */}
      <header className="mb-16">
        <div className="flex items-center gap-3 mb-4 text-brand-purple">
          <LayoutGrid size={24} />
          <span className="font-mono text-sm font-bold uppercase tracking-[0.2em]">Portfolio</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black dark:text-white tracking-tighter mb-6">
          Selected <span className="text-brand-purple">Works</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
          A collection of digital tools, experimental code, and problem-solving projects 
          built with focus on simplicity and user experience.
        </p>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Empty State (if no projects found) */}
      {!loading && projects.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-gray-100 dark:border-white/5 rounded-4xl">
          <p className="text-gray-500 italic">No projects found. Check back soon!</p>
        </div>
      )}
    </main>
  );
}