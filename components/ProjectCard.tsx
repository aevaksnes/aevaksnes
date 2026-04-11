// /components/ProjectCard.tsx
import { Project } from "@/constants/projects";
import Project_S from "@/components/Project_S";
import Project_M from "@/components/Project_M";
import Project_L from "@/components/Project_L";

const components = {
  S: Project_S,
  M: Project_M,
  L: Project_L,
};

export default function ProjectCard({ project }: { project: Project }) {
  const Component = components[project.size];
  
  return <Component project={project} />;
}