import { ArrowRight } from "lucide-react";
import { Project } from "@/constants/projects";
import Link from "next/link";

export default function Project_M({ project }: { project: Project }) {

  return (

   <Link href={project.href} className="col-span-12 md:col-span-6 h-75 group bg-white dark:bg-white/5 rounded-3xl border border-white/10 p-6 flex flex-col">
     {/* Innhold med bilde på siden eller lignende */}
     <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
     <p className="text-gray-400 mb-4">{project.description}</p>
     <div className="mt-auto flex justify-between items-center">
        <div className="flex gap-2">
           <span className="px-2 py-1 bg-brand-teal/20 text-brand-teal text-xs rounded">React Native</span>
        </div>
        <ArrowRight className="group-hover:translate-x-2 transition-transform" />
     </div>
  </Link>
  )

}