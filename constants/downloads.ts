
export interface DownloadableFile {
    id: string;
    title: string;
    description: string;
    filename: string;
    category: 'prompt' | 'guide' | 'template';
    size: string;
    dateAdded: string; // YYYY-MM-DD
}

export const DOWNLOADS: DownloadableFile[] = [
    {
        id: "1",
        title: "AM Reflection",
        description: "Questions for the morning reflection.",
        filename: "AM Reflections.json",
        category: "prompt",
        size: "1 KB",
        dateAdded: "2026-04-10"
    },
    {
        id: "2",
        title: "Maintaining results and feeling safe in freedom",
        description: "A set of questions to help you feel safe when you have achieved your goals and are in a good place, to help you maintain your results and continue to thrive.",
        filename: "Maintaining results and feeling safe in freedom.json",
        category: "prompt",
        size: "1 KB",
        dateAdded: "2026-04-10"
    },
    {
        id: "3",
        title: "Make a new emotional home",
        description: "Questions to help you feel good about where you are.",
        filename: "Make a new emotional home.json",
        category: "prompt",
        size: "1 KB",
        dateAdded: "2026-04-10"
    },
    {
        id: "4",
        title: "PM Reflections",
        description: "Questions for the evening reflection.",
        filename: "PM Reflections.json",
        category: "prompt",
        size: "1 KB",
        dateAdded: "2026-04-10"
    },
    {
        id: "5",
        title: "Proof",
        description: "Look for proof that you are the person you want to be.",
        filename: "Proof.json",
        category: "prompt",
        size: "1 KB",
        dateAdded: "2026-04-10"
    },
    {
        id: "6",
        title: "Self-Audit",
        description: "Questions for self-audit.",
        filename: "Self-Audit.json",
        category: "prompt",
        size: "1 KB",
        dateAdded: "2026-04-10"
    },
    {
        id: "7",
        title: "Vacation holiday",
        description: "Questions to help you stay on track during vacations or holidays.",
        filename: "Vacation holiday.json",
        category: "prompt",
        size: "1 KB",
        dateAdded: "2026-04-10"
    },
];