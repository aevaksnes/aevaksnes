import { ArrowRight, Terminal } from "lucide-react";
import { Project } from "@/constants/projects";
import Link from "next/link";

export default function Project_M({ project }: { project: Project }) {
  return (
    <Link
      href={project.href}
      className="col-span-12 md:col-span-6 h-72 group relative bg-white dark:bg-white/5 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-lg hover:border-brand-teal p-8 flex flex-col transition-all duration-300 hover:scale-[1.01]"
    >

      <div className="flex flex-row items-start gap-6">
        <div className="shrink-0 w-14 h-14 rounded-2xl bg-brand-teal/20 text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-colors flex items-center justify-center">
          <Terminal size={28} className="text-brand-teal group-hover:text-white" />
        </div>

        <div className="flex flex-col">
          <h3 className="text-2xl font-bold text-brand-teal transition-colors mb-2">
            {project.title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>
      </div>

      <div className="mt-auto pt-6 flex justify-between items-center border-t border-white/20">
        <div className="flex flex-wrap gap-3">
          {project.tags.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] font-mono uppercase tracking-widest text-brand-teal/90">
              #{t}
            </span>
          ))}
        </div>
        <ArrowRight size={20} className="text-brand-teal opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}