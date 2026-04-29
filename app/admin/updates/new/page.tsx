"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, getDocs, orderBy, query } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../../lib/firebase";
import Link from "next/link";
import { ArrowLeft, Save, ImagePlus, X } from "lucide-react";


export default function AddUpdate() {
    const router = useRouter();

    // Form values
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [links, setLinks] = useState([{ label: "", url: "" }]);
    const [projectId, setProjectId] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    // State
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [availableTags, setAvailableTags] = useState<{ id: string, name: string }[]>([]);
    const [availableProjects, setAvailableProjects] = useState<{ id: string, title: string }[]>([]);

    // Get data when the page is loading
    useEffect(() => {
        const fetchData = async () => {
            // Get Tags
            const tagsSnap = await getDocs(query(collection(db, "tags"), orderBy("name", "asc")));
            setAvailableTags(tagsSnap.docs.map(doc => ({ id: doc.id, name: doc.data().name })));

            // Get Projects
            const projectsSnap = await getDocs(query(collection(db, "projects"), orderBy("title", "asc")));
            setAvailableProjects(projectsSnap.docs.map(doc => ({ id: doc.id, title: doc.data().title })));
        };
        fetchData();
    }, []);


    const saveUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setErrorMsg("");

        try {
            let imageUrl = "";

            // Upload image to Storage
            if (image) {
                const imageRef = ref(storage, `updates/${Date.now()}-${image.name}`);
                await uploadBytes(imageRef, image);
                imageUrl = await getDownloadURL(imageRef);
            }

            const linksToSave = links.filter(l => l.label.trim() !== "" && l.url.trim() !== "");

            // Save in Firestore
            await addDoc(collection(db, "updates"), {
                title: title,
                content: content,
                date: date,
                category: category,
                image: imageUrl,
                links: linksToSave,
                projectId: projectId,
                projectTitle: availableProjects.find(p => p.id === projectId)?.title || "",
                tags: tags,
            });

            // Send the user back to updates overview
            router.push("/admin/updates");

        } catch (error) {
            console.error("Couldn't save the update:", error);
            setErrorMsg("Something went wrong during saving. Try again.");
            setLoading(false);
        }
    };

    const handleLinkChange = (index: number, field: "label" | "url", value: string) => {
        const newLinks = [...links];
        newLinks[index][field] = value;
        setLinks(newLinks);

        //Add a new empty field after update
        const isLastField = index === links.length - 1;
        const isNotEmpty = value.trim() !== "";

        if (isLastField && isNotEmpty) {
            setLinks([...newLinks, { label: "", url: "" }]);
        }
    };

    return (
        <main className="min-h-screen bg-brand-light pb-20">

            {/* Header */}
            <section className="bg-brand-light text-brand-orange py-12 px-6 shadow-md border-b-4 border-brand-dark relative">
                <div className="max-w-4xl mx-auto relative">
                    {/* Arrow move to the side on bigger screens */}
                    <Link
                        href="/admin"
                        className="md:absolute left-0 top-1/2 md:-translate-y-1/2 flex items-center gap-2 text-brand-dark/50 hover:text-brand-orange transition-colors mb-6 md:mb-0 w-fit"
                    >
                        <div className="p-2 rounded-full bg-white shadow-sm border border-gray-100">
                            <ArrowLeft size={20} />
                        </div>
                        <span className="font-bold text-sm hidden md:block">Cancel and return</span>
                    </Link>

                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold">
                            Add<span className="text-brand-dark"> Update </span>
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

                    <form onSubmit={saveUpdate} className="flex flex-col gap-6">

                        {/* Date */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Dato</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded focus:border-brand-orange outline-none"
                            />
                        </div>

                        {/* Title */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-gray-700 font-bold mb-2">Title</label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded focus:border-brand-orange focus:ring-2 outline-none"
                                placeholder="Added new feature"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Content</label>
                            <textarea
                                required
                                rows={4}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded focus:border-brand-orange focus:ring-2 outline-none"
                                placeholder="Write a little about what you have done..."
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
                                    <option value="feature">Feature</option>
                                    <option value="launch">Launch</option>
                                    <option value="fix">Fix</option>
                                    <option value="experiment">Experiment</option>
                                    <option value="content">Content</option>
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

                        {/* Links */}
                        <div className="space-y-4">
                            <label className="block text-sm font-bold text-gray-700">Links (optional)</label>

                            {links.map((link, index) => (
                                <div key={index} className="flex gap-2 items-center animate-in fade-in slide-in-from-top-2">
                                    <input
                                        type="text"
                                        placeholder="Text (ex. See demo)"
                                        value={link.label}
                                        onChange={(e) => handleLinkChange(index, "label", e.target.value)}
                                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none"
                                    />
                                    <input
                                        type="url"
                                        placeholder="https://..."
                                        value={link.url}
                                        onChange={(e) => handleLinkChange(index, "url", e.target.value)}
                                        className="flex-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none"
                                    />

                                    {/* Button to remove the field (if not the last empty field) */}
                                    {links.length > 1 && (index !== links.length - 1 || link.label || link.url) && (
                                        <button
                                            type="button"
                                            onClick={() => setLinks(links.filter((_, i) => i !== index))}
                                            className="text-red-500 hover:bg-red-50 p-2 rounded-full transition"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>


                        {/* Upload image */}
                        <div className="p-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded text-center transition">
                            <div className="flex flex-col items-center gap-2 mb-4">
                                <ImagePlus className="text-gray-400" size={32} />
                                <label className="block text-gray-700 font-bold cursor-pointer">
                                    Upload image (optional)
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                setImage(e.target.files[0]);
                                            }
                                        }}
                                        className="sr-only"
                                    />
                                    <div className="bg-brand-orange text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-brand-orange-500 mt-2 mx-auto cursor-pointer w-fit">
                                        Velg bilde
                                    </div>
                                </label>
                            </div>

                            {/* Preview */}
                            {image && (
                                <div className="mt-6 border-t pt-6 relative w-full max-w-md mx-auto">
                                    <p className="text-sm font-bold text-gray-700 mb-3 text-left">Chosen image:</p>
                                    <div className="relative w-full aspect-video rounded border border-gray-300 overflow-hidden group">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt="Preview"
                                            className="w-full h-full object-cover shadow-sm"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setImage(null)}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 shadow-md hover:bg-red-700 transition transform hover:scale-110 z-10"
                                            title="Remove image"
                                        >
                                            <X size={16} strokeWidth={3} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Tags</label>
                            <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                {availableTags.map((tag) => {
                                    const isSelected = tags?.includes(tag.name);
                                    return (
                                        <button
                                            key={tag.id}
                                            type="button"
                                            onClick={() => {
                                                if (isSelected) {
                                                    setTags(tags?.filter(t => t !== tag.name));
                                                } else {
                                                    setTags([...(tags || []), tag.name]);
                                                }
                                            }}
                                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${isSelected
                                                ? "bg-brand-orange text-white shadow-md scale-105"
                                                : "bg-white text-gray-500 border border-gray-200 hover:border-brand-orange"
                                                }`}
                                        >
                                            {tag.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Save Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`mt-4 py-4 rounded font-black uppercase tracking-wider flex items-center justify-center gap-2 transition ${loading ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-black text-brand-orange hover:bg-gray-800"}`}
                        >
                            {loading ? (
                                "Saves and publishes... ⏳"
                            ) : (
                                <><Save size={20} /> Saves and publishes the update</>
                            )}
                        </button>

                    </form>
                </div>
            </section>
        </main>
    );
}