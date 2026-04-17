import Image from "next/image";
import { Project } from "@/constants/projects";
import Link from "next/link";
import { FileCode2 } from "lucide-react";

export default function Project_L({ project }: { project: Project }) {
  return (
    <Link 
      href={project.href} 
      className="col-span-12 md:col-span-8 h-100 group relative overflow-hidden rounded-[2.5rem] border border-gray-100 dark:border-gray-800 hover:border-brand-orange/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] bg-white"
    >
      {/* Bakgrunnsbilde */}
      {project.image && project.size !== 'S' && (
        <Image 
          src={project.image} 
          unoptimized
          fill 
          alt={project.title}
          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
        />
      )}

      {/* IKONET: Plassert i øvre høyre hjørne */}
      <div className="absolute top-10 left-10 z-20">
        <div className="shrink-0 w-18 h-18 rounded-2xl bg-brand-orange/20 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors flex items-center justify-center">
           <FileCode2 size={32} className="text-brand-orange group-hover:text-white" />
        </div>
      </div>

      {/* Tekst-overlay i bunnen */}
      <div className="absolute inset-0 p-10 flex flex-col justify-end">
        <span className="text-brand-orange font-bold text-xs uppercase tracking-widest mb-3">
          Featured Project
        </span>
        <h3 className="text-4xl font-bold text-gray-900 mb-3 transition-colors group-hover:text-black">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-sm text-sm leading-relaxed">
          {project.description}
        </p>
      </div>
    </Link>
  );
}
