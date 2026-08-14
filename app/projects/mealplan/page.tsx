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
    Utensils,
    Database,
    WifiOff,
    Copy,
    Palette,
    ArrowRight,
    CheckCircle2,
    Loader2,
    Smartphone
} from "lucide-react";

export default function Mealplan() {
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const q = query(collection(db, "projects"), where("title", "==", "Meal Plan"));
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

                {/* 1. Intro Section */}
                <section>
                    <h2 className="text-4xl md:text-5xl font-black mb-8 dark:text-white tracking-tighter">
                        Simplified Weekly Planning
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                        {project.description}
                    </p>
                </section>

                {/* 2. Visual Showcase - The Interface */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative aspect-9/16 w-full max-w-75 mx-auto rounded-4xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-2xl bg-gray-50">
                        <Image
                            src="/projects/mealplan.png"
                            alt="Mealplan Interface"
                            fill
                            className="object-contain p-4"
                        />
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold tracking-tight dark:text-white">Built for the kitchen</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Make your plans where you are. Get access when you need it. 
                            Add the information you need for when you are shopping and for when you are cooking.
                        </p>
                        <div className="flex gap-4">
                            <div className="p-3 bg-brand-teal/10 rounded-2xl text-brand-teal"><Smartphone size={24} /></div>
                            <div className="p-3 bg-brand-purple/10 rounded-2xl text-brand-purple"><WifiOff size={24} /></div>
                        </div>
                    </div>
                </section>

                {/* 3. Core Features Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        {[
                            { icon: <WifiOff />, title: "Offline Capability", desc: "Powered by Firebase disk persistence. Access recipes even without internet." },
                            { icon: <Database />, title: "Firebase Integration", desc: "Real-time sync, Storage for images, and private user accounts." },
                            { icon: <Copy />, title: "Smart Copy Feature", desc: "Easily duplicate previous week's plans to save time." }
                        ].map((feature, i) => (
                            <div key={i} className="flex items-start gap-4 p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm">
                                <div className="text-brand-teal mt-1">{feature.icon}</div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">{feature.title}</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Logo Evolution */}
                    <div className="rounded-4xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 p-10 flex flex-col justify-between">
                        <div className="flex justify-around items-center mb-8">
                            <div className="text-center space-y-3">
                                <div className="w-20 h-20 rounded-2xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center mx-auto">
                                    <img src="/projects/mealplan_logo.png" alt="Old" className="w-12 h-12 opacity-40" />
                                </div>
                                <span className="text-[10px] font-mono font-bold text-gray-400 tracking-widest uppercase">Legacy</span>
                            </div>
                            <ArrowRight className="text-gray-300" />
                            <div className="text-center space-y-3">
                                <div className="w-20 h-20 rounded-2xl bg-white dark:bg-gray-800 shadow-md flex items-center justify-center mx-auto border-2 border-brand-teal/30">
                                    <img src="/projects/mealplan_logo_new.png" alt="New" className="w-12 h-12" />
                                </div>
                                <span className="text-[10px] font-mono font-bold text-brand-teal tracking-widest uppercase">Refined</span>
                            </div>
                        </div>
                        <div className="text-center pt-6 border-t border-gray-200 dark:border-white/5">
                            <h4 className="font-bold mb-1">Visual Accessibility</h4>
                            <p className="text-xs text-gray-500 italic">Enhanced contrast ratios for better visibility in varying light conditions.</p>
                        </div>
                    </div>
                </section>

                {/* 4. Roadmap / Status */}
                <section className="bg-brand-purple/5 border border-brand-purple/10 rounded-4xl p-10">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <CheckCircle2 className="text-brand-purple" size={24} />
                        Recent Enhancements
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 font-bold text-brand-purple text-lg">
                                <WifiOff size={18} /> Offline Persistence
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Native disk persistence is now fully implemented across all modules.</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 font-bold text-brand-purple text-lg">
                                <Palette size={18} /> Visual Clarity
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                I am currently fine-tuning the UI to ensure maximum readability.
                                This involves testing high-contrast color palettes and font sizes that make
                                the app easy to use in a busy kitchen environment.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 5. Direct Link / CTA */}
                <section className="flex flex-col md:flex-row items-center gap-8 p-10 rounded-4xl bg-brand-teal/5 border border-brand-teal/10">
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-black tracking-tighter mb-2">Try the Web App</h3>
                        <p className="text-gray-500 text-sm">Experience the PWA directly in your browser via Firebase Hosting.</p>
                    </div>
                    <Link
                        href="https://aevaksnes-mealplan.web.app"
                        target="_blank"
                        className="flex items-center gap-3 px-10 py-5 bg-brand-teal text-white rounded-2xl font-bold transition-transform hover:scale-105 shadow-xl shadow-brand-teal/20"
                    >
                        Launch Mealplan <ArrowRight size={20} />
                    </Link>
                </section>

                <ProjectUpdates projectId={project.id} />
            </div>
        </ProjectWrapper>
    );
}