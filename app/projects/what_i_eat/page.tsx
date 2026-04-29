"use client";

import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Project } from "@/types/firebase_types";
import { ProjectWrapper } from "@/components/ProjectWrapper";
import { ProjectUpdates } from "@/components/ProjectUpdates";
import { ProjectDownloads } from "@/components/ProjectDowloads";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Camera, Zap, Share2, Heart, Smartphone, Loader2, Target } from "lucide-react";

export default function WhatIEat() {
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const q = query(collection(db, "projects"), where("title", "==", "What_I_Eat"));
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
                
                {/* Hero Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="relative group order-2 md:order-1">
                        <div className="absolute -inset-1 bg-linear-to-r from-orange-400 to-yellow-500 rounded-4xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative aspect-square w-full rounded-4xl overflow-hidden bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-2xl flex items-center justify-center p-8">
                            <Image
                                src="/projects/What_I_Eat_Splash.png"
                                alt="What I Eat Brand Logo"
                                fill
                                className="object-contain p-12 transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                        </div>
                    </div>

                    <div className="order-1 md:order-2 space-y-8">
                        <h2 className="text-5xl font-black mb-6 dark:text-white tracking-tighter leading-tight">
                            Mindful Eating, <br />
                            <span className="text-orange-500 text-6xl">One Photo at a Time.</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                            What I Eat is a minimalist photo log designed to create a <span className="font-bold text-gray-900 dark:text-white">&quot;mindful pause&quot;</span> between the urge to eat and the action itself.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2 px-5 py-2.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-2xl text-sm font-bold border border-orange-500/10">
                                <Camera size={18} /> Instant Capture
                            </div>
                            <div className="flex items-center gap-2 px-5 py-2.5 bg-brand-purple/10 text-brand-purple rounded-2xl text-sm font-bold border border-brand-purple/10">
                                <Heart size={18} /> Behavior Focused
                            </div>
                        </div>
                    </div>
                </section>

                {/* The "Pause" Concept - Centered & Bold */}
                <section className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-4xl p-12 md:p-16 relative overflow-hidden">
                    <Target size={120} className="absolute -right-8 -bottom-8 opacity-5 text-gray-900 dark:text-white rotate-12" />
                    <div className="max-w-2xl">
                        <h3 className="text-3xl font-black mb-8 dark:text-white tracking-tight italic">
                            &quot;The Pause Effect&quot;
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-0">
                            The app is built around a single, friction-free workflow: <strong>Open → Shoot → Log</strong>. 
                            This interaction forces a moment of reflection: <em className="text-gray-900 dark:text-white">&quot;Am I eating because I&apos;m hungry, or is it something else?&quot;</em>. 
                            By creating a visual history, users get a non-judgmental view of their daily habits.
                        </p>
                    </div>
                </section>

                {/* Technical & Future grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold dark:text-white tracking-tight flex items-center gap-3">
                                <Zap className="text-yellow-500" /> Technical Core
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Developed with <strong>Flutter</strong> to ensure a high-performance camera integration and a smooth UI. The app currently functions as a private tool for real-world behavioral tracking.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold dark:text-white tracking-tight flex items-center gap-3">
                                <Share2 className="text-blue-500" /> Future: Visual Collages
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Currently developing a feature to generate &quot;What I Eat in a Day&quot; grid-collages, enabling one-click exports for personal reflection or social sharing.
                            </p>
                        </div>
                    </div>

                    {/* Status Card */}
                    <div className="p-10 rounded-4xl bg-brand-purple/5 border border-brand-purple/10 flex flex-col justify-center relative group">
                        <h4 className="font-mono text-xs font-bold text-brand-purple/60 uppercase tracking-[0.2em] mb-8">
                            Current Status
                        </h4>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group-hover:translate-x-1 transition-transform">
                                <div className="p-3 bg-white dark:bg-white/5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
                                    <Smartphone className="text-gray-400" size={24} />
                                </div>
                                <span className="font-medium text-gray-700 dark:text-gray-200 uppercase text-xs tracking-wider">APK Test Version</span>
                            </div>
                            <div className="flex items-center gap-4 group-hover:translate-x-1 transition-transform">
                                <div className="p-3 bg-white dark:bg-white/5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 relative">
                                    <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-white dark:border-brand-dark" />
                                    <Zap className="text-green-500" size={24} />
                                </div>
                                <span className="font-bold text-green-600 dark:text-green-400 uppercase text-xs tracking-wider">Active Daily Usage</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Resources and Updates */}
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