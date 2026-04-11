import { PROJECTS } from "@/constants/projects";
import { ProjectWrapper } from "@/components/ProjectWrapper";
import { ProjectUpdates } from "@/components/ProjectUpdates";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function BjornsVindusvask() {

    const data = PROJECTS.find(p => p.id === "bjorns_vindusvask");
    if (!data) return notFound();

    return (
        <ProjectWrapper title={data.title} tags={data.tags}>

            <section className="prose dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4 dark:text-white">Legacy meets Code</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    {data.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10">
                        <h3 className="text-brand-teal dark:text-brand-teal/80 font-bold mb-2">The Mission</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Digitizing a 40-year-old family business with zero budget.
                            The goal was simple: Create a professional presence and a way for customers to get in touch.
                        </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-brand-purple/5 border border-brand-purple/10">
                        <h3 className="text-brand-purple font-bold mb-2">Key Learnings</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            First experience with <strong>TailwindCSS</strong> and <strong>Formspree</strong>.
                            Learned the importance of "shipping fast" over "perfecting code".
                        </p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-4 dark:text-white">The Tech Journey</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    This was the very first live project I built. At the time, I used a CDN-based Tailwind approach
                    combined with pure HTML. While it's not "best practice" by today's standards, it provided
                    immediate value to the business.
                </p>

                <blockquote className="border-l-4 border-brand-teal pl-4 italic my-8 text-gray-600 dark:text-gray-400">
                    "It's a working example of how technology, even in its simplest form, can transform a traditional local business."
                </blockquote>

                <div className="flex items-center gap-6 mt-12">
                    <Link
                        href="https://bjornsvindusvask.no"
                        target="_blank"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-brand-teal text-white font-bold hover:bg-opacity-90 transition-all"
                    >
                        Visit Live Site
                    </Link>
                    <span className="text-sm text-gray-500 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Actively serving customers
                    </span>
                </div>
            </section>

            {/* Gets updates for 'braindump' */}
            <ProjectUpdates projectId={data.id} />

        </ProjectWrapper>
    );
}