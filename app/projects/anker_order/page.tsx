"use client";

import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Project } from "@/types/firebase_types";
import { ProjectWrapper } from "@/components/ProjectWrapper";
import { ProjectUpdates } from "@/components/ProjectUpdates";
import { notFound } from "next/navigation";
import Image from "next/image";
import { 
  Calendar, 
  Archive, 
  Database, 
  Printer, 
  Layers, 
  Loader2, 
  ShieldCheck, 
  Flame 
} from "lucide-react";

export default function AnkerOrder() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Enforce exact title match from your Firestore 'projects' collection
        const q = query(collection(db, "projects"), where("title", "==", "Anker AS Order Book PWA"));
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

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="animate-spin text-brand-orange" size={40} /></div>;
  if (!project) return notFound();

  return (
    <ProjectWrapper title={project.title} tags={project.tags}>
      <div className="space-y-28 animate-in fade-in duration-700">

        {/* Hero Concept Quote */}
        <section className="py-16 px-10 rounded-4xl bg-brand-orange/5 border border-brand-orange/10 text-center italic">
          <p className="text-2xl md:text-3xl font-medium text-gray-800 dark:text-white leading-relaxed mb-0">
            &quot;Replacing the physical order book with digital solution focused on <span className="text-brand-orange font-bold"> reliability</span>, userfriendly design and a clear structure.&quot;
          </p>
        </section>

        {/* Core Narrative: The Context & Challenge */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <h2 className="text-4xl font-black tracking-tighter dark:text-white">The Challenge</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Anker AS wanted to replace a traditional, physical paper-based order book with a digital system. The primary goal wasn&apos;t just moving data to a database, but building an application so intuitive that users accustomed to pen and paper felt completely secure.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              In close collaboration with the active users, the system was developed to guarantee that no order is ever lost, visibility is constant, and deadlines are impossible to miss.
            </p>
          </div>

          {/* Core App Screenshot Placeholder */}
          <div className="relative aspect-video w-full rounded-4xl overflow-hidden shadow-2xl border border-gray-100 dark:border-white/10 bg-gray-100 dark:bg-white/5 group">
            <Image
              src="/projects/anker-screen-1.jpg"
              alt="Anker AS Dashboard Overview"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-102"
            />
          </div>
        </section>

        {/* Technical Deep Dive: The Dependency Battle */}
        <section className="p-10 md:p-16 rounded-4xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
          <div className="max-w-3xl space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-brand-purple font-bold">Technical Deep Dive</h3>
            <h2 className="text-3xl font-black tracking-tight dark:text-white">PWA & Framework Friction</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              To make the tool highly accessible on tablets and mobile devices around the workspace, it was architected as a <strong>Progressive Web App (PWA)</strong>. 
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed border-l-4 border-brand-purple/30 pl-4 italic">
              A technical hurdle arose because modern PWA service worker packages often lag slightly behind the fast-paced Next.js major release ecosystem. Solving this required granular dependency locks and precise environment configurations to ensure rock-solid offline synchronization without sacrificing Next.js routing capabilities.
            </p>
          </div>
        </section>

        {/* Feature Bento Grid: Deadlines, Backup, Archive & Structure */}
        <section className="space-y-12">
          <div>
            <h2 className="text-3xl font-black tracking-tighter dark:text-white mb-2">Built for User Trust</h2>
            <p className="text-gray-500">How the interface solves practical day-to-day problems.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1: Follow-ups */}
            <div className="p-8 rounded-4xl border border-gray-100 dark:border-white/5 bg-white dark:bg-white/5 space-y-4">
              <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center">
                <Calendar size={24} />
              </div>
              <h4 className="font-bold text-lg dark:text-white">Deadlines & Follow-Ups</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Crystal clear follow-up constraints and highly visual status badges keep tracking transparent. Users instantly see what is completed and what requires attention.
              </p>
            </div>

            {/* Feature 2: Structured Rows */}
            <div className="p-8 rounded-4xl border border-gray-100 dark:border-white/5 bg-white dark:bg-white/5 space-y-4">
              <div className="w-12 h-12 bg-brand-teal/10 text-brand-teal rounded-2xl flex items-center justify-center">
                <Layers size={24} />
              </div>
              <h4 className="font-bold text-lg dark:text-white">Custom Information Tracked</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                The information saved is specific to their needs. Things like customer name, phone number, freetext order details, and list of items if needed, car registration number, if the order is in the basket ready to be submitted and if price is given or not... 
              </p>
            </div>

            {/* Feature 3: Live Parking */}
            <div className="p-8 rounded-4xl border border-gray-100 dark:border-white/5 bg-white dark:bg-white/5 space-y-4">
              <div className="w-12 h-12 bg-brand-purple/10 text-brand-purple rounded-2xl flex items-center justify-center">
                <Archive size={24} />
              </div>
              <h4 className="font-bold text-lg dark:text-white">Archive</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Keep the data organized and always accessible. All completed, cancelled, and &quot;on hold&quot; states are preserved in the searchable archive.
              </p>
            </div>

          </div>
        </section>

        {/* Interactive Gallery Segment */}
        <section className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-black tracking-tighter mb-2">Interface</h3>
            <p className="text-gray-500">Explore the design of the Anker order management system.</p>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-6 snap-x no-scrollbar">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="relative flex-none w-64 md:w-80 aspect-video rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 bg-gray-50 shadow-lg snap-center transition-transform hover:scale-[1.01] duration-300"
              >
                <Image
                  src={`/projects/anker-screen-${num}.jpg`}
                  alt={`Anker Interface view ${num}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* The Ultimate Test & Print Mode Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          <div className="lg:col-span-2 p-10 md:p-12 rounded-4xl bg-brand-teal/5 border border-brand-teal/10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-brand-teal">
                <Flame size={24} fill="currentColor" />
                <h3 className="text-2xl font-black tracking-tight dark:text-white">Print-View Model</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
                The software faces its hardest test when substitution staff—including my own parents—take over active daily workflows. To smooth this transformation, a customized **Print-View Model** was engineered.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
                Using CSS `@media print` rulesets, the screen transforms into a hard-copy form matching the dimensions and style of the old legacy layouts they are familiar with. They can organize physically, then submit updates digitally when ready.
              </p>
            </div>
            
            <div className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-wider text-brand-teal bg-white dark:bg-white/5 border border-brand-teal/10 p-4 rounded-2xl w-fit">
              <ShieldCheck size={16} />
              Baking-in psychological safety for new users
            </div>
          </div>

          <div className="p-10 rounded-4xl bg-gray-900 text-white flex flex-col justify-center text-center space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-white/5 transform translate-x-4 -translate-y-4 pointer-events-none">
              <Printer size={180} />
            </div>
            <div className="mx-auto p-4 bg-white/10 rounded-2xl text-brand-orange w-fit">
              <Database size={28} />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-bold tracking-tight">Backup</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Manual backup and restore features were implemented to give users confidence that their data is safe and can be easily transferred if needed. This was crucial for building trust in a system replacing a physical notebook.
              </p>
            </div>
          </div>

        </section>

        {/* Dynamic Project Log Sync */}
        <ProjectUpdates projectId={project.id} />
      </div>
    </ProjectWrapper>
  );
}