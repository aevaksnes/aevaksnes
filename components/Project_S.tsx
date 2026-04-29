import { Project } from "@/types/firebase_types";
import { Code, ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * Small-scale project card for the Bento grid.
 * Optimized for a 1/3 width layout on desktop.
 */
export default function Project_S({ project }: { project: Project }) {
  // Determine if we use a custom route or a dynamic project page
  const targetHref = project.href ? project.href : `/projects/${project.id}`;
  
  return (
    <Link 
      href={targetHref} 
      className="col-span-12 md:col-span-4 h-72 group relative flex flex-col justify-between p-8 rounded-4xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-xl hover:border-brand-purple/50 transition-all duration-500 hover:-translate-y-2"
    >
      <div>
        {/* Category Icon */}
        <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-all duration-300 flex items-center justify-center mb-6 shadow-sm">
           <Code size={24} />
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-brand-purple transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500 tracking-wider">
          Small scale project
        </span>
        <div className="p-2 rounded-full bg-brand-purple/10 text-brand-purple opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
          <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
}