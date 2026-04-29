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
    id: "bjorns_vindusvask",
    title: "Bjørns Vindusvask Website",
    description: "A simple, clean website for a local window cleaning business, showcasing their services and allowing customers to easily get in touch.",
    tags: [TAGS.HTML, TAGS.TAILWIND],
    href: "/projects/bjorns_vindusvask",
    size: "S",
  },
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
    id: "what_i_eat",
    title: "What_I_Eat",
    description: "An photo logging app for tracking what you eat.",
    tags: [TAGS.FLUTTER, TAGS.DART, TAGS.FIREBASE],
    href: "/projects/what_i_eat",
    size: "M",
  },
  {
    id: "mealplan",
    title: "Meal Plan",
    description: "A PWA designed to help users plan their meals for the week",
    tags: [TAGS.PWA, TAGS.FLUTTER, TAGS.DART, TAGS.FIREBASE],
    href: "/projects/mealplan",
    size: "M",

  },
  {
    id: "shared_kitchen",
    title: "Shared Kitchen",
    description: "A PWA designed to connect people who want to share recipes, cooking tips, and meal ideas in a collaborative online space.",
    image: "projects/shared_kitchen_project_v2.png",
    tags: [TAGS.PWA, TAGS.FLUTTER, TAGS.DART, TAGS.FIREBASE],
    href: "/projects/shared_kitchen",
    size: "L",
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
    id: "next",
    title: "Next",
    description: "A gamified planning app, integrated with Google Tasks.",
    tags: [TAGS.FLUTTER, TAGS.DART, TAGS.FIREBASE],
    href: "/projects/next",
    size: "M",
  },

  {
    id: "ankeras",
    title: "Anker AS Website",
    description: "A website for a garage, that deals with tires, wheels, car rentals, car sales, batteries and more, with a content management system.",
    image: "projects/ankeras_project.png",
    tags: [TAGS.NEXTJS, TAGS.REACT, TAGS.TAILWIND, TAGS.UI_DESIGN],
    href: "/projects/ankeras",
    size: "L",
  },


];