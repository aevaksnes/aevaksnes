
import { PROJECTS } from "@/constants/projects";
import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
  return (
    <div className="max-w-7xl mx-auto py-20 px-4">
      <div className="grid grid-cols-12 gap-6">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
