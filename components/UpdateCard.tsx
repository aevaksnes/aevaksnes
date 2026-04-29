"use client";

import { Update, UpdateCategory } from "@/types/firebase_types";
import { Calendar, Tag, ExternalLink } from "lucide-react";
import Image from "next/image";

const CATEGORY_STYLES: Record<UpdateCategory, string> = {
  feature: "bg-brand-purple",
  launch: "bg-brand-orange",
  fix: "bg-brand-teal",
  experiment: "bg-gray-500",
  content: "bg-brand-dark"
};

interface UpdateCardProps {
  update: Update;
  isLast: boolean;
  showProjectTitle?: boolean;
}

export function UpdateCard({ update, isLast, showProjectTitle }: UpdateCardProps) {
  return (
    <div className="flex gap-8 md:gap-12 group relative">
      
      {/* Timeline Column */}
      <div className="flex flex-col items-center shrink-0">
        {/* The Dot */}
        <div className={`
          w-6 h-6 rounded-full mt-1.5 z-10 
          border-[5px] border-white dark:border-brand-dark 
          shadow-md transition-all duration-500
          group-hover:scale-125 group-hover:shadow-lg
          ${CATEGORY_STYLES[update.category]}
        `} />
        
        {/* The vertical line */}
        {!isLast && (
          <div className="w-0.5 h-full bg-gray-100 dark:bg-white/5 my-2 rounded-full" />
        )}
      </div>

      {/* Content Column */}
      <div className="pb-20 flex-1 min-w-0">
        <header className="flex flex-wrap items-center gap-4 mb-4">
          <time className="flex items-center gap-2 font-mono text-xs font-bold text-gray-400">
            <Calendar size={14} />
            {new Date(update.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric"
            })}
          </time>

          {showProjectTitle && update.projectTitle && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-teal bg-brand-teal/5 px-2.5 py-1 rounded-lg border border-brand-teal/10">
              {update.projectTitle}
            </span>
          )}

          <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
            <Tag size={12} />
            {update.category}
          </span>
        </header>

        <h2 className="text-3xl font-black mb-4 dark:text-white tracking-tighter transition-colors group-hover:text-brand-purple">
          {update.title}
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
          {update.content}
        </p>

        {update.image && (
          <div className="mt-10 relative aspect-video max-w-md rounded-4xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-2xl bg-gray-50 dark:bg-white/5">
            <Image 
              src={update.image} 
              alt="" 
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105" 
            />
          </div>
        )}

        {update.links && update.links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-6">
            {update.links.map(link => (
              <a 
                key={link.url} 
                href={link.url} 
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-purple hover:text-brand-teal transition-all"
              >
                {link.label} <ExternalLink size={14} className="opacity-40" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}