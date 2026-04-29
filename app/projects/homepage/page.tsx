"use client";

import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Project } from "@/types/firebase_types";
import { ProjectWrapper } from "@/components/ProjectWrapper";
import { ProjectUpdates } from "@/components/ProjectUpdates";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Github, Zap, ShieldCheck, RefreshCw, Loader2, Layout } from "lucide-react";

export default function Homepage() {
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const q = query(collection(db, "projects"), where("title", "==", "My Homepage"));
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
            <div className="space-y-20">
                
                {/* Intro Section */}
                <section>
                    <h2 className="text-4xl md:text-5xl font-black mb-8 dark:text-white tracking-tighter italic">
                        A Continuous Evolution
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                        {project.description}
                    </p>
                </section>

                {/* The Great Migration - Visual Box */}
                <section className="bg-linear-to-br from-brand-purple/5 to-brand-teal/5 border border-gray-100 dark:border-white/10 rounded-4xl p-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-brand-purple/10 rounded-lg text-brand-purple">
                            <RefreshCw size={24} className="animate-spin-slow" />
                        </div>
                        <h3 className="text-2xl font-bold dark:text-white tracking-tight">The Architecture Shift</h3>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                        To unlock modern features like dynamic routing and image optimization, this site was migrated from a simple static setup to a full-scale <strong>Next.js</strong> application deployed on <strong>Vercel</strong>.
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-3 text-xs font-mono font-bold bg-white dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-100 dark:border-white/10 text-gray-400">
                            <Github size={16} /> GitHub Pages (Legacy)
                        </div>
                        <div className="h-px w-8 bg-gray-200 dark:bg-white/10 hidden sm:block" />
                        <div className="flex items-center gap-3 text-xs font-mono font-bold bg-brand-teal/10 text-brand-teal px-4 py-2 rounded-xl border border-brand-teal/20">
                            <Zap size={16} /> Vercel & Next.js (Current)
                        </div>
                    </div>
                </section>

                {/* Tech Highlights & Focus */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold dark:text-white tracking-tight">Technical Highlights</h3>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <div className="mt-1 p-1 bg-green-500/10 rounded text-green-500 shrink-0">
                                    <ShieldCheck size={18} />
                                </div>
                                <span className="text-gray-600 dark:text-gray-400">
                                    <strong>Secure & Modern:</strong> Maintained with the latest dependencies and zero known vulnerabilities.
                                </span>
                            </li>
                            <li className="flex gap-4">
                                <div className="mt-1 p-1 bg-brand-purple/10 rounded text-brand-purple shrink-0">
                                    <Layout size={18} />
                                </div>
                                <span className="text-gray-600 dark:text-gray-400">
                                    <strong>Bento Grid UX:</strong> Implementation of a responsive, custom-built grid system for project showcasing.
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="p-8 rounded-4xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                        <h3 className="text-xl font-bold mb-4 dark:text-white">Current Refinements</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                            Focus is currently on optimizing the <strong>Dark Mode</strong> experience and perfecting the 
                            transition animations. This portfolio serves as a living document of my return to 
                            full-stack development.
                        </p>
                    </div>
                </section>

                {/* Open Source CTA */}
                <section className="flex flex-col md:flex-row items-center gap-8 p-10 rounded-4xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 transition-all">
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-black tracking-tighter mb-2">Open Source</h3>
                        <p className="opacity-70 text-sm">Explore the source code and documentation on GitHub.</p>
                    </div>
                    <Link
                        href="https://github.com/aevaksnes"
                        target="_blank"
                        className="flex items-center gap-3 px-8 py-4 bg-white text-gray-900 dark:bg-gray-900 dark:text-white rounded-2xl font-bold transition-transform hover:scale-105 shadow-xl"
                    >
                        <Github size={20} />
                        View Repository
                    </Link>
                </section>

                {/* Project Log */}
                <ProjectUpdates projectId={project.id} />
            </div>
        </ProjectWrapper>
    );
}