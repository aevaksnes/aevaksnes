import { PROJECTS } from "@/constants/projects";
import { ProjectWrapper } from "@/components/ProjectWrapper";
import { ProjectUpdates } from "@/components/ProjectUpdates";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function Homepage() {

    const data = PROJECTS.find(p => p.id === "homepage");
    if (!data) return notFound();

    return (
        <ProjectWrapper title={data.title} tags={data.tags}>

            <section className="prose dark:prose-invert">
                <h2 className="text-2xl font-bold mb-2 dark:text-white">About this project</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">{data.description}</p>


                {/* Unique content for this project */}

                <h2 className="text-2xl font-bold mb-2 dark:text-white">Tech Stack</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">The homepage was built using Next.js and TailwindCSS.</p>

                <h2 className="text-2xl font-bold mb-2 dark:text-white">Status</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">The homepage is currently online.</p>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">It is still very much a work in progress. Not entirely sure about the design, and I am still adding content.</p>
                
                <Link href="https://aevaksnes.github.io" className="text-brand-teal font-bold hover:underline">Visit the website</Link>

            </section>

            {/* Gets updates for 'homepage' */}
            <ProjectUpdates projectId={data.id} />

        </ProjectWrapper>
    );
}