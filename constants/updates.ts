import { TAGS } from "./tags";

export type UpdateCategory = 'feature' | 'launch' | 'fix' | 'experiment';

export const CATEGORY_STYLES: Record<UpdateCategory, string> = {
  feature: "bg-brand-purple text-white shadow-[0_0_10px_rgba(138,43,226,0.4)]",
  launch: "bg-brand-orange text-white shadow-[0_0_10px_rgba(255,127,36,0.4)]",
  fix: "bg-brand-teal text-white shadow-[0_0_10px_rgba(0,128,128,0.4)]",
  experiment: "bg-gray-500 text-white shadow-[0_0_10px_rgba(107,114,128,0.4)]",
};

export interface Update {
  id: string;
  date: string; // f.eks. "2026-04-10"
  title: string;
  content: string;
  category: UpdateCategory;
  image?: string; 
  links?: { label: string; url: string }[];
  projectId?: string; 
  tags: string[];
}

export const UPDATES: Update[] = [
  {
    id: "1",
    date: "2026-04-10",
    title: "My Homepage Update Page Added",
    content: "Added a new page to my homepage where I will post updates about my projects, new features, bug fixes, and other news related to my work as a developer. This allows visitors to stay informed about the latest developments and improvements across all my projects.",
    category: "feature",
    links: [{ label: "View Updates", url: "https://aevaksnes.github.io/updates" }],
    tags: [TAGS.NEXTJS]
  },
  {
    id: "2",
    date: "2026-04-10",
    title: "My Homepage Download Page Added",
    content: "Added a new page to my homepage where JSON files for my braindump prompts are available for download.",
    category: "feature",
    links: [{ label: "View Downloads", url: "https://aevaksnes.github.io/downloads" }],
    tags: [TAGS.NEXTJS]
  },

];