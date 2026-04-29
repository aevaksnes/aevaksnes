"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, Download, FileJson, FileCode, File as FileIcon, Info } from "lucide-react";
import { DownloadableFile } from "@/types/firebase_types";

/**
 * Main Downloads page. Groups all resources from Firestore by their parent project.
 */
export default function Downloads() {
    const [downloads, setDownloads] = useState<DownloadableFile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDownloads = async () => {
            try {
                const q = query(collection(db, "downloads"), orderBy("title", "asc"));
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as DownloadableFile[];
                setDownloads(data);
            } catch (error) {
                console.error("Error fetching downloads:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDownloads();
    }, []);

    // Groups downloads by project title for a structured overview
    const groupedDownloads = downloads.reduce((acc, file) => {
        const key = file.projectTitle || "General Resources";
        if (!acc[key]) acc[key] = [];
        acc[key].push(file);
        return acc;
    }, {} as Record<string, DownloadableFile[]>);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="animate-spin text-brand-purple" size={48} />
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto py-24 px-6 animate-in fade-in duration-700">
            {/* Page Header */}
            <header className="mb-24 text-center">
                <h1 className="text-5xl md:text-6xl font-black mb-6 dark:text-white tracking-tighter">
                    Downloads
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    A collection of resources, templates, and tools from my various projects. 
                    Explore by category below.
                </p>
            </header>

            {/* Grouped Sections */}
            {Object.entries(groupedDownloads).map(([project, files]) => (
                <section key={project} className="mb-24 last:mb-0">
                    <div className="flex items-center gap-3 mb-10 border-b border-gray-100 dark:border-white/5 pb-4">
                        <div className="h-2 w-2 rounded-full bg-brand-purple" />
                        <h2 className="text-2xl font-black dark:text-white tracking-tight">
                            {project}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {files.map((file) => (
                            <div 
                                key={file.id} 
                                className="group p-8 rounded-4xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 flex flex-col justify-between hover:border-brand-purple/40 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 text-[10px] font-bold tracking-tight">
                                            {file.fileName.endsWith('.json') ? <FileJson size={14} /> : 
                                             file.fileName.endsWith('.js') || file.fileName.endsWith('.ts') ? <FileCode size={14} /> :
                                             <FileIcon size={14} />}
                                            {file.category || "File"}
                                        </div>
                                        <span className="text-xs font-mono text-gray-400 font-bold">{file.size}</span>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold mb-3 dark:text-white transition-colors group-hover:text-brand-purple">
                                        {file.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm leading-relaxed line-clamp-3">
                                        {file.description}
                                    </p>
                                </div>

                                <a
                                    href={file.fileUrl}
                                    download={file.fileName}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-brand-purple text-white font-bold hover:bg-brand-dark transition-all active:scale-95 shadow-lg shadow-brand-purple/20"
                                >
                                    <Download size={20} />
                                    Download {file.fileName.split('.').pop()?.toUpperCase()}
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* Specific instructions for Brain Dump */}
                    {project === "Brain Dump" && (
                        <div className="mt-8 p-8 rounded-4xl bg-brand-orange/5 border border-brand-orange/10 flex flex-col md:flex-row items-center gap-6">
                            <div className="p-3 bg-brand-orange/20 rounded-2xl text-brand-orange shrink-0">
                                <Info size={24} />
                            </div>
                            <div className="text-left">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-1">Importing to Brain Dump</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Open the app &rarr; Settings &rarr; Select <span className="font-bold text-brand-orange">Import Prompts</span> and choose your downloaded file.
                                </p>
                            </div>
                        </div>
                    )}
                </section>
            ))}
        </div>
    );
}