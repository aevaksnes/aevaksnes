import { TAGS } from "./tags";

export type ProjectSize = 'L' | 'M' | 'S';

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string; // Optional, for projects that have an associated image
  tags: string[];
  href: string;
  size: ProjectSize;
}

export const PROJECTS: Project[] = [
  {
    id: "braindump",
    title: "Brain Dump",
    description: "An app developed for Google Play and as a PWA, designed to help users gets thoughts out of their head and find clarity and peace of mind.", 
    image: "projects/braindump_project.png",
    tags: [TAGS.FLUTTER, TAGS.DART, TAGS.FIREBASE, TAGS.PLAYSTORE, TAGS.PWA],
    href: "/projects/braindump",
    size: "L",
  },
  {
    id: "bjorns_vindusvask",
    title: "Bjørns Vindusvask Website",
    description: "A simple, clean website for a local window cleaning business, showcasing their services and allowing customers to easily get in touch.",
    tags: [TAGS.HTML, TAGS.TAILWIND],
    href: "/projects/bjorns_vindusvask",
    size: "S",
  },
  {
    id: "homepage",
    title: "My Homepage",
    description: "This very website! Built with Next.js and Tailwind CSS, it's a personal portfolio showcasing my projects and skills as a developer.",
    tags: [TAGS.NEXTJS, TAGS.REACT, TAGS.TAILWIND, TAGS.UI_DESIGN],
    href: "/projects/homepage",
    size: "S",
  },
  {
    id: "4",
    title: "Meal Plan",  
    description: "A PWA designed to help users plan their meals for the week, create shopping lists, and discover new recipes based on their dietary preferences and restrictions.",
    tags: [TAGS.PWA, TAGS.REACT, TAGS.JAVASCRIPT],
    href: "/projects/mealplan",
    size: "M",

  },
  {
    id: "5",
    title: "Shared Kitchen",  
    description: "A mobile app designed to connect people who want to share kitchen space and resources, fostering a sense of community and collaboration.",
    tags: [TAGS.FLUTTER, TAGS.DART, TAGS.FIREBASE],
    href: "/projects/shared_kitchen",
    size: "L",
  },

  
];