import { PROJECTS } from "@/constants/projects";
import { ProjectWrapper } from "@/components/ProjectWrapper";
import { ProjectUpdates } from "@/components/ProjectUpdates";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Utensils, Database, WifiOff, Copy, Palette, ArrowRight, CheckCircle2 } from "lucide-react"; // La til CheckCircle2

export default function Mealplan() {
    const data = PROJECTS.find(p => p.id === "mealplan");
    if (!data) return notFound();

    return (
        <ProjectWrapper title={data.title} tags={data.tags}>
            <section className="prose dark:prose-invert max-w-none">

                {/* Title and description */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 dark:text-white flex items-center gap-3">
                        <Utensils className="text-brand-teal" /> Mealplan PWA
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                        {data.description}
                    </p>
                </div>
g
                {/* Grid with features and logo comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">

                    {/* Features */}
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-white/10 shadow-sm">
                            <WifiOff className="text-brand-teal shrink-0 mt-1" size={20} />
                            <div>
                                <h4 className="font-bold mb-0">Offline Capability</h4>
                                <p className="text-sm text-gray-500 mb-0">Powered by Firebase disk persistence. Access recipes even without internet.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-white/10 shadow-sm">
                            <Database className="text-brand-purple shrink-0 mt-1" size={20} />
                            <div>
                                <h4 className="font-bold mb-0">Firebase Integration</h4>
                                <p className="text-sm text-gray-500 mb-0">Real-time sync, Storage for images, and private user accounts.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-white/10 shadow-sm">
                            <Copy className="text-brand-teal shrink-0 mt-1" size={20} />
                            <div>
                                <h4 className="font-bold mb-0">Smart Copy Feature</h4>
                                <p className="text-sm text-gray-500 mb-0">Built-in functionality to duplicate previous week's plans easily.</p>
                            </div>
                        </div>
                    </div>

                    {/* Logo comparison */}
                    <div className="relative rounded-3xl overflow-hidden bg-gray-50 dark:bg-white/5 border border-white/10 p-8 flex flex-col h-full justify-between">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 rounded-2xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center mb-3">
                                    <img src="/projects/mealplan_logo.png" alt="Old" className="w-14 h-14 object-contain" />
                                </div>
                                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Original</span>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 rounded-2xl bg-white dark:bg-gray-800 shadow-md flex items-center justify-center mb-3 border-2 border-brand-teal/30">
                                    <img src="/projects/mealplan_logo_new.png" alt="New" className="w-14 h-14 object-contain" />
                                </div>
                                <span className="text-[10px] uppercase tracking-widest text-brand-teal font-bold">Improved</span>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <h3 className="text-lg font-bold mb-1">Visual Accessibility</h3>
                            <p className="text-xs text-gray-500 italic mb-0">
                                "Enhanced contrast ratios for better visibility in different lighting conditions."
                            </p>
                        </div>
                    </div>
                </div>

                {/* Roadmap */}
                <div className="bg-brand-purple/5 border border-brand-purple/10 rounded-4xl p-10 mb-16">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <CheckCircle2 className="text-brand-purple" size={24} />
                        Recent Enhancements & Next Steps
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3 opacity-60"> {/* Use opacity to indicate completion */}
                            <div className="flex items-center gap-2 font-bold text-gray-500 line-through">
                                <WifiOff size={18} />
                                Offline Capability
                            </div>
                            <p className="text-gray-500 dark:text-gray-500">
                                Native disk persistence is now fully implemented.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 font-bold text-brand-purple">
                                <Palette size={18} />
                                Visual Polish
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">
                                The logo is done, but I am still fine-tuning the UI components to ensure full WCAG AA compliance across the whole app.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <span className="px-4 py-1.5 rounded-full bg-green-500/10 text-green-500 text-sm font-medium border border-green-500/20">
                        Active Project
                    </span>
                    <span className="px-4 py-1.5 rounded-full bg-brand-teal/10 text-brand-teal text-sm font-medium border border-brand-teal/20">
                        Offline Ready
                    </span>
                </div>

                {/* Try the Web App */}
                <div className="flex flex-col sm:flex-row items-center gap-6 mt-12 p-8 rounded-3xl bg-brand-teal/5 border border-brand-teal/10">
                    <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-xl font-bold mb-1">Try the Web App</h3>
                        <p className="text-sm text-gray-500 mb-0">Experience the PWA directly in your browser via Firebase Hosting.</p>
                    </div>
                    <Link
                        href="https://aevaksnes-mealplan.web.app"
                        target="_blank"
                        className="flex items-center gap-2 px-8 py-4 bg-brand-teal text-white rounded-2xl font-bold transition-transform hover:scale-105 shadow-lg shadow-brand-teal/20"
                    >
                        Open Mealplan
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            <ProjectUpdates projectId={data.id} />
        </ProjectWrapper>
    );
}