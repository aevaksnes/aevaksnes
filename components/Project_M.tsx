import { ArrowRight, Terminal } from "lucide-react";
import { Project } from "@/types/firebase_types";
import Link from "next/link";

/**
 * Medium-scale project card for the Bento grid.
 * Takes up half the width on desktop (6/12 columns).
 */
export default function Project_M({ project }: { project: Project }) {
  const targetHref = project.href ? project.href : `/projects/${project.id}`;

  return (
    <Link
      href={targetHref}
      className="col-span-12 md:col-span-6 h-80 group relative bg-white dark:bg-white/5 rounded-4xl border border-gray-100 dark:border-white/10 shadow-xl hover:border-brand-teal/50 p-8 flex flex-col transition-all duration-500 hover:-translate-y-2"
    >
      {/* Top Section: Icon, Title and Description */}
      <div className="flex flex-row items-start gap-6">
        {/* Animated Icon Box */}
        <div className="shrink-0 w-16 h-16 rounded-2xl bg-brand-teal/10 text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm">
          <Terminal size={32} />
        </div>

        <div className="flex flex-col min-w-0">
          <h3 className="text-2xl font-black text-gray-900 dark:text-white transition-colors group-hover:text-brand-teal mb-3 tracking-tighter">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-4">
            {project.description}
          </p>
        </div>
      </div>

      {/* Bottom Section: Tags and Action */}
      <div className="mt-auto pt-6 flex justify-between items-end">
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((t) => (
            <span 
              key={t} 
              className="px-3 py-1 rounded-lg bg-brand-teal/5 text-brand-teal text-[11px] font-bold font-mono tracking-tight"
            >
              #{t.toLowerCase()}
            </span>
          ))}
        </div>
        
        <div className="p-2.5 rounded-full bg-brand-teal/10 text-brand-teal opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 shadow-sm">
          <ArrowRight size={20} />
        </div>
      </div>
    </Link>
  );
}