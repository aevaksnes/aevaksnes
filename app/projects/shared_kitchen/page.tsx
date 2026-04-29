"use client";

import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Project } from "@/types/firebase_types";
import { ProjectWrapper } from "@/components/ProjectWrapper";
import { ProjectUpdates } from "@/components/ProjectUpdates";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  Users, 
  Bell, 
  MessageSquare, 
  Cloud, 
  Loader2, 
  Link as LinkIcon, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function SharedKitchen() {
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const q = query(collection(db, "projects"), where("title", "==", "Shared Kitchen"));
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

    if (loading) return <div className="flex justify-center py-24"><Loader2 className="animate-spin text-orange-500" size={40} /></div>;
    if (!project) return notFound();

    return (
        <ProjectWrapper title={project.title} tags={project.tags}>
            <div className="space-y-24">
                
                {/* Intro Section - The Digital Hearth */}
                <section>
                    <div className="p-12 rounded-4xl bg-linear-to-br from-orange-500/10 to-brand-purple/10 border border-white/10 shadow-sm">
                        <h2 className="text-4xl md:text-5xl font-black mb-8 dark:text-white tracking-tighter">
                            The Digital Hearth
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                            Shared Kitchen is a social platform built for collaborative culinary inspiration. 
                            By creating private &quot;kitchens&quot;, families and roommates can build a 
                            shared library of recipes and tips in real-time.
                        </p>
                    </div>
                </section>

                {/* Features & Backend Logic Grid */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-8">
                        <h3 className="text-3xl font-black tracking-tighter dark:text-white">Community Features</h3>
                        <div className="space-y-4">
                            <div className="flex gap-5 p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500 shrink-0 h-fit">
                                    <MessageSquare size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1 dark:text-white">Interactive Socializing</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        Threaded comment systems allow users to engage with recipes through tips, questions, and shared experiences.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-5 p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500 shrink-0 h-fit">
                                    <LinkIcon size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1 dark:text-white">Smart Link Previews</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        Metadata scraping for external recipe links, creating a visual and rich content library effortlessly.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Backend Deep Dive */}
                    <div className="p-10 rounded-4xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                        <div className="flex items-center gap-3 mb-6">
                            <Cloud className="text-brand-purple" size={24} />
                            <h3 className="text-xl font-bold dark:text-white tracking-tight">Cloud Infrastructure</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 italic">
                            &quot;This project pushed me to implement logic beyond the client-side, utilizing the full Firebase ecosystem.&quot;
                        </p>
                        <div className="p-6 rounded-2xl bg-white dark:bg-black/30 border border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-2 text-brand-purple font-bold text-sm mb-3">
                                <Bell size={18} /> Cloud Functions
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Custom Node.js triggers monitor Firestore events to dispatch **Push Notifications** automatically when group members share new content or comments.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Workflow Section */}
                <section>
                    <h3 className="text-3xl font-black tracking-tighter dark:text-white mb-12 text-center">How it works</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { step: "01", title: "Create", desc: "Start a private kitchen and generate a unique invite code.", color: "text-orange-500" },
                            { step: "02", title: "Invite", desc: "Share the code with friends or family to grant secure access.", color: "text-brand-purple" },
                            { step: "03", title: "Share", desc: "Everyone stays synchronized through real-time database updates.", color: "text-brand-teal" }
                        ].map((item, i) => (
                            <div key={i} className="text-center group">
                                <div className={`text-4xl font-black ${item.color} mb-4 transition-transform group-hover:scale-110 duration-300`}>
                                    {item.step}
                                </div>
                                <h4 className="font-bold text-xl mb-3 dark:text-white">{item.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Technical Complexity Callout */}
                <section className="p-10 rounded-4xl border border-dashed border-orange-500/30 bg-orange-500/5">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        <div className="p-4 bg-orange-500/10 rounded-2xl text-orange-500">
                            <ShieldCheck size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-4 tracking-tight">Technical Complexity</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Building this app required advanced management of **Group-Based Access Control** in Firestore. 
                                Ensuring that only invited members could read or write to specific kitchen collections was a 
                                critical exercise in backend security and data modeling.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Main Action / Launch Section */}
                <section className="flex flex-col items-center p-12 rounded-4xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-orange-500 via-brand-purple to-brand-teal" />
                    
                    <div className="mb-8 w-20 h-20 rounded-3xl bg-orange-500/10 flex items-center justify-center">
                        <Users className="text-orange-500" size={40} />
                    </div>

                    <h3 className="text-3xl font-black mb-4 text-center tracking-tighter dark:text-white">Ready to cook together?</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-center max-w-lg mb-10 text-lg">
                        The app is live and fully functional. Create your own private kitchen or join an existing one to start sharing.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
                        <Link
                            href="https://aevaksnes-shared-kitchen.web.app"
                            target="_blank"
                            className="flex items-center justify-center gap-3 px-10 py-5 bg-orange-500 text-white rounded-2xl font-bold transition-all hover:scale-105 hover:bg-orange-600 shadow-xl shadow-orange-500/30"
                        >
                            Open Shared Kitchen
                            <ArrowRight size={20} />
                        </Link>
                    </div>

                    <p className="mt-8 text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-gray-400">
                        Built with Flutter & Firebase Hosting
                    </p>
                </section>

                {/* Project Log */}
                <ProjectUpdates projectId={project.id} />
            </div>
        </ProjectWrapper>
    );
}