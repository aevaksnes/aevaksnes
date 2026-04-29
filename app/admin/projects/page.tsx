"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage"; // To delete image
import { db, storage } from "../../../lib/firebase";
import Link from "next/link";
import { Trash2, Edit, Plus, ArrowLeft, ChevronUp, ChevronDown } from "lucide-react";

type ProjectSize = 'L' | 'M' | 'S';

interface Project {
    id: string;
    title: string;
    description: string;
    image?: string; // Optional, for projects that have an associated image
    tags: string[];
    href: string;
    size: ProjectSize;
    order: number;
}

export default function AdminProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const getProjects = async () => {
        try {
            const q = query(collection(db, "projects"), orderBy("order", "asc"));
            const snapshot = await getDocs(q);
            const collectedData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as Project[];

            setProjects(collectedData);

        } catch (error) {
            console.error("Couldn't get projects:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    // Get the image URL and update Storage
    const deleteProject = async (id: string, title: string, image: string | undefined) => {
        const confirm = window.confirm(`Are you sure you want to delete the project:  "${title}"?`);
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
            await deleteDoc(doc(db, "projects", id));

            // Update the screen
            setProjects(projects.filter((project) => project.id !== id));
        } catch (error) {
            console.error("Could not delete:", error);
            alert("Something went wrong during deletion.");
        }
    };

    const moveProject = async (index: number, direction: 'up' | 'down') => {
        const newProjects = [...projects];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        // Check if moving is possible
        if (targetIndex < 0 || targetIndex >= newProjects.length) return;

        // Change place in the local list
        const temp = newProjects[index];
        newProjects[index] = newProjects[targetIndex];
        newProjects[targetIndex] = temp;

        // Update state (UI)
        setProjects(newProjects);

        // Save in Firestore
        try {
            const updatePromises = [
                updateDoc(doc(db, "projects", newProjects[index].id), { order: index }),
                updateDoc(doc(db, "projects", newProjects[targetIndex].id), { order: targetIndex })
            ];
            await Promise.all(updatePromises);
        } catch (error) {
            console.error("Error while saving order:", error);
        }
    };


    return (
        <main className="min-h-screen bg-brand-light pb-20">

            {/* Header */}
            <section className="bg-brand-light text-brand-teal py-12 px-6 shadow-md border-b-4 border-brand-dark relative">
                <div className="max-w-4xl mx-auto relative">
                    {/* Arrow is moved to the side on bigger screens */}
                    <Link
                        href="/admin"
                        className="md:absolute left-0 top-1/2 md:-translate-y-1/2 flex items-center gap-2 text-brand-dark/50 hover:text-brand-teal transition-colors mb-6 md:mb-0 w-fit"
                    >
                        <div className="p-2 rounded-full bg-white shadow-sm border border-gray-100">
                            <ArrowLeft size={20} />
                        </div>
                        <span className="font-bold text-sm hidden md:block">Back</span>
                    </Link>

                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold">
                            Manage<span className="text-brand-dark"> Projects </span>
                        </h1>
                    </div>


                </div>
            </section>


            {/* Content / Form */}
            <section className="max-w-5xl mx-auto px-4 mt-8">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-brand-dark">Projects ({projects.length})</h2>
                    <Link
                        href="/admin/projects/new"
                        className="bg-brand-teal text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-teal-600 transition-all shadow-lg hover:shadow-teal-200 hover:-translate-y-0.5 active:scale-95"
                    >
                        <Plus size={20} strokeWidth={3} />
                        <span>New Project</span>
                    </Link>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500 py-10 animate-pulse">Get Projects...</p>
                ) : (
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-150">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-200">
                                    <th className="p-4 font-bold text-gray-700">Title</th>
                                    <th className="p-4 font-bold text-gray-700">Size</th>
                                    <th className="p-4 font-bold text-gray-700 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project, index) => (
                                    <tr key={project.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <button
                                                        onClick={() => moveProject(index, 'up')}
                                                        disabled={index === 0}
                                                        className="disabled:opacity-20 hover:text-brand-teal"
                                                    >
                                                        <ChevronUp size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => moveProject(index, 'down')}
                                                        disabled={index === projects.length - 1}
                                                        className="disabled:opacity-20 hover:text-brand-teal"
                                                    >
                                                        <ChevronDown size={16} />
                                                    </button>
                                                </div>
                                                <span className="font-bold text-gray-800">{project.title}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-500">
                                            {project.size}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/admin/projects/${project.id}`} className="p-2 text-gray-400 hover:text-brand-teal hover:bg-white rounded-xl transition shadow-sm border border-transparent hover:border-gray-100">
                                                    <Edit size={18} />
                                                </Link>
                                                <button onClick={() => deleteProject(project.id, project.title, project.image)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-xl transition shadow-sm border border-transparent hover:border-gray-100">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {projects.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-gray-500">
                                            No projects to show.
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