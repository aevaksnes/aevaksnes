"use client";

import LinkNext from "next/link";
import { Rss, FileCode2, Tags, FileDown, PlusCircle } from "lucide-react"; 

export default function AdminDashboard() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header - Compact and professional */}
      <header className="mb-10 pl-2">
        <h1 className="text-3xl font-black dark:text-white tracking-tight mb-1">
          Workspace
        </h1>
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400">
          Portfolio Management System
        </p>
      </header>

      {/* Control Grid - Using Brand Colors */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <AdminCard 
          href="/admin/updates"
          title="Updates"
          description="Log work progress"
          icon={<Rss size={28} />}
          theme="purple"
        />

        <AdminCard 
          href="/admin/projects"
          title="Projects"
          description="Manage showcase projects"
          icon={<FileCode2 size={28} />}
          theme="teal"
        />

        <AdminCard 
          href="/admin/downloads"
          title="Downloads"
          description="Manage assets and files"
          icon={<FileDown size={28} />}
          theme="orange"
        />

        <AdminCard 
          href="/admin/tags"
          title="Tags"
          description="Organize tech stacks"
          icon={<Tags size={28} />}
          theme="gray"
        />

      </section>

      {/* Background decoration - very subtle */}
      <div className="mt-20 pt-10 border-t border-gray-100 dark:border-white/5 flex justify-center">
         <p className="text-[10px] font-mono text-gray-300 uppercase tracking-[0.5em]">
           Authorized Access Only
         </p>
      </div>
    </div>
  );
}

function AdminCard({ href, title, description, icon, theme }: { 
  href: string, 
  title: string, 
  description: string, 
  icon: React.ReactNode,
  theme: "purple" | "teal" | "orange" | "gray"
}) {
  // Mapping your specific brand colors
  const styles = {
    purple: "bg-brand-purple/5 border-brand-purple/10 text-brand-purple hover:bg-brand-purple/10",
    teal: "bg-brand-teal/5 border-brand-teal/10 text-brand-teal hover:bg-brand-teal/10",
    orange: "bg-brand-orange/5 border-brand-orange/10 text-brand-orange hover:bg-brand-orange/10",
    gray: "bg-gray-500/5 border-gray-500/10 text-gray-500 hover:bg-gray-500/10",
  };

  return (
    <LinkNext 
      href={href} 
      className={`
        ${styles[theme]}
        p-8 rounded-4xl border-2
        shadow-sm transition-all duration-300 group 
        hover:-translate-y-2 hover:shadow-xl hover:border-opacity-50
        flex flex-col items-start text-left
      `}
    >
      <div className="p-3 bg-white dark:bg-white/10 rounded-2xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-black tracking-tighter mb-1 uppercase">
        {title}
      </h3>
      <p className="text-[10px] opacity-70 leading-relaxed font-bold uppercase tracking-widest">
        {description}
      </p>
    </LinkNext>
  );
}