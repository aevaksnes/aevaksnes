"use client";

import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Project } from "@/types/firebase_types";
import { ProjectWrapper } from "@/components/ProjectWrapper";
import { ProjectUpdates } from "@/components/ProjectUpdates";
import Image from "next/image";
import { notFound } from "next/navigation";
import { 
  Loader2, 
  Settings, 
  Car, 
  Database, 
  CheckCircle2, 
  Layout 
} from "lucide-react";

export default function AnkerAS() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const q = query(collection(db, "projects"), where("title", "==", "Anker AS Website"));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          setProject({ id: doc.id, ...doc.data() } as Project);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, []);

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="animate-spin text-brand-teal" size={40} /></div>;
  if (!project) return notFound();

  return (
    <ProjectWrapper title={project.title} tags={project.tags}>
      <div className="max-w-4xl space-y-24">
        
        {/* 1. Hero Intro */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl md:text-5xl font-black mb-6 dark:text-white tracking-tighter">
            Digital Overhaul for a Family Legacy
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
            Transforming a patchwork legacy site into a high-performance business tool. 
            Built for a garage where <span className="text-brand-teal font-semibold">expertise in mechanics</span> meets a need for <span className="text-brand-purple font-semibold">digital simplicity</span>.
          </p>
        </section>

        {/* 2. Feature Showcase Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-4xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm transition-all hover:border-brand-teal/30">
            <Car className="text-brand-teal mb-4" size={32} />
            <h4 className="font-bold text-lg mb-2">Inventory System</h4>
            <p className="text-sm text-gray-500 leading-relaxed">Custom modules for car sales and rentals with real-time Firestore updates.</p>
          </div>
          <div className="p-8 rounded-4xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm transition-all hover:border-brand-purple/30">
            <Settings className="text-brand-purple mb-4" size={32} />
            <h4 className="font-bold text-lg mb-2">Tailored Admin</h4>
            <p className="text-sm text-gray-500 leading-relaxed">A custom CMS allowing the owner to update listings and news without touching code.</p>
          </div>
          <div className="p-8 rounded-4xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm transition-all hover:border-blue-500/30">
            <Database className="text-blue-500 mb-4" size={32} />
            <h4 className="font-bold text-lg mb-2">Firebase Core</h4>
            <p className="text-sm text-gray-500 leading-relaxed">Secure data handling for business-critical inventory and customer inquiries.</p>
          </div>
        </section>

        {/* 3. Visual Gallery  */}
        <section className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Visual Showcase</h3>
            <p className="text-gray-500">Clean interfaces designed for both customers and staff.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Screenshot 1 */}
            <div className="relative aspect-video rounded-4xl overflow-hidden border border-gray-100 dark:border-white/10 bg-gray-50 p-4 shadow-inner">
              <Image 
                src="/projects/ankeras_home.png" 
                alt="Homepage preview"
                fill
                className="object-contain p-4 transition-transform hover:scale-105 duration-700"
              />
            </div>
            {/* Screenshot 2 */}
            <div className="relative aspect-video rounded-4xl overflow-hidden border border-gray-100 dark:border-white/10 bg-gray-50 p-4 shadow-inner">
              <Image 
                src="/projects/ankeras.png"
                alt="Custom Admin Dashboard"
                fill
                className="object-contain p-4 transition-transform hover:scale-105 duration-700"
              />
            </div>
          </div>
        </section>

        {/* 4. The Challenge & Insights (Bento Style) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-10 rounded-4xl bg-brand-teal/5 border border-brand-teal/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Layout size={80} />
            </div>
            <h3 className="text-brand-teal text-xl font-bold mb-4">The Challenge</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The goal was to replace an outdated, hard-to-maintain site with a modern solution that the family could manage themselves. No tech jargon, just a tool that works as reliably as a well-serviced engine.
            </p>
          </div>
          <div className="p-10 rounded-4xl bg-brand-purple/5 border border-brand-purple/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <CheckCircle2 size={80} />
            </div>
            <h3 className="text-brand-purple text-xl font-bold mb-4">Development Insights</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              My first deep dive into <strong>Next.js</strong>. I focused on building a custom-fit CMS to make it easy to use and hard to make mistakes. I want them to feel in control of their own content.
            </p>
          </div>
        </section>

        {/* 5. Roadmap Timeline */}
        <section className="p-10 md:p-16 rounded-4xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
          <h2 className="text-3xl font-bold mb-12 dark:text-white tracking-tight">The Roadmap to Launch</h2>
          <div className="space-y-12">
            {[
              { phase: "Phase 1: Documentation", desc: "Finalizing comments, README, and internal handover guides.", status: "completed" },
              { phase: "Phase 2: Content Migration", desc: "Collaborating with Anker AS to populate real car listings and rental data.", status: "completed" },
              { phase: "Phase 3: Production Push", desc: "Moving from staging to the official company domain with SEO optimization.", status: "upcoming" }
            ].map((step, i) => (
              <div key={i} className="flex gap-6 items-start group">
                <div className={`mt-1.5 shrink-0 w-4 h-4 rounded-full border-4 border-white dark:border-brand-dark shadow-sm ${step.status === 'completed' ? 'bg-brand-teal animate-pulse' : 'bg-gray-300'}`} />
                <div>
                  <h4 className={`font-bold text-lg ${step.status === 'completed' ? 'text-brand-teal' : 'text-gray-400'}`}>
                    {step.phase}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <blockquote className="border-l-4 border-brand-teal pl-8 italic my-12 text-2xl text-gray-500 dark:text-gray-400 font-medium py-2">
          &quot;Technology should empower small businesses, not complicate them.&quot;
        </blockquote>

        {/* Updates at the very end */}
        <ProjectUpdates projectId={project.id} />
      </div>
    </ProjectWrapper>
  );
}