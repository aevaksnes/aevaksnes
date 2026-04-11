import { PROJECTS } from "@/constants/projects";
import { ProjectWrapper } from "@/components/ProjectWrapper";
import { ProjectUpdates } from "@/components/ProjectUpdates";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Github, Zap, ShieldCheck, RefreshCw } from "lucide-react";

export default function Homepage() {

    const data = PROJECTS.find(p => p.id === "homepage");
    if (!data) return notFound();

    return (
        <ProjectWrapper title={data.title} tags={data.tags}>

            <section className="prose dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4 dark:text-white">A Continuous Evolution</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    {data.description}
                </p>

                {/* Arkitektur-skifte-boks */}
                <div className="bg-linear-to-r from-brand-purple/5 to-brand-teal/5 border border-white/10 rounded-3xl p-8 mb-12">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <RefreshCw className="text-brand-purple animate-spin-slow" size={20} />
                        The Great Migration
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        This project recently underwent a major architectural shift. Originally built as a static site
                        for GitHub Pages, it was migrated to <strong>Next.js on Vercel</strong> to unlock full-stack
                        capabilities and superior image optimization.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex items-center gap-2 text-xs font-mono bg-white dark:bg-white/5 px-3 py-1 rounded-full border border-white/10">
                            <Github size={14} /> GitHub Pages (Old)
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono bg-brand-teal/20 text-brand-teal px-3 py-1 rounded-full border border-brand-teal/20">
                            <Zap size={14} /> Vercel (Current)
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div>
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">Technical Highlights</h2>
                        <ul className="space-y-4 list-none pl-0">
                            <li className="flex gap-3">
                                <ShieldCheck className="text-brand-teal shrink-0" size={20} />
                                <span><strong>Secure & Modern:</strong> Updated to the latest Next.js versions with zero vulnerabilities.</span>
                            </li>
                            <li className="flex gap-3">
                                <Zap className="text-brand-purple shrink-0" size={20} />
                                <span><strong>Performance:</strong> Leveraging Vercel's Edge Network for global speed.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-white/10">
                        <h3 className="text-lg font-bold mb-2">Current Focus</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Right now, I am refining the <strong>Bento-grid</strong> layout and perfecting the
                            dark mode experience. The content is added iteratively as I document my journey
                            back into full-time programming.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 p-8 rounded-3xl border border-dashed border-white/20">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">Open Source</h3>
                        <p className="text-sm text-gray-500 mb-0">You can follow the development and see the code on GitHub.</p>
                    </div>
                    <Link
                        href="https://github.com/aevaksnes"
                        target="_blank"
                        className="flex items-center gap-2 px-6 py-3 bg-black dark:bg-white dark:text-black text-white rounded-2xl font-bold transition-transform hover:scale-105"
                    >
                        <Github size={20} />
                        View Repository
                    </Link>
                </div>
            </section>

            {/* Gets updates for 'homepage' */}
            <ProjectUpdates projectId={data.id} />

        </ProjectWrapper>
    );
}