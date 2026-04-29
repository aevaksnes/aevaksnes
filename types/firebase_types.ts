/**
 * Represents the different types of updates for a project.
 */
export type UpdateCategory = 'feature' | 'launch' | 'fix' | 'experiment' | 'content';

/**
 * Bento grid sizes: S (1 col), M (2 cols), L (3/full width).
 */
export type ProjectSize = 'L' | 'M' | 'S';

/**
 * Categories for downloadable resources.
 */
export type DownloadCategory = 'prompt' | 'guide' | 'template' | 'program';

/**
 * Main project structure stored in Firestore.
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  href?: string; // Optional: used for custom-designed project pages
  size: ProjectSize;
  order: number;
}

/**
 * Log entries/updates related to a project or general progress.
 */
export interface Update {
  id: string;
  date: string; // ISO format (YYYY-MM-DD)
  title: string;
  content: string;
  category: UpdateCategory;
  image?: string;
  links?: { label: string; url: string }[];
  projectId?: string;
  projectTitle?: string;
  tags: string[];
}

/**
 * Files stored in Firebase Storage and tracked in Firestore.
 */
export interface DownloadableFile {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileName: string;
  category: DownloadCategory;
  size: string; // Formatted size string (e.g., "1.2 MB")
  dateAdded: string;
  projectId?: string;
  projectTitle?: string;
}