"use client";

import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Project } from "@/types/firebase_types";
import { ProjectWrapper } from "@/components/ProjectWrapper";
import { ProjectUpdates } from "@/components/ProjectUpdates";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Loader2,
  ShieldCheck,
  Mail,
  Zap,
  ExternalLink
} from "lucide-react";

export default function BjornsVindusvask() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const q = query(collection(db, "projects"), where("title", "==", "Bjørns Vindusvask Website"));
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
      <div className="space-y-24">

        {/* Intro - Professional & Down-to-earth */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6">
          {/* Subtitle / Focus Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-teal/10 text-brand-teal border border-brand-teal/20">
              Professional
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
              Down-to-earth
            </span>
            <span className="text-xs font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-2">
              Small Business
            </span>
          </div>

          {/* Punchy, Broken-up Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black dark:text-white tracking-tighter leading-tight max-w-3xl">
            Digital presence for a small business.
          </h2>

          {/* Body Copy */}
          <div className="space-y-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
            <p>
              This project illustrates my return to programming. It started as a simple static website built on a template I found online when I first explored GitHub Pages, and was recently rebuilt using <span className="text-brand-teal font-semibold">Next.js</span>.
            </p>
            <p>
              The website is for my husband&apos;s business, where I also manage the office operations, it serves as a tool to present our services and make reaching out easy for customers.
            </p>
          </div>
        </section>

        {/* Core Technical Upgrades */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-4xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm">
            <ShieldCheck className="text-green-500 mb-4" size={32} />
            <h4 className="font-bold text-lg mb-2">Bot Protection</h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Implemented a **Honeypot strategy** to mitigate spam bots without affecting the user experience.
            </p>
          </div>
          <div className="p-8 rounded-4xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm">
            <Mail className="text-brand-purple mb-4" size={32} />
            <h4 className="font-bold text-lg mb-2">Resend Integration</h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Custom-built contact handling using the **Resend API**.
            </p>
          </div>
          <div className="p-8 rounded-4xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm">
            <Zap className="text-brand-orange mb-4" size={32} />
            <h4 className="font-bold text-lg mb-2">Fast Performance</h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Optimized for speed and SEO, helping the business maintain its local search presence.
            </p>
          </div>
        </section>

        {/* Visual Showcase */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="relative aspect-16/10 rounded-4xl overflow-hidden border border-gray-100 dark:border-white/10 bg-gray-50 shadow-inner group">
              <Image
                src="/projects/bjornsvindusvask.png"
                alt="Desktop View"
                fill
                className="object-contain p-6 transition-transform group-hover:scale-105 duration-700"
              />
            </div>
            <p className="text-sm text-gray-500 font-medium italic px-4">Desktop</p>
          </div>

          <div className="space-y-6">
            <div className="relative aspect-16/10 rounded-4xl overflow-hidden border border-gray-100 dark:border-white/10 bg-gray-50 shadow-inner group">
              <Image
                src="/projects/bjornsvindusvask_mobile.png"
                alt="Mobile View"
                fill
                className="object-contain p-6 transition-transform group-hover:scale-105 duration-700"
              />
            </div>
            <p className="text-sm text-gray-500 font-medium italic px-4">Mobile</p>
          </div>
        </section>

        {/* Security Insight Box */}
        <section className="p-10 rounded-4xl bg-brand-teal/5 border border-brand-teal/10">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-brand-teal" size={24} />
            <h3 className="text-xl font-bold dark:text-white">The "Honeypot" Solution</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            To avoid spam, I implemented a hidden honeypot field. Bots automatically fill it out, allowing the system to silently reject the submission, while real humans never see the field.
          </p>
        </section>

        {/* Live Link Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link
            href="https://bjornsvindusvask.no"
            target="_blank"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-brand-teal text-white font-bold hover:bg-opacity-90 transition-all shadow-lg"
          >
            Visit Live Site <ExternalLink size={18} />
          </Link>
          <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Active project serving customers
          </div>
        </div>

        {/* Project Log */}
        <ProjectUpdates projectId={project.id} />
      </div>
    </ProjectWrapper>
  );
}