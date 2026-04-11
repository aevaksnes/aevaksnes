import { PROJECTS } from "@/constants/projects";
import { ProjectWrapper } from "@/components/ProjectWrapper";
import { ProjectUpdates } from "@/components/ProjectUpdates";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Camera, Zap, Share2, Heart, Smartphone } from "lucide-react";

export default function WhatIEat() {

    const data = PROJECTS.find(p => p.id === "what_i_eat");
    if (!data) return notFound();

    return (
        <ProjectWrapper title={data.title} tags={data.tags}>

            <section className="prose dark:prose-invert max-w-none">
                {/* Hero / Logo Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-linear-to-r from-orange-400 to-yellow-500 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative h-100 w-full rounded-[2.5rem] overflow-hidden bg-white border border-white/10 shadow-2xl flex items-center justify-center p-12">
                            <Image
                                src="/projects/What_I_Eat_Splash.png"
                                alt="What I Eat Logo"
                                fill
                                className="object-contain p-8"
                            />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-4xl font-bold mb-6 dark:text-white leading-tight">
                            Mindful Eating, <br />
                            <span className="text-orange-500">One Photo at a Time.</span>
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                            What I Eat is a minimalist photo log designed to create a "mindful pause"
                            between the urge to eat and the action itself. It’s not about counting calories;
                            it’s about awareness.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-xl text-sm font-bold">
                                <Camera size={16} /> Instant Capture
                            </span>
                            <span className="flex items-center gap-2 px-4 py-2 bg-brand-purple/10 text-brand-purple rounded-xl text-sm font-bold">
                                <Heart size={16} /> Behavior Focused
                            </span>
                        </div>
                    </div>
                </div>

                {/* The "Pause" Concept */}
                <div className="bg-gray-50 dark:bg-white/5 border border-white/10 rounded-[2.5rem] p-10 mb-20">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 italic">
                        "The Pause Effect"
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-0">
                        The app is built around a single, fast workflow: <strong>Open → Shoot → Log</strong>.
                        This brief interaction forces a moment of reflection: <em>"Am I eating because I'm hungry,
                            or is it something else?"</em>. By making the log a visual history, users get a
                        honest, non-judgmental view of their daily habits.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div>
                        <h3 className="text-2xl font-bold mb-4 dark:text-white flex items-center gap-2">
                            <Zap className="text-yellow-500" /> Technical Implementation
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Developed with <strong>Flutter</strong> to ensure a high-performance camera
                            integration and a smooth UI. The app currently lives as a private APK,
                            serving as a personal tool for behavioral tracking.
                        </p>

                        <h3 className="text-2xl font-bold mb-4 dark:text-white flex items-center gap-2 mt-10">
                            <Share2 className="text-blue-500" /> The Future: Collages
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            I am currently working on a feature to generate "What I Eat in a Day"
                            grid-collages, making it easy to share a daily overview on social media
                            with one click.
                        </p>
                    </div>

                    <div className="p-8 rounded-3xl bg-brand-purple/5 border border-brand-purple/10 flex flex-col justify-center">
                        <h4 className="font-bold text-brand-purple mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
                            Current Status
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Smartphone className="text-gray-400" />
                                <span className="text-sm">Personal APK Deployment</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-sm font-medium">Active daily usage</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Gets updates for 'what_i_eat' */}
            <ProjectUpdates projectId={data.id} />

        </ProjectWrapper>
    );
}