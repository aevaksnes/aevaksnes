import { Project } from "@/constants/projects";
import { Code, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Project_S({ project }: { project: Project }) {
  return (
    <Link 
      href={project.href} 
      className="col-span-12 md:col-span-4 h-64 group relative flex flex-col justify-between p-8 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-gray-800 shadow-lg hover:border-brand-purple transition-all duration-300 hover:scale-[1.02]"
    >
      <div>
        <div className="w-10 h-10 rounded-xl bg-brand-purple/20 text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-colors flex items-center justify-center mb-6">
           <Code size={20} className="text-brand-purple group-hover:text-white" />
        </div>
        <h3 className="text-xl font-bold text-brand-purple mb-2">{project.title}</h3>
        <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[9px] font-mono text-white/50 uppercase tracking-[0.2em]">Small Scale</span>
        <ArrowRight size={16} className="text-brand-purple opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}

