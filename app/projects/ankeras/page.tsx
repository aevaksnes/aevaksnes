import { PROJECTS } from "@/constants/projects";
import { ProjectWrapper } from "@/components/ProjectWrapper";
import { ProjectUpdates } from "@/components/ProjectUpdates";
import { notFound } from "next/navigation";
import { 
  Image as LucideImage, 
  ChevronsLeftRightEllipsis, 
  FileText, 
  Settings, 
  Car, 
  Key, 
  Database 
} from "lucide-react";

export default function AnkerAS() {
  const data = PROJECTS.find(p => p.id === "ankeras");
  if (!data) return notFound();

  return (
    <ProjectWrapper title={data.title} tags={data.tags}>
      <section className="prose dark:prose-invert max-w-none">
        
        {/* Intro med litt mer "punch" */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-4 dark:text-white tracking-tight">Digital Overhaul for a Family Legacy</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Transforming a "patchwork" legacy site into a high-performance business tool. 
            Built for a garage where <strong>expertise in mechanics</strong> meets a need for <strong>digital simplicity</strong>.
          </p>
        </div>

        {/* Feature Grid - Viser hva CMS-en faktisk gjør */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-white/10 shadow-sm">
            <Car className="text-brand-teal mb-3" size={28} />
            <h4 className="font-bold mb-1">Inventory Management</h4>
            <p className="text-sm text-gray-500">Custom modules for car sales and rentals with real-time updates.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-white/10 shadow-sm">
            <Settings className="text-brand-purple mb-3" size={28} />
            <h4 className="font-bold mb-1">Easy Admin</h4>
            <p className="text-sm text-gray-500">A tailored CMS where the owner can update opening hours and news in seconds.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-white/10 shadow-sm">
            <Database className="text-blue-500 mb-3" size={28} />
            <h4 className="font-bold mb-1">Firebase Backend</h4>
            <p className="text-sm text-gray-500">Secure data handling for business-critical information.</p>
          </div>
        </div>

        {/* Misjon og Læring i "Bento"-stil */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="p-8 rounded-3xl bg-brand-teal/5 border border-brand-teal/10">
            <h3 className="text-brand-teal font-bold mb-4">The Challenge</h3>
            <p className="text-gray-600 dark:text-gray-400">
              The goal was to replace an outdated, hard-to-maintain site with a modern solution 
              that the family could manage themselves. No tech jargon, just a tool that works 
              as reliably as a well-serviced engine.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-brand-purple/5 border border-brand-purple/10">
            <h3 className="text-brand-purple font-bold mb-4">Development Insights</h3>
            <p className="text-gray-600 dark:text-gray-400">
              My first deep dive into <strong>Next.js</strong>. I focused on building a 
              custom-fit CMS rather than using a bloated off-the-shelf solution, 
              ensuring maximum speed and ease of use.
            </p>
          </div>
        </div>

        {/* Roadmap - Bruker dine steg, men med litt mer luft */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold mb-8 dark:text-white">The Roadmap to Launch</h2>
          <div className="relative border-l border-white/10 ml-4 pl-8 space-y-12">
            <div className="relative">
              <div className="absolute -left-10.25 top-1 w-4 h-4 rounded-full bg-brand-teal border-4 border-gray-900" />
              <h4 className="font-bold text-brand-teal">Phase 1: Documentation</h4>
              <p className="text-sm text-gray-500">Finalizing comments, Readme, and internal documentation for the handover.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-10.25 top-1 w-4 h-4 rounded-full bg-brand-teal border-4 border-gray-900" />
              <h4 className="font-bold text-brand-teal">Phase 2: Content Migration</h4>
              <p className="text-sm text-gray-500">Collaborating with the client to populate the database with real car listings and tires.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-10.25 top-1 w-4 h-4 rounded-full bg-gray-600 border-4 border-gray-900" />
              <h4 className="font-bold text-gray-500">Phase 3: Production Push</h4>
              <p className="text-sm text-gray-500">Moving the site from the staging environment to the official company domain.</p>
            </div>
          </div>
        </div>

        <blockquote className="border-l-4 border-brand-teal pl-6 italic my-12 text-xl text-gray-600 dark:text-gray-300">
          "Technology should empower small businesses, not complicate them."
        </blockquote>

      </section>

      <ProjectUpdates projectId={data.id} />
    </ProjectWrapper>
  );
}