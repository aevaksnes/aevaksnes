"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage"; // To delete image
import { db, storage } from "../../../lib/firebase";
import Link from "next/link";
import { Trash2, Edit, Plus, ArrowLeft, Tag } from "lucide-react";
import { Update } from "@/types/firebase_types";

export default function AdminUpdates() {
    const [updates, setUpdates] = useState<Update[]>([]);
    const [loading, setLoading] = useState(true);

    const getUpdates = async () => {
        try {
            const updatesRef = collection(db, "updates");
            const q = query(updatesRef, orderBy("date", "desc"));
            const snapshot = await getDocs(q);

            const collectedData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as Update[];

            setUpdates(collectedData);
        } catch (error) {
            console.error("Couldn't get updates:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUpdates();
    }, []);

    // Get the image URL and update Storage
    const deleteUpdate = async (id: string, title: string, image: string | undefined) => {
        const confirm = window.confirm(`Are you sure you want to delete the update:  "${title}"?`);
        if (!confirm) return;

        try {
            // Delete the image from Storage
            if (image) {
                try {
                    const imageRef = ref(storage, image);
                    await deleteObject(imageRef);
                } catch (imageError) {
                    console.error("Couldn't delete the image...", imageError);
                }
            }

            // Delete the document in the database
            await deleteDoc(doc(db, "updates", id));

            // Update the screen
            setUpdates(updates.filter((update) => update.id !== id));
        } catch (error) {
            console.error("Could not delete:", error);
            alert("Something went wrong during deletion.");
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
                            Manage<span className="text-brand-dark"> Updates </span>
                        </h1>
                    </div>


                </div>
            </section>


            {/* Innhold / Tabell */}
            <section className="max-w-5xl mx-auto px-4 mt-8">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-brand-dark">Updates ({updates.length})</h2>
                    <Link
                        href="/admin/updates/new"
                        className="bg-brand-orange text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-200 hover:-translate-y-0.5 active:scale-95"
                    >
                        <Plus size={20} strokeWidth={3} />
                        <span>New Update</span>
                    </Link>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500 py-10 animate-pulse">Get Updates...</p>
                ) : (
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-150">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-200">
                                    <th className="p-4 font-bold text-gray-700">Title</th>
                                    <th className="p-4 font-bold text-gray-700">Date</th>
                                    <th className="p-4 font-bold text-gray-700">Project</th>
                                    <th className="p-4 font-bold text-gray-700 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {updates.map((update) => (
                                    <tr key={update.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-800">{update.title}</span>
                                                <span className="text-[10px] uppercase tracking-widest text-brand-orange font-bold">
                                                    {update.category}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-500">
                                            {new Date(update.date).toLocaleDateString("no-NO")}
                                        </td>
                                        <td className="p-4">
                                            {update.projectTitle ? (
                                                <span className="bg-brand-teal/10 text-brand-teal text-xs px-2 py-1 rounded-md font-medium">
                                                    {update.projectTitle}
                                                </span>
                                            ) : (
                                                <span className="text-gray-300 text-xs">—</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/admin/updates/${update.id}`} className="p-2 text-gray-400 hover:text-brand-orange hover:bg-white rounded-xl transition shadow-sm border border-transparent hover:border-gray-100">
                                                    <Edit size={18} />
                                                </Link>
                                                <button onClick={() => deleteUpdate(update.id, update.title, update.image)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-xl transition shadow-sm border border-transparent hover:border-gray-100">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {updates.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-gray-500">
                                            No updates to show.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

            </section>

        </main>
    );
}