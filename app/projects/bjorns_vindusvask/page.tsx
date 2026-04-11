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

            <section className="prose dark:prose-invert">
                <h2 className="text-2xl font-bold mb-2 dark:text-white">About this project</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">{data.description}</p>


                {/* Unique content for this project */}

                <h2 className="text-2xl font-bold mb-2 dark:text-white">Tech Stack</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">Bjørns Vindusvask was built using HTML and TailwindCSS.</p>
                
                <h2 className="text-2xl font-bold mb-2 dark:text-white">Status</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">Bjørns Vindusvask is currently online.</p>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">This website was the first thing I built that is live and it is clearly due for an update both in design and technology, but it does it's job well.</p>
                
                <Link href="https://bjornsvindusvask.no" className="text-brand-teal font-bold hover:underline">Visit the website</Link>

            </section>

            {/* Gets updates for 'braindump' */}
            <ProjectUpdates projectId={data.id} />

        </ProjectWrapper>
    );
}