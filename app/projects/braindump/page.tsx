import { PROJECTS } from "@/constants/projects";
import { ProjectWrapper } from "@/components/ProjectWrapper";
import { ProjectUpdates } from "@/components/ProjectUpdates";
import { notFound } from "next/navigation";
import Image from "next/image";

export default function Braindump() {

    const data = PROJECTS.find(p => p.id === "braindump");
    if (!data) return notFound();

    return (
        <ProjectWrapper title={data.title} tags={data.tags}>

            <section className="prose dark:prose-invert">
                <h2 className="text-2xl font-bold mb-2 dark:text-white">About this project</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">{data.description}</p>


                {/* Unique content for this project */}
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">Braindump is a simple note-taking app, not necessarily to save data, but just to clear your mind. </p>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">That is why you can also use prompts to get your thoughts flowing.</p>
                
                <h2 className="text-2xl font-bold mb-2 dark:text-white">Tech Stack</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">Braindump was built using Flutter, Dart, and Firebase.</p>
                
                <h2 className="text-2xl font-bold mb-2 dark:text-white">Status</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">Braindump is currently in testing on Google Play. It is released as a PWA.</p>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">I still need testers to have it approved for release on the Google Play Store. If you are interested, please reach out.</p>

               
                
                <div className="relative h-100 w-full mt-4 rounded-3xl overflow-hidden bg-gray-100 dark:bg-white/5 border border-white/10 shadow-xl">
                    <Image src="/images/braindump_social_text.png" alt="Braindump Banner" fill unoptimized className="object-cover rounded-2xl" />
                </div>
            </section>

            {/* Gets updates for 'braindump' */}
            <ProjectUpdates projectId={data.id} />

        </ProjectWrapper>
    );
}