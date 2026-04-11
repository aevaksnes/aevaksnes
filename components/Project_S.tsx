import { Project } from "@/constants/projects";
import { Code } from "lucide-react";
import Link from "next/link";

export default function Project_S({ project }: { project: Project }) {

  return (

  <Link href={project.href} className="col-span-12 md:col-span-4 h-75 p-8 rounded-3xl border border-white/10 bg-linear-to-br from-brand-purple/40 to-transparent flex flex-col justify-center items-center text-center transition-all hover:bg-white group">
    <div className="text-brand-purple mb-4 transition-transform duration-700 group-hover:scale-110">
       <Code size={48} />
    </div>
    <h3 className="text-xl font-bold text-brand-purple mb-2">{project.title}</h3>
    <p className="text-sm text-black/50 group-hover:text-black dark:group-hover:text-gray-300 transition-colors">{project.description}</p>
  </Link>
  )

}