"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Tag as TagIcon } from "lucide-react";

export default function AdminTags() {
    const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
    const [newTagName, setNewTagName] = useState("");
    const [loading, setLoading] = useState(true);

    // Get Tags from Firestore
    useEffect(() => {
        const fetchTags = async () => {
            const q = query(collection(db, "tags"), orderBy("name", "asc"));
            const querySnapshot = await getDocs(q);
            const tagsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
            }));
            setTags(tagsData);
            setLoading(false);
        };
        fetchTags();
    }, []);

    // Add new Tag
    const handleAddTag = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTagName.trim()) return;

        try {
            const docRef = await addDoc(collection(db, "tags"), {
                name: newTagName.trim()
            });
            setTags([...tags, { id: docRef.id, name: newTagName.trim() }].sort((a, b) => a.name.localeCompare(b.name)));
            setNewTagName("");
        } catch (error) {
            console.error("Error adding tag:", error);
        }
    };

    // Delete Tag
    const handleDeleteTag = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this tag?")) return;
        try {
            await deleteDoc(doc(db, "tags", id));
            setTags(tags.filter(tag => tag.id !== id));
        } catch (error) {
            console.error("Error deleting tag:", error);
        }
    };

    return (
        <main className="min-h-screen bg-brand-light pb-20">

            {/* Header */}
            <section className="bg-brand-light text-brand-orange py-12 px-6 shadow-md border-b-4 border-brand-dark relative">
                <div className="max-w-4xl mx-auto relative">
                    {/* Pilen flyttes ut til siden på større skjermer */}
                    <Link
                        href="/admin"
                        className="md:absolute left-0 top-1/2 md:-translate-y-1/2 flex items-center gap-2 text-brand-dark/50 hover:text-brand-orange transition-colors mb-6 md:mb-0 w-fit"
                    >
                        <div className="p-2 rounded-full bg-white shadow-sm border border-gray-100">
                            <ArrowLeft size={20} />
                        </div>
                        <span className="font-bold text-sm hidden md:block">Back</span>
                    </Link>

                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold">
                            Manage<span className="text-brand-dark"> tags</span>
                        </h1>
                    </div>
                </div>
            </section>


            <div className="max-w-2xl mx-auto p-6">

                {/* Form for new Tag */}
                <form onSubmit={handleAddTag} className="flex gap-2 mb-10">
                    <input
                        type="text"
                        value={newTagName}
                        onChange={(e) => setNewTagName(e.target.value)}
                        placeholder="New tag name (e.g. TypeScript)"
                        className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-brand-orange text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition flex items-center gap-2 cursor-pointer"
                    >
                        <Plus size={20} /> Add
                    </button>
                </form>

                {/* List of tags */}
                <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
                    {loading ? (
                        <p className="p-8 text-center text-gray-500">Loading tags...</p>
                    ) : (
                        <ul className="divide-y divide-gray-50">
                            {tags.map((tag) => (
                                <li key={tag.id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition">
                                    <span className="font-medium text-gray-700">{tag.name}</span>
                                    <button
                                        onClick={() => handleDeleteTag(tag.id)}
                                        className="text-gray-400 hover:text-red-500 p-2 transition cursor-pointer"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>
        </main>
    );
}