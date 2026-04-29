"use client";

import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Project } from "@/types/firebase_types";
import { ProjectWrapper } from "@/components/ProjectWrapper";
import { ProjectUpdates } from "@/components/ProjectUpdates";
import { ProjectDownloads } from "@/components/ProjectDowloads";
import { notFound } from "next/navigation";
import { 
  ListTodo, 
  Award, 
  Smartphone, 
  Zap, 
  RefreshCcw, 
  ExternalLink, 
  Loader2,
  Code2
} from "lucide-react";

export default function NextProject() {
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const q = query(collection(db, "projects"), where("title", "==", "Next"));
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
                
                {/* Hero Section - The Philosophy */}
                <section>
                    <div className="mb-12 p-12 rounded-4xl bg-linear-to-br from-brand-purple/10 to-brand-teal/5 border border-white/10 shadow-sm relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-3xl md:text-4xl font-black dark:text-white mb-6 tracking-tighter leading-tight">
                                &quot;Being all over the place is just untapped potential.&quot;
                            </p>
                            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                                Next is a productivity tool built for those who love to plan but hate being locked down. 
                                It focuses on <strong>optionality</strong>—allowing you to choose tasks based on energy and mood.
                            </p>
                        </div>
                        <ListTodo size={120} className="absolute -right-8 -bottom-8 opacity-5 text-brand-purple rotate-12" />
                    </div>
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Key Features */}
                    <div className="space-y-8">
                        <h3 className="text-3xl font-black tracking-tighter dark:text-white">Core Mechanics</h3>
                        
                        <div className="space-y-4">
                            <div className="flex gap-5 p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                <div className="p-3 bg-brand-teal/10 rounded-2xl text-brand-teal shrink-0 h-fit">
                                    <RefreshCcw size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1 dark:text-white">Smart Intervals</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        Tasks reappear based on custom intervals, keeping projects on track without the stress of rigid deadlines.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-5 p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                <div className="p-3 bg-yellow-500/10 rounded-2xl text-yellow-500 shrink-0 h-fit">
                                    <Award size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1 dark:text-white">Gamified Progress</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        Earn points for every completed task, rewarding consistency across both local tasks and synced Google objectives.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Google Tasks API Deep Dive */}
                    <div className="p-10 rounded-4xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-inner">
                        <div className="flex items-center gap-3 mb-8">
                            <Code2 className="text-blue-500" size={24} />
                            <h3 className="text-xl font-bold dark:text-white tracking-tight">API Integration</h3>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            The core challenge was syncing with the <strong>Google Tasks API</strong>. Since the API lacks native interval-logic, I developed a custom bridge to handle state:
                        </p>

                        <div className="space-y-4 font-mono text-[11px]">
                            <div className="p-4 bg-white dark:bg-black/30 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                                <div className="flex justify-between mb-2">
                                    <span className="text-brand-purple font-bold">GET</span>
                                    <span className="text-gray-400">/tasks/v1/lists/id</span>
                                </div>
                                <p className="text-gray-500">Retrieves daily objectives and cross-references completion status.</p>
                            </div>
                            <div className="p-4 bg-white dark:bg-black/30 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                                <div className="flex justify-between mb-2">
                                    <span className="text-brand-teal font-bold">POST</span>
                                    <span className="text-gray-400">/tasks/v1/lists/id</span>
                                </div>
                                <p className="text-gray-500">Exports &quot;Next&quot; items to the Google ecosystem for cloud access.</p>
                            </div>
                        </div>

                        <div className="mt-8 flex items-start gap-3 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                            <Zap size={16} className="text-yellow-500 shrink-0 mt-0.5" />
                            <p className="text-[11px] text-gray-500 italic leading-snug">
                                Points are awarded automatically upon background sync if a task is verified as &quot;Done&quot; in the Google cloud.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Technical Overview Section */}
                <section className="p-10 md:p-16 rounded-4xl bg-gray-900 text-white dark:bg-white dark:text-gray-900">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] mb-6 opacity-60">Tech Stack</h4>
                            <div className="flex flex-wrap gap-3">
                                {["Flutter", "Google API", "Firebase", "Dart"].map(tech => (
                                    <span key={tech} className="px-4 py-2 bg-white/10 dark:bg-gray-100 rounded-xl text-sm font-bold border border-white/10 dark:border-gray-200">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] mb-6 opacity-60">Deployment</h4>
                            <div className="flex items-center gap-4 text-xl font-black tracking-tighter">
                                <Smartphone size={28} className="text-brand-teal" />
                                Android (Private APK)
                            </div>
                        </div>
                   </div>
                </section>

                {/* Resources & Logs */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2">
                        <ProjectUpdates projectId={project.id} />
                    </div>
                    <aside>
                        <ProjectDownloads projectId={project.id} />
                    </aside>
                </div>

            </div>
        </ProjectWrapper>
    );
}