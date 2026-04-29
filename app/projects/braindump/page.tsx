"use client";

import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Project } from "@/types/firebase_types";
import { ProjectWrapper } from "@/components/ProjectWrapper";
import { ProjectUpdates } from "@/components/ProjectUpdates";
import { ProjectDownloads } from "@/components/ProjectDowloads";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Smartphone, Layout, Apple, Loader2, Info } from "lucide-react";

export default function Braindump() {
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const q = query(collection(db, "projects"), where("title", "==", "Brain Dump"));
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

                {/* Hero Quote - Clean and Focused */}
                <section className="py-16 px-10 rounded-4xl bg-brand-teal/5 border border-brand-teal/10 text-center italic">
                    <p className="text-2xl md:text-3xl font-medium text-gray-800 dark:text-white leading-relaxed mb-0">
                        &quot;Don&apos;t save your thoughts. <span className="text-brand-teal">Set them free.</span>&quot;
                    </p>
                </section>

                {/* Concept & Features */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-black tracking-tighter dark:text-white">The Concept</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                            Braindump is a digital sanctuary designed for <strong>mental offloading</strong>.
                            Built to help users clear their minds, it focuses on the act of writing rather than the permanence of saving.
                        </p>

                        <div className="grid gap-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center shrink-0">
                                    <Sparkles className="text-brand-purple" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">Thought Prompts</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">Contextual cues designed to spark reflection and direct focus.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 flex items-center justify-center shrink-0">
                                    <Layout className="text-brand-teal" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">PWA Architecture</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">Built for speed and offline reliability across all mobile and desktop devices.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Media Showcase: Video & Screenshots */}
                    <section className="space-y-12">
                        <div className="text-center space-y-4">
                            <h3 className="text-3xl font-black tracking-tighter">App Showcase</h3>
                            <p className="text-gray-500 max-w-xl mx-auto">
                                Watch the official preview or explore the interface through the screenshots below.
                            </p>
                        </div>

                        {/* YouTube Video Embed */}
                        <div className="relative aspect-video w-full rounded-4xl overflow-hidden shadow-2xl border border-gray-100 dark:border-white/10 bg-gray-900">
                            <iframe
                                src="https://www.youtube.com/embed/8n8TU9or31E"
                                title="Brain Dump Preview"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                            />
                        </div>
                    </section>
                </section>

                <section className="space-y-12">
                    <div className="text-center">
                        <h3 className="text-2xl font-black tracking-tighter mb-2">Interface Gallery</h3>
                        <p className="text-gray-500">A closer look at the mindfulness-focused design.</p>
                    </div>

                    {/* Horizontal scrollbar */}
                    <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
                        {[1, 2, 3, 4].map((num) => (
                            <div
                                key={num}
                                className="relative flex-none w-32 md:w-48 aspect-9/19 rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 bg-gray-50 shadow-xl snap-center transition-transform hover:scale-[1.02] duration-500 cursor-zoom-in"
                                onClick={() => window.open(`/projects/braindump-screen-${num}.png`, '_blank')}
                            >
                                <Image
                                    src={`/projects/braindump-screen-${num}.png`}
                                    alt={`Screenshot ${num}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-xs text-gray-400 font-mono italic">
                        Tip: Click a screenshot to view it in full size.
                    </p>
                </section>

                {/* Roadmap */}
                <section className="space-y-10">
                    <h2 className="text-3xl font-black tracking-tighter dark:text-white">Project Status</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-8 rounded-4xl border border-gray-100 dark:border-white/5 bg-white dark:bg-white/5">
                            <div className="flex items-center gap-2 mb-4 text-brand-teal">
                                <Smartphone size={20} />
                                <span className="font-mono text-xs font-bold tracking-widest uppercase">Stage 1</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Closed testing on <strong>Google Play</strong> in progress.</p>
                        </div>

                        <div className="p-8 rounded-4xl border border-gray-100 dark:border-white/5 bg-white dark:bg-white/5">
                            <div className="flex items-center gap-2 mb-4 text-brand-teal">
                                <Smartphone size={20} />
                                <span className="font-mono text-xs font-bold tracking-widest uppercase">Stage 2</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Official release on the <strong>Google Play Store</strong> following the testing phase.</p>
                        </div>

                        <div className="p-8 rounded-4xl border border-gray-100 dark:border-white/5 bg-white/50 dark:bg-white/5 opacity-60">
                            <div className="flex items-center gap-2 mb-4 text-gray-400">
                                <Apple size={20} />
                                <span className="font-mono text-xs font-bold tracking-widest uppercase">Future</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Preparing for <strong>App Store</strong> submission and iOS-specific UI refinements.</p>
                        </div>
                    </div>
                </section>

                {/* Collaboration / Testing CTA */}
                <section className="p-10 md:p-16 rounded-4xl bg-brand-teal text-white shadow-2xl shadow-brand-teal/20 text-center">
                    <h3 className="text-3xl font-black tracking-tighter mb-4">Want to participate?</h3>
                    <p className="text-lg opacity-90 max-w-2xl mx-auto mb-10 leading-relaxed">
                        I am currently looking for testers for the Android version. If you are
                        interested in mindfulness and early-access software, I would love to hear from you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="mailto:developing.aevaksnes@gmail.com" className="px-8 py-4 bg-white text-brand-teal font-bold rounded-2xl hover:scale-105 transition-transform shadow-lg">
                            Join Testing Phase
                        </a>
                        <Link href="#" className="px-8 py-4 bg-brand-dark/20 backdrop-blur-md text-white border border-white/20 font-bold rounded-2xl hover:bg-brand-dark/30 transition-all">
                            Try Web Version
                        </Link>
                    </div>
                </section>

                {/* Technical Support: Prompts */}
                <section className="p-10 rounded-4xl bg-brand-orange/5 border border-brand-orange/10 flex flex-col lg:flex-row gap-12">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-6 text-brand-orange">
                            <Info size={24} />
                            <h3 className="text-xl font-bold dark:text-white">How to import prompts</h3>
                        </div>
                        <ol className="space-y-4 text-gray-600 dark:text-gray-400 list-decimal list-inside font-medium leading-relaxed">
                            <li>Download the prompt file from the resources section below.</li>
                            <li>Open the <span className="text-brand-orange">Brain Dump</span> app and navigate to Settings.</li>
                            <li>Select &quot;Import Prompts&quot; and choose the downloaded file.</li>
                        </ol>
                    </div>

                    <div className="w-full lg:w-72 shrink-0">
                        <ProjectDownloads projectId={project.id} />
                    </div>
                </section>

                <ProjectUpdates projectId={project.id} />
            </div>
        </ProjectWrapper>
    );
}