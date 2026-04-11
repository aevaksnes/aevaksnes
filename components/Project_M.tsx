import { ArrowRight, Terminal } from "lucide-react";
import { Project } from "@/constants/projects";
import Link from "next/link";
import Image from "next/image";

export default function Project_M({ project }: { project: Project }) {
  return (
    <Link
      href={project.href}
      className="col-span-12 md:col-span-6 h-80 group bg-linear-to-br from-brand-teal/40 to-transparent dark:bg-white/5 rounded-3xl border border-white/10 p-8 flex flex-col transition-all"
    >
      {/* Top section: Logo on the left, text on the right */}
      <div className="flex flex-row items-start gap-6 mb-6">

        <div className="text-brand-teal mb-4 transition-transform duration-700 group-hover:scale-110">
          <Terminal size={48} />
        </div>


        {/* Text*/}
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold text-brand-teal mb-2">
            {project.title}
          </h3>
          <p className="text-black/50 group-hover:text-black dark:group-hover:text-gray-300 transition-colors text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>
      </div>

      {/* Bunn-seksjon */}
      <div className="mt-auto pt-4 flex justify-between items-center border-t border-white/5">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="text-[10px] font-mono uppercase tracking-widest text-black/50 group-hover:text-black">
              #{t}
            </span>
          ))}
        </div>
        <ArrowRight className="group-hover:translate-x-2 transition-transform text-brand-teal" />
      </div>
    </Link>
  );
}