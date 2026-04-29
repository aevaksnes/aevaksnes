"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DownloadableFile } from "@/types/firebase_types";
import { Loader2, Download, FileJson, FileText, FileCode } from "lucide-react";

/**
 * Renders a list of downloadable resources for a specific project.
 * Designed to be responsive, working both in sidebars and full-width sections.
 */
export function ProjectDownloads({ projectId }: { projectId: string }) {
  const [files, setFiles] = useState<DownloadableFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const q = query(
          collection(db, "downloads"),
          where("projectId", "==", projectId)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as DownloadableFile[];
        setFiles(data);
      } catch (error) {
        console.error("Error fetching project downloads:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, [projectId]);

  if (loading) return <div className="py-4 flex justify-center"><Loader2 className="animate-spin text-brand-purple opacity-50" /></div>;
  if (files.length === 0) return null;

  return (
    <section className="w-full">
      {/* Label/Title */}
      <div className="flex items-center gap-2 mb-6 text-brand-purple/70">
        <Download size={18} />
        <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em]">Resources</h3>
      </div>

      {/* File List - Single column is safer for sidebars */}
      <div className="grid grid-cols-1 gap-3">
        {files.map((file) => (
          <div 
            key={file.id} 
            className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-between gap-4 transition-all hover:border-brand-purple/40 hover:shadow-md group"
          >
            {/* File Info */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 bg-brand-purple/10 rounded-xl text-brand-purple shrink-0 group-hover:bg-brand-purple group-hover:text-white transition-colors">
                {file.fileName.endsWith('.json') ? <FileJson size={20} /> : 
                 file.fileName.endsWith('.js') || file.fileName.endsWith('.ts') ? <FileCode size={20} /> :
                 <FileText size={20} />}
              </div>

              <div className="flex flex-col overflow-hidden">
                <span className="font-bold text-gray-900 dark:text-white text-sm truncate leading-tight" title={file.title}>
                  {file.title}
                </span>
                <span className="text-[10px] font-mono text-gray-400 mt-0.5">
                  {file.size}
                </span>
              </div>
            </div>

            {/* Download Link */}
            <a
              href={file.fileUrl}
              download={file.fileName}
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 rounded-lg bg-gray-50 dark:bg-white/5 text-gray-400 hover:bg-brand-purple hover:text-white transition-all flex items-center justify-center shrink-0 border border-gray-100 dark:border-white/5 shadow-sm active:scale-95"
              title={`Download ${file.fileName}`}
            >
              <Download size={16} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}