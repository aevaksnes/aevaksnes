import { PROJECTS } from "@/constants/projects";
import { ProjectWrapper } from "@/components/ProjectWrapper";
import { ProjectUpdates } from "@/components/ProjectUpdates";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Utensils, Database, WifiOff, Copy, Palette, ArrowRight } from "lucide-react";

export default function Mealplan() {

    const data = PROJECTS.find(p => p.id === "mealplan");
    if (!data) return notFound();

    return (
        <ProjectWrapper title={data.title} tags={data.tags}>

            <section className="prose dark:prose-invert max-w-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 dark:text-white flex items-center gap-3">
                            <Utensils className="text-brand-teal" /> Mealplan PWA
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                            {data.description}
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-white/10 shadow-sm">
                                <Database className="text-brand-purple shrink-0 mt-1" size={20} />
                                <div>
                                    <h4 className="font-bold mb-0">Firebase Integration</h4>
                                    <p className="text-sm text-gray-500 mb-0">Using Firestore for real-time sync, Storage for images, and Auth for private user accounts.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-white/10 shadow-sm">
                                <Copy className="text-brand-teal shrink-0 mt-1" size={20} />
                                <div>
                                    <h4 className="font-bold mb-0">Smart Copy Feature</h4>
                                    <p className="text-sm text-gray-500 mb-0">Built-in functionality to duplicate previous week's plans, making the user experience faster and easier.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Placeholder for bilde/logo */}
                    <div className="relative h-100 rounded-3xl overflow-hidden bg-gray-100 dark:bg-card-bg border border-white/10 flex flex-col items-center justify-center p-8 text-center">
                        <div className="w-32 h-32 rounded-[2.5rem] bg-brand-teal/20 flex items-center justify-center mb-6">
                            <Utensils size={64} className="text-brand-teal" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Mealplan Logo</h3>
                        <p className="text-sm text-gray-500 italic">"Currently iterating on the logo to improve color contrast and visual accessibility."</p>
                    </div>
                </div>

                {/* Roadmap / Next Steps */}
                <div className="bg-brand-purple/5 border border-brand-purple/10 rounded-4xl p-10 mb-16">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Palette className="text-brand-purple" size={24} />
                        Upcoming Enhancements
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 font-bold text-brand-purple">
                                <WifiOff size={18} />
                                Offline Capability
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">
                                Leveraging Firebase's native disk persistence to allow users to check their
                                shopping list and meal plans even in grocery stores with poor reception.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 font-bold text-brand-purple">
                                <Palette size={18} />
                                Visual Polish
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">
                                Redesigning the logo and color palette to ensure it meets WCAG contrast
                                standards, making the app accessible for all users.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <span className="px-4 py-1.5 rounded-full bg-green-500/10 text-green-500 text-sm font-medium border border-green-500/20">
                        Active Project
                    </span>
                    <span className="px-4 py-1.5 rounded-full bg-brand-teal/10 text-brand-teal text-sm font-medium border border-brand-teal/20">
                        PWA Ready
                    </span>
                </div>

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

            {/* Gets updates for 'mealplan' */}
            <ProjectUpdates projectId={data.id} />

        </ProjectWrapper>
    );
}