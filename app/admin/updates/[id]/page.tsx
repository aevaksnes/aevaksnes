"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc, updateDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../../lib/firebase";
import Link from "next/link";
import { ArrowLeft, Save, ImagePlus, X, Loader2 } from "lucide-react";

export default function EditUpdate() {
    const router = useRouter();
    const { id } = useParams(); // Get ID from the URL

    // States for data
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [existingImageUrl, setExistingImageUrl] = useState("");
    const [links, setLinks] = useState([{ label: "", url: "" }]);
    const [projectId, setProjectId] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    // Support data
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [availableTags, setAvailableTags] = useState<{ id: string, name: string }[]>([]);
    const [availableProjects, setAvailableProjects] = useState<{ id: string, title: string }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get the document that is beeing updated
                const docRef = doc(db, "updates", id as string);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const formattedDate = data.date ? data.date.split('T')[0] : "";
                    setDate(formattedDate);
                    setTitle(data.title || "");
                    setContent(data.content || "");
                    setCategory(data.category || "");
                    setExistingImageUrl(data.image || "");
                    setProjectId(data.projectId || "");
                    setTags(data.tags || []);
                    // Legg til en tom link på slutten for UX
                    setLinks(data.links?.length > 0 ? [...data.links, { label: "", url: "" }] : [{ label: "", url: "" }]);
                }

                // Get Tags and Project for dropdowns
                const tagsSnap = await getDocs(query(collection(db, "tags"), orderBy("name", "asc")));
                setAvailableTags(tagsSnap.docs.map(d => ({ id: d.id, name: d.data().name })));

                const projectsSnap = await getDocs(query(collection(db, "projects"), orderBy("title", "asc")));
                setAvailableProjects(projectsSnap.docs.map(d => ({ id: d.id, title: d.data().title })));

            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            let finalImageUrl = existingImageUrl;

            // If a new image is chosen
            if (image) {
                const imageRef = ref(storage, `updates/${Date.now()}-${image.name}`);
                await uploadBytes(imageRef, image);
                finalImageUrl = await getDownloadURL(imageRef);
            }

            const linksToSave = links.filter(l => l.label.trim() !== "" && l.url.trim() !== "");

            const docRef = doc(db, "updates", id as string);
            await updateDoc(docRef, {
                date,
                title,
                content,
                category,
                image: finalImageUrl,
                links: linksToSave,
                projectId,
                projectTitle: availableProjects.find(p => p.id === projectId)?.title || "",
                tags
            });

            router.push("/admin/updates");
        } catch (error) {
            console.error("Error updating document:", error);
            setSaving(false);
        }
    };

    const handleLinkChange = (index: number, field: "label" | "url", value: string) => {
        const newLinks = [...links];
        newLinks[index][field] = value;
        setLinks(newLinks);
        if (index === links.length - 1 && value.trim() !== "") {
            setLinks([...newLinks, { label: "", url: "" }]);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-brand-light">
            <Loader2 className="animate-spin text-brand-orange" size={48} />
        </div>
    );

    return (
        <main className="min-h-screen bg-brand-light pb-20">
            {/* Header */}
            <section className="bg-brand-light text-brand-orange py-12 px-6 shadow-md border-b-4 border-brand-dark relative">
                <div className="max-w-4xl mx-auto relative text-center">
                    <Link href="/admin/updates" className="md:absolute left-0 top-1/2 md:-translate-y-1/2 flex items-center gap-2 text-brand-dark/50 hover:text-brand-orange transition-colors">
                        <div className="p-2 rounded-full bg-white shadow-sm border border-gray-100"><ArrowLeft size={20} /></div>
                        <span className="font-bold text-sm hidden md:block">Cancel</span>
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold italic">Edit<span className="text-brand-dark"> Update</span></h1>
                </div>
            </section>

            <section className="max-w-3xl mx-auto px-4 mt-8">
                <form onSubmit={handleUpdate} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col gap-6">

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
                    <div>
                        <label className="block text-brand-dark font-black uppercase text-xs tracking-widest mb-2">Title</label>
                        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-orange outline-none font-bold" />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-brand-dark font-black uppercase text-xs tracking-widest mb-2">Content</label>
                        <textarea required rows={5} value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-orange outline-none" />
                    </div>

                    {/* Category & Project - Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-brand-dark font-black uppercase text-xs tracking-widest mb-2">Category</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-brand-orange font-bold">
                                <option value="feature">Feature</option>
                                <option value="launch">Launch</option>
                                <option value="fix">Fix</option>
                                <option value="experiment">Experiment</option>
                                <option value="content">Content</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-brand-dark font-black uppercase text-xs tracking-widest mb-2">Project</label>
                            <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-brand-orange font-bold">
                                <option value="">None</option>
                                {availableProjects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-brand-dark font-black uppercase text-xs tracking-widest mb-2">Tags</label>
                        <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-2xl">
                            {availableTags.map((tag) => {
                                const isSelected = tags.includes(tag.name);
                                return (
                                    <button key={tag.id} type="button" onClick={() => isSelected ? setTags(tags.filter(t => t !== tag.name)) : setTags([...tags, tag.name])}
                                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${isSelected ? "bg-brand-orange text-white shadow-lg scale-105" : "bg-white text-gray-400 border border-gray-100 hover:border-brand-orange"}`}>
                                        {tag.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Image section */}
                    <div className="p-6 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 text-center">
                        {image || existingImageUrl ? (
                            <div className="relative w-full max-w-sm mx-auto">
                                <img src={image ? URL.createObjectURL(image) : existingImageUrl} alt="Preview" className="rounded-2xl shadow-md" />
                                <button type="button" onClick={() => { setImage(null); setExistingImageUrl(""); }} className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition"><X size={16} /></button>
                            </div>
                        ) : (
                            <label className="cursor-pointer flex flex-col items-center gap-2">
                                <ImagePlus size={48} className="text-gray-300" />
                                <span className="text-gray-400 font-bold text-sm">Replace or add image</span>
                                <input type="file" accept="image/*" onChange={(e) => e.target.files && setImage(e.target.files[0])} className="sr-only" />
                            </label>
                        )}
                    </div>

                    {/* Submit */}
                    <button type="submit" disabled={saving} className={`py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-xl ${saving ? "bg-gray-200 text-gray-400" : "bg-brand-dark text-brand-orange hover:bg-black hover:-translate-y-1"}`}>
                        {saving ? "Updating... ⏳" : "Save changes"}
                    </button>
                </form>
            </section>
        </main>
    );
}