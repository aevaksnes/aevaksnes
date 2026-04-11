import { PROJECTS } from "@/constants/projects";
import { ProjectWrapper } from "@/components/ProjectWrapper";
import { ProjectUpdates } from "@/components/ProjectUpdates";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ListTodo, Award, Smartphone, Zap, RefreshCcw, ExternalLink } from "lucide-react";

export default function Next() {

    const data = PROJECTS.find(p => p.id === "next");
    if (!data) return notFound();

    return (
        <ProjectWrapper title={data.title} tags={data.tags}>

            <section className="prose dark:prose-invert max-w-none">
                {/* Hero Section */}
                <div className="mb-16 p-10 rounded-[2.5rem] bg-linear-to-br from-brand-purple/2 to-transparent border border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-brand-purple flex items-center justify-center text-white shadow-lg shadow-brand-purple/20">
                            <ListTodo size={28} />
                        </div>
                        <h2 className="text-3xl font-bold m-0 dark:text-white">Next</h2>
                    </div>
                    <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed italic">
                        "Because being 'all over the place' is just untapped potential."
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div>
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">The Philosophy</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                            Next is a productivity tool built for those who love to plan but hate to be locked down.
                            It focuses on <strong>optionality</strong>—allowing you to choose from a curated list
                            of recurring tasks and projects based on your current energy and mood.
                        </p>

                        <div className="space-y-4">
                            <div className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-white/10">
                                <RefreshCcw className="text-brand-teal shrink-0" size={24} />
                                <div>
                                    <h4 className="font-bold mb-1">Smart Intervals</h4>
                                    <p className="text-sm text-gray-500">Tasks reappear at the top of your list based on custom intervals, ensuring your home and projects stay on track without rigid scheduling.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-white/10">
                                <Award className="text-yellow-500 shrink-0" size={24} />
                                <div>
                                    <h4 className="font-bold mb-1">Gamified Progress</h4>
                                    <p className="text-sm text-gray-500">Earn points for every task completed, whether it's through the app directly or synced from Google Tasks.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Google Tasks API - Teknisk dypdykk */}
                    <div className="p-8 rounded-3xl bg-gray-50 dark:bg-card-bg border border-white/10 shadow-inner">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <ExternalLink className="text-blue-500" size={20} /> Google Ecosystem
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                            The most challenging part of this project was the integration with the <strong>Google Tasks API</strong>.
                            Since the API has limitations (like missing time-specific stamps), I built a custom sync-logic:
                        </p>

                        <div className="space-y-3 font-mono text-xs">
                            <div className="p-3 bg-white dark:bg-black/20 rounded-xl border border-white/5">
                                <span className="text-brand-purple">GET</span> /tasks/v1/lists/id/tasks
                                <p className="mt-1 text-gray-500">Fetch daily objectives and sync completion status.</p>
                            </div>
                            <div className="p-3 bg-white dark:bg-black/20 rounded-xl border border-white/5">
                                <span className="text-brand-teal">POST</span> /tasks/v1/lists/id/tasks
                                <p className="mt-1 text-gray-500">Export selected "Next" tasks into the Google ecosystem for on-the-go access.</p>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center gap-2 text-xs text-gray-500 italic">
                            <Zap size={14} className="text-yellow-500" />
                            Points are awarded automatically upon sync if a task is marked done in Google.
                        </div>
                    </div>
                </div>

                {/* Status & Tech */}
                <div className="flex flex-wrap gap-8 py-8 border-y border-white/10">
                    <div>
                        <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Tech Stack</h4>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-brand-purple/10 text-brand-purple rounded-lg text-xs font-mono">Flutter</span>
                            <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-lg text-xs font-mono">Google Tasks API</span>
                            <span className="px-3 py-1 bg-brand-teal/10 text-brand-teal rounded-lg text-xs font-mono">Firebase</span>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Platform</h4>
                        <div className="flex gap-2 text-sm dark:text-white">
                            <Smartphone size={18} /> Android (Private APK)
                        </div>
                    </div>
                </div>
            </section>

            {/* Gets updates for 'next' */}
            <ProjectUpdates projectId={data.id} />

        </ProjectWrapper>
    );
}