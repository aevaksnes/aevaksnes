import { PROJECTS } from "@/constants/projects";
import { ProjectWrapper } from "@/components/ProjectWrapper";
import { ProjectUpdates } from "@/components/ProjectUpdates";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Sparkles, Smartphone, Layout, Apple, ArrowRight } from "lucide-react";

export default function Braindump() {

    const data = PROJECTS.find(p => p.id === "braindump");
    if (!data) return notFound();

    return (
        <ProjectWrapper title={data.title} tags={data.tags}>

            <section className="prose dark:prose-invert max-w-none">
                {/* Hero Quote */}
                <div className="mb-16 p-10 rounded-[2.5rem] bg-brand-teal/10 border border-white/5 text-center">
                    <p className="text-2xl md:text-3xl font-serif italic dark:text-white mb-0 leading-relaxed">
                        "Don't save your thoughts. <span className="text-brand-teal">Set them free.</span>"
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 dark:text-white">The Concept</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                            Braindump isn't for hoarding information. It's a digital sanctuary
                            designed for <strong>mental offloading</strong>. Built to help users clear their
                            minds, focusing on the process of writing rather than the result of saving.
                        </p>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center shrink-0">
                                    <Sparkles className="text-brand-purple" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1 dark:text-white">Thought Prompts</h4>
                                    <p className="text-sm text-gray-500">Cues to spark reflection and direct your thoughts.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 flex items-center justify-center shrink-0">
                                    <Layout className="text-brand-teal" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1 dark:text-white">PWA Architecture</h4>
                                    <p className="text-sm text-gray-500">Fast, installable, and works offline across all devices.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bildet med mer luft (contain) */}
                    <div className="relative h-50 rounded-[3rem] overflow-hidden bg-gray-50 dark:bg-white/5 border border-white/10 shadow-2xl p-8">
                        <Image
                            src="/images/braindump_social_text.png"
                            alt="Braindump Interface"
                            fill
                            className="object-contain p-4" 
                            unoptimized
                        />
                    </div>
                </div>

                {/* Roadmap*/}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold mb-8 dark:text-white">The Roadmap</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
                            <div className="flex items-center gap-2 mb-4 text-brand-teal">
                                <Smartphone size={20} />
                                <span className="font-bold uppercase text-xs tracking-widest">Next</span>
                            </div>
                            <p className="text-sm dark:text-gray-300">Finalizing closed testing on <strong>Google Play</strong> with 20 dedicated testers.</p>
                        </div>

                        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 opacity-60">
                            <div className="flex items-center gap-2 mb-4 text-gray-400">
                                <Apple size={20} />
                                <span className="font-bold uppercase text-xs tracking-widest">Future</span>
                            </div>
                            <p className="text-sm dark:text-gray-300">Preparing for <strong>App Store</strong> submission and iOS-specific UI refinements.</p>
                        </div>

                    </div>
                </div>

                {/* Call to Action: Testers */}
                <div className="p-10 rounded-[2.5rem] bg-brand-teal/50 text-white text-center shadow-2xl shadow-brand-teal/20">
                    <h3 className="text-2xl font-bold mb-4">Want to help me launch?</h3>
                    <p className="max-w-xl mx-auto mb-8">
                        I'm currently looking for 20 testers for the Android version. If you're
                        interested in mindfulness and early-access software, let's talk.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="mailto:din@epost.no" className="px-8 py-4 bg-white text-brand-teal font-bold rounded-2xl hover:bg-gray-100 transition-all">
                            Become a Tester
                        </a>
                        <a href="#" className="px-8 py-4 bg-black/20 backdrop-blur-md text-white border border-white/20 font-bold rounded-2xl hover:bg-black/30 transition-all">
                            Try PWA Version
                        </a>
                    </div>
                </div>
            </section>

            {/* Gets updates for 'bjorns_vindusvask' */}
            <ProjectUpdates projectId={data.id} />

        </ProjectWrapper>
    );
}