"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage"; // To delete file
import { db, storage } from "../../../lib/firebase";
import Link from "next/link";
import { Trash2, Edit, Plus, ArrowLeft} from "lucide-react";


interface DownloadableFile {
    id: string;
    title: string;
    description: string;
    fileUrl: string;       // URL in Storage
    fileName: string;
    category: 'prompt' | 'guide' | 'template' | 'program' ;
    size: string;          // ex. "1.2 MB"
    dateAdded: string;
    projectId?: string;
    projectTitle?: string;
}

export default function AdminDownloads() {
    const [downloads, setDownloads] = useState<DownloadableFile[]>([]);
    const [loading, setLoading] = useState(true);

    const getDownloads = async () => {
        try {
            const downloadsRef = collection(db, "downloads");
            const snapshot = await getDocs(downloadsRef);
            const collectedData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as DownloadableFile[];

            setDownloads(collectedData);

        } catch (error) {
            console.error("Couldn't get downloads:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDownloads();
    }, []);

    // Get the file URL and update Storage
    const deleteDownload = async (id: string, title: string, fileUrl: string | undefined) => {
        const confirm = window.confirm(`Are you sure you want to delete the file:  "${title}"?`);
        if (!confirm) return;

        try {
            // Delete the file from Storage
            if (fileUrl) {
                try {
                    const fileUrlRef = ref(storage, fileUrl);
                    await deleteObject(fileUrlRef);
                } catch (fileError) {
                    console.error("Couldn't delete the file...", fileError);
                }
            }

            // Delete the document in the database
            await deleteDoc(doc(db, "downloads", id));

            // Update the screen
            setDownloads(downloads.filter((download) => download.id !== id));
        } catch (error) {
            console.error("Could not delete:", error);
            alert("Something went wrong during deletion.");
        }
    };


    return (
        <main className="min-h-screen bg-brand-light pb-20">

            {/* Header */}
            <section className="bg-brand-light text-brand-purple py-12 px-6 shadow-md border-b-4 border-brand-dark relative">
                <div className="max-w-4xl mx-auto relative">
                    {/* Arrow is moved to the side on bigger screens */}
                    <Link
                        href="/admin"
                        className="md:absolute left-0 top-1/2 md:-translate-y-1/2 flex items-center gap-2 text-brand-dark/50 hover:text-brand-purple transition-colors mb-6 md:mb-0 w-fit"
                    >
                        <div className="p-2 rounded-full bg-white shadow-sm border border-gray-100">
                            <ArrowLeft size={20} />
                        </div>
                        <span className="font-bold text-sm hidden md:block">Back</span>
                    </Link>

                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold">
                            Manage<span className="text-brand-dark"> Downloads </span>
                        </h1>
                    </div>


                </div>
            </section>


            {/* Content / Form */}
            <section className="max-w-5xl mx-auto px-4 mt-8">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-brand-dark">Downloads ({downloads.length})</h2>
                    <Link
                        href="/admin/downloads/new"
                        className="bg-brand-purple text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-purple-600 transition-all shadow-lg hover:shadow-purple-200 hover:-translate-y-0.5 active:scale-95"
                    >
                        <Plus size={20} strokeWidth={3} />
                        <span>New Download</span>
                    </Link>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500 py-10 animate-pulse">Get Downloads...</p>
                ) : (
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-150">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-200">
                                    <th className="p-4 font-bold text-gray-700">Title</th>
                                    <th className="p-4 font-bold text-gray-700">Project</th>
                                    <th className="p-4 font-bold text-gray-700">Category</th>
                                    <th className="p-4 font-bold text-gray-700">Size</th>
                                    <th className="p-4 font-bold text-gray-700 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {downloads.map((download) => (
                                    <tr key={download.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                                        {/* Title */}
                                        <td className="p-4 font-bold text-gray-800">
                                            {download.title}
                                        </td>

                                        {/* Project Title */}
                                        <td className="p-4 text-sm">
                                            {download.projectTitle? (
                                                <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
                                                    {download.projectTitle}
                                                </span>
                                            ) : (
                                                <span className="text-gray-300 italic text-xs">General</span>
                                            )}
                                        </td>

                                        {/* Category */}
                                        <td className="p-4">
                                            <span className="text-[10px] uppercase tracking-widest text-brand-purple font-bold bg-brand-purple/10 px-2 py-1 rounded">
                                                {download.category}
                                            </span>
                                        </td>

                                        {/* Size */}
                                        <td className="p-4 text-sm text-gray-500 font-mono">
                                            {download.size}
                                        </td>

                                        {/* Actions */}
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => deleteDownload(download.id, download.title, download.fileUrl)} className="...">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </section>

        </main>
    );
}