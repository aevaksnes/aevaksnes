"use client";

import Image from "next/image";
import { Project } from "@/types/firebase_types";
import Link from "next/link";
import { FileCode2, ArrowRight } from "lucide-react";

/**
 * Large-scale project card (Featured).
 * Optimized to showcase an app screenshot on a clean background.
 */
export default function Project_L({ project }: { project: Project }) {
  const targetHref = project.href ? project.href : `/projects/${project.id}`;

  return (
    <Link
      href={targetHref}
      // Vi bruker flex-row her for å splitte teksten og bildet
      className="col-span-12 md:col-span-10 xl:col-span-8 group relative overflow-hidden rounded-4xl border border-gray-100 dark:border-white/10 shadow-xl hover:border-brand-orange/50 transition-all duration-700 hover:-translate-y-2 bg-white dark:bg-brand-dark flex flex-col md:flex-row items-center"
    >
      
      {/* 1. Tekst-delen (Venstre side) */}
      <div className="flex-1 p-10 md:p-14 z-20 flex flex-col justify-center h-full">
        {/* Featured Label */}
        <div className="flex items-center gap-3 text-brand-orange mb-6">
          <FileCode2 size={20} />
          <span className="font-mono text-sm font-bold tracking-wider opacity-80">Featured Project</span>
        </div>

        {/* Title & Description */}
        <h3 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter transition-colors group-hover:text-brand-orange">
          {project.title}
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md leading-relaxed mb-10 line-clamp-3">
          {project.description}
        </p>

        {/* Action Button */}
        <div className="inline-flex items-center gap-2 text-brand-orange font-bold text-sm bg-brand-orange/10 px-5 py-2.5 rounded-full w-fit group-hover:bg-brand-orange group-hover:text-white transition-all">
          Explore {project.title} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* 2. Bildet av appen (Høyre side - Svevende) */}
      {project.image && (
        <div className="flex-1 w-full h-full relative p-10 flex items-center justify-center">
          
          {/* En subtil farge-blob bak telefonen for dybde (Valgfritt, men stilig) */}
          <div className="absolute -inset-10 bg-brand-orange/10 dark:bg-brand-orange/5 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition duration-1000"></div>

          <div className="relative aspect-9/18.5 w-[80%] max-w-70 z-10 transition-transform duration-1000 group-hover:scale-105 group-hover:rotate-1">
            <Image
              src={project.image}
              fill
              alt={project.title}
              // Vi bruker 'contain' for å vise HELE telefonen/screenshot-en
              className="object-contain" 
            />
          </div>
        </div>
      )}

    </Link>
  );
}