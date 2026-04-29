"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Project } from "@/types/firebase_types";
import { ProjectWrapper } from "@/components/ProjectWrapper";
import { ProjectUpdates } from "@/components/ProjectUpdates";
import { ProjectDownloads } from "@/components/ProjectDowloads";
import { Loader2, Info } from "lucide-react";
import Image from "next/image";

/**
 * Dynamic project page that fetches specific project details from Firestore.
 * Integrates updates and downloads linked to the project ID.
 */
export default function SingleProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      
      try {
        const docRef = doc(db, "projects", id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() } as Project);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-purple" size={40} />
      </div>
    );
  }

  if (!project) return notFound();

  return (
    <ProjectWrapper title={project.title} tags={project.tags}>
      <div className="max-w-4xl animate-in fade-in duration-700">
        
        {/* Section: Overview */}
        <section className="mb-16">
          <div className="flex items-center gap-2 text-brand-purple mb-4">
            <Info size={20} />
            <span className="font-mono text-xs font-bold tracking-widest uppercase opacity-70">Project Overview</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black mb-6 dark:text-white tracking-tighter">
            About this project
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-12">
            {project.description}
          </p>
          
          {/* Main Project Visual */}
          {project.image && (
            <div className="relative w-full aspect-video rounded-4xl overflow-hidden shadow-2xl border border-gray-100 dark:border-white/10 mb-16">
              <Image 
                src={project.image} 
                alt={`${project.title} showcase`} 
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </section>

        {/* Section: Technical Journey & Files */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Side: Timeline/Updates (2/3 width on large screens) */}
          <div className="lg:col-span-2 space-y-16">
            <ProjectUpdates projectId={project.id} />
          </div>

          {/* Right Side: Downloads & Links (1/3 width) */}
          <aside className="space-y-8">
            <div className="sticky top-28">
              <ProjectDownloads projectId={project.id} />
            </div>
          </aside>
          
        </div>
      </div>
    </ProjectWrapper>
  );
}