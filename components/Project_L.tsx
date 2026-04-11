import Image from "next/image";
import { Project } from "@/constants/projects";
import Link from "next/link";

export default function Project_L({ project }: { project: Project }) {

  return (

    <Link href={project.href} className="col-span-12 md:col-span-8 h-100 group relative overflow-hidden rounded-3xl border border-white/10 bg-brand-dark">
      {project.image && project.size !== 'S' && (
        <Image 
          src={project.image} 
          unoptimized
          fill 
          alt={project.title}
          className="object-cover transition-transform duration-700 group-hover:scale-105" 
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-brand-dark via-brand-dark/20 to-transparent p-8 flex flex-col justify-end">
        <span className="text-brand-orange font-bold text-sm uppercase mb-2">Featured Project</span>
        <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-300 max-w-md">{project.description}</p>
      </div>
    </Link>
  )

}