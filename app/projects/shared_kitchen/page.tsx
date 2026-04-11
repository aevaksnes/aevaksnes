import { PROJECTS } from "@/constants/projects";
import { ProjectWrapper } from "@/components/ProjectWrapper";
import { ProjectUpdates } from "@/components/ProjectUpdates";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Users, Bell, MessageSquare, Cloud, Image as ImageIcon, Link as LinkIcon, ArrowRight } from "lucide-react";

export default function SharedKitchen() {

    const data = PROJECTS.find(p => p.id === "shared_kitchen");
    if (!data) return notFound();

    return (
        <ProjectWrapper title={data.title} tags={data.tags}>

            <section className="prose dark:prose-invert max-w-none">
                {/* Header med fokus på samarbeid */}
                <div className="mb-16 p-10 rounded-[2.5rem] bg-linear-to-br from-orange-500/10 to-brand-purple/10 border border-white/5">
                    <h2 className="text-3xl font-bold mb-4 dark:text-white">The Digital Hearth</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        Shared Kitchen is more than just a recipe book; it's a social platform for families,
                        roommates, and foodies. By creating private "kitchens", users can build a
                        collaborative library of culinary inspiration.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div>
                        <h2 className="text-2xl font-bold mb-6 dark:text-white flex items-center gap-2">
                            <Users className="text-orange-500" size={24} /> Community Features
                        </h2>
                        <ul className="space-y-6 list-none pl-0">
                            <li className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                                    <MessageSquare className="text-orange-500" size={20} />
                                </div>
                                <div>
                                    <strong>Interactive Socializing:</strong> Post recipes, tips, or links, and engage with others through a threaded comment system.
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                                    <LinkIcon className="text-blue-500" size={20} />
                                </div>
                                <div>
                                    <strong>Rich Content:</strong> Support for high-quality image uploads and smart link previews for external recipes.
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Teknisk boks - Cloud Functions */}
                    <div className="p-8 rounded-3xl bg-gray-50 dark:bg-white/5 border border-white/10 shadow-inner">
                        <h2 className="text-2xl font-bold mb-6 dark:text-white flex items-center gap-2">
                            <Cloud className="text-brand-purple" size={24} /> Backend Logic
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 italic">
                            "This project allowed me to dive deep into the Firebase ecosystem beyond simple data storage."
                        </p>
                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-white dark:bg-black/20 border border-white/5">
                                <div className="flex items-center gap-2 text-brand-purple font-bold text-sm mb-1">
                                    <Bell size={16} /> Cloud Functions
                                </div>
                                <p className="text-xs text-gray-500">
                                    Custom Node.js triggers that monitor Firestore and automatically dispatch
                                    Push Notifications to group members whenever new content is shared.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Prosess-seksjon */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold mb-6 dark:text-white">How it works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="p-6">
                            <div className="text-3xl font-bold text-orange-500 mb-2">01</div>
                            <h4 className="font-bold mb-2">Create</h4>
                            <p className="text-sm text-gray-500">Start your own kitchen and get a unique invite code.</p>
                        </div>
                        <div className="p-6">
                            <div className="text-3xl font-bold text-brand-purple mb-2">02</div>
                            <h4 className="font-bold mb-2">Invite</h4>
                            <p className="text-sm text-gray-500">Friends join your kitchen to see and share posts.</p>
                        </div>
                        <div className="p-6">
                            <div className="text-3xl font-bold text-brand-teal mb-2">03</div>
                            <h4 className="font-bold mb-2">Share</h4>
                            <p className="text-sm text-gray-500">Everyone stays updated through real-time notifications.</p>
                        </div>
                    </div>
                </div>

                {/* Footer med call-to-action */}
                <div className="p-8 rounded-3xl border border-dashed border-orange-500/30 flex flex-col md:flex-row items-center gap-8 bg-orange-500/5">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">Technical Complexity</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-0">
                            Shared Kitchen tested my ability to manage complex state in Flutter,
                            handle secure group-based access in Firestore, and automate workflows with backend functions.
                        </p>
                    </div>

                </div>
                {/* Live Link Section */}
                <div className="mt-16 flex flex-col items-center p-10 rounded-[2.5rem] bg-white dark:bg-white/5 border border-white/10 shadow-2xl">
                    <div className="mb-6 w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center">
                        <Users className="text-orange-500" size={32} />
                    </div>

                    <h3 className="text-2xl font-bold mb-2 text-center">Ready to cook together?</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-8">
                        The app is live and fully functional. Create your own private kitchen or join one with an invite code.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <Link
                            href="https://aevaksnes-shared-kitchen.web.app"
                            target="_blank"
                            className="flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-2xl font-bold transition-all hover:scale-105 hover:bg-orange-600 shadow-lg shadow-orange-500/20"
                        >
                            Open Shared Kitchen
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                    <p className="mt-6 text-[10px] uppercase tracking-widest text-gray-500 font-mono">
                        Built with Flutter & Firebase Hosting
                    </p>
                </div>
            </section>
            {/* Gets updates for 'shared_kitchen' */}
            <ProjectUpdates projectId={data.id} />

        </ProjectWrapper>
    );
}