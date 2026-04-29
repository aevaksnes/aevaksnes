import { Project } from "@/types/firebase_types";
import Project_S from "@/components/Project_S";
import Project_M from "@/components/Project_M";
import Project_L from "@/components/Project_L";

/**
 * Maps project sizes (S, M, L) to their respective Bento grid components.
 */
const components = {
  S: Project_S,
  M: Project_M,
  L: Project_L,
};

export default function ProjectCard({ project }: { project: Project }) {
  // Select the component based on size, defaulting to Project_S if size is missing or invalid
  const Component = components[project.size] || Project_S;
  
  return (
    <div className="contents">
      <Component project={project} />
    </div>
  );
}