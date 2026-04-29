"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, getDocs, orderBy, query } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../../lib/firebase";
import Link from "next/link";
import { ArrowLeft, Save, FilePlus, X } from "lucide-react";


export default function AddDownload() {
    const router = useRouter();

    // Form values
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [category, setCategory] = useState("");
    const [projectId, setProjectId] = useState("");

    // State
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [availableProjects, setAvailableProjects] = useState<{ id: string, title: string }[]>([]);

    // Get data when the page is loading
    useEffect(() => {
        const fetchData = async () => {

            // Get Projects
            const projectsSnap = await getDocs(query(collection(db, "projects"), orderBy("title", "asc")));
            setAvailableProjects(projectsSnap.docs.map(doc => ({ id: doc.id, title: doc.data().title })));
        };
        fetchData();
    }, []);

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
    };

    const saveDownload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        try {
            //Upload the file to a downloads folder in Storage
            const metadata = {
                contentDisposition: 'attachment; filename="' + file.name + '"',
                contentType: file.type
                }; //Force download, not open
            const fileRef = ref(storage, `downloads/${Date.now()}-${file.name}`);
            const uploadResult = await uploadBytes(fileRef, file, metadata);
            const downloadUrl = await getDownloadURL(fileRef);

            // Save the info in Firestore
            await addDoc(collection(db, "downloads"), {
                title,
                description,
                category,
                projectId,
                projectTitle: availableProjects.find(p => p.id === projectId)?.title || "",
                fileUrl: downloadUrl,
                fileName: file.name,
                size: formatFileSize(uploadResult.metadata.size), // Automatic size
                dateAdded: new Date().toISOString().split('T')[0],
            });

            router.push("/admin/downloads");
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <main className="min-h-screen bg-brand-light pb-20">

            {/* Header */}
            <section className="bg-brand-light text-brand-purple py-12 px-6 shadow-md border-b-4 border-brand-dark relative">
                <div className="max-w-4xl mx-auto relative">
                    {/* Arrow move to the side on bigger screens */}
                    <Link
                        href="/admin"
                        className="md:absolute left-0 top-1/2 md:-translate-y-1/2 flex items-center gap-2 text-brand-dark/50 hover:text-brand-purple transition-colors mb-6 md:mb-0 w-fit"
                    >
                        <div className="p-2 rounded-full bg-white shadow-sm border border-gray-100">
                            <ArrowLeft size={20} />
                        </div>
                        <span className="font-bold text-sm hidden md:block">Cancel and return</span>
                    </Link>

                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold">
                            Add<span className="text-brand-dark"> Download </span>
                        </h1>
                    </div>


                </div>
            </section>


            {/* Form */}
            <section className="max-w-3xl mx-auto px-4 mt-8">
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">

                    {errorMsg && (
                        <div className="p-4 mb-6 rounded font-bold bg-red-100 text-red-700">
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={saveDownload} className="flex flex-col gap-6">

                        {/* Title */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-gray-700 font-bold mb-2">Title</label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded focus:border-brand-orange focus:ring-2 outline-none"
                                placeholder="Guide for reflection..."
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Content</label>
                            <textarea
                                required
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded focus:border-brand-orange focus:ring-2 outline-none"
                                placeholder="What is in this file..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Category */}
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Category</label>
                                <select
                                    required
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded focus:border-brand-orange focus:ring-2 outline-none bg-white"
                                >
                                    <option value="">Select category...</option>
                                    <option value="prompt">Prompt</option>
                                    <option value="guide">Guide</option>
                                    <option value="template">Template</option>
                                    <option value="program">Program</option>
                                </select>
                            </div>

                            {/* Project Link */}
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Related Project (Optional)</label>
                                <select
                                    value={projectId}
                                    onChange={(e) => setProjectId(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded focus:border-brand-orange focus:ring-2 outline-none bg-white"
                                >
                                    <option value="">No project</option>
                                    {availableProjects.map(p => (
                                        <option key={p.id} value={p.id}>{p.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>


                        {/* Upload file */}
                        <div className="p-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded text-center transition">
                            <div className="flex flex-col items-center gap-2 mb-4">
                                <FilePlus className="text-gray-400" size={32} />
                                <label className="block text-gray-700 font-bold cursor-pointer">
                                    Upload file
                                    <input
                                        type="file"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                setFile(e.target.files[0]);
                                            }
                                        }}
                                        className="sr-only"
                                    />
                                    <div className="bg-brand-purple text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-brand-purple/50 mt-2 mx-auto cursor-pointer w-fit">
                                        Velg fil
                                    </div>
                                </label>
                            </div>

                            {/* Preview / File Info */}
                            {file && (
                                <div className="mt-6 border-t pt-6 relative w-full max-w-md mx-auto">
                                    <p className="text-sm font-bold text-gray-700 mb-3 text-left">Selected file:</p>
                                    <div className="flex items-center gap-4 p-4 bg-brand-purple/5 border border-brand-purple/20 rounded-2xl relative group">
                                        {/* Et generisk fil-ikon */}
                                        <div className="bg-brand-purple/20 p-3 rounded-xl text-brand-purple">
                                            <Save size={24} />
                                        </div>

                                        <div className="flex flex-col text-left overflow-hidden">
                                            <span className="font-bold text-brand-dark truncate">{file.name}</span>
                                            <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setFile(null)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 shadow-md hover:bg-red-700 transition transform hover:scale-110 z-10"
                                            title="Remove file"
                                        >
                                            <X size={16} strokeWidth={3} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>


                        {/* Save Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`mt-4 py-4 rounded font-black uppercase tracking-wider flex items-center justify-center gap-2 transition ${loading ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-black text-brand-purple hover:bg-gray-800"}`}
                        >
                            {loading ? (
                                "Saves and publishes... ⏳"
                            ) : (
                                <><Save size={20} /> Saves and publishes the download</>
                            )}
                        </button>

                    </form>
                </div>
            </section>
        </main>
    );
}