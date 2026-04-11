import { Project } from "@/constants/projects";
import { Code } from "lucide-react";
import Link from "next/link";

export default function Project_S({ project }: { project: Project }) {

  return (

  <Link href={project.href} className="col-span-12 md:col-span-4 h-100 p-8 rounded-3xl border border-white/10 bg-brand-purple/10 flex flex-col justify-center items-center text-center">
    <div className="text-brand-purple mb-4">
       <Code size={48} />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
    <p className="text-sm text-gray-400">{project.description}</p>
  </Link>
  )

}