"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import { Loader2 } from "lucide-react";

/**
 * About page sharing the story behind the developer and the technical stack.
 */
export default function About() {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        // Fetching technical tags from the 'tags' collection, sorted alphabetically
        const tagsRef = collection(db, "tags");
        const q = query(tagsRef, orderBy("name", "asc"));
        const snapshot = await getDocs(q);

        const tagList = snapshot.docs.map(doc => doc.data().name);
        setTags(tagList);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-24 px-6">
      
      {/* Intro Section: The Story */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-32">
        <div>
          <h1 className="text-5xl font-black mb-8 dark:text-white tracking-tighter">My Journey</h1>

          <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>
              My name is <span className="text-black dark:text-white font-bold">Eva</span>.
              I’m a hobby developer with a background in  
              <span className="bg-brand-purple/10 text-brand-purple px-2 py-0.5 rounded-lg font-medium mx-1">economics and code</span>.
            </p>

            <p>
              I started with basic computer science in high school, followed by a degree in economics and computer science. 
              I’ve always loved the <strong>problem-solving aspect</strong> of programming, and worked for a few years as a programmer in Axapta (Dynamics 365).
            </p>

            <p className="italic border-l-4 border-brand-purple/30 pl-6 py-2 text-gray-500 dark:text-gray-300 bg-gray-50/50 dark:bg-white/5 rounded-r-xl">
              &quot;Life happened, and I spent some years focusing on family while working with accounting, but the itch to 
              build something with code never truly went away.&quot;
            </p>

            <p>
              Now, I’m diving back into software development, exploring <strong>modern technologies</strong>, enjoying learning new things, building my own projects and using code to ease real-world friction.
            </p>
          </div>
        </div>

        {/* Profile Image with Glow Effect */}
        <div className="relative group mx-auto md:mx-0 w-full max-w-sm">
          <div className="absolute -inset-1 bg-linear-to-r from-brand-purple to-brand-teal rounded-4xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative aspect-4/5 rounded-4xl overflow-hidden bg-gray-100 dark:bg-white/5 border border-white/10 shadow-2xl">
            <Image
              src="/programming.jpg"
              alt="Eva working on code"
              fill
              className="object-cover transition transform duration-700 group-hover:scale-105"
              priority
            />
          </div>
        </div>
      </section>

      {/* Tech Stack Section: Dynamically loaded from Firestore */}
      <section className="mb-32 p-8 md:p-16 rounded-4xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Technical Toolkit</h2>
          <p className="text-gray-500 dark:text-gray-400">The languages and frameworks I use to bring ideas to life.</p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="animate-spin text-brand-purple" size={32} />
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-6 py-3 rounded-2xl bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 font-semibold shadow-sm hover:border-brand-purple/50 transition-all hover:-translate-y-1"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Philosophy & Hobbies */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6 p-8 rounded-4xl bg-brand-teal/5 border border-brand-teal/10">
          <h3 className="text-2xl font-bold dark:text-white tracking-tight">Why I Build</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            I’m drawn to projects that bridge the gap between <strong>logic and daily life</strong>. 
            Whether it’s automating a business process or building a mindful log, 
            my goal is to use my skills to build something that makes a difference.
          </p>
        </div>

        <div className="space-y-6 p-8">
          <h3 className="text-2xl font-bold dark:text-white tracking-tight">Beyond the code</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            When I&apos;m not in VS Code, you&apos;ll likely find me at the gym where I work as a fitness instructor, 
            in my congregation, in a cafe drinking coffeeor enjoying family life in Stavanger.
          </p>
        </div>
      </section>

      {/* Closing Quote */}
      <div className="mt-32 rounded-4xl bg-linear-to-r from-brand-purple/10 to-brand-teal/10 border border-white/10 p-12 text-center">
        <p className="italic text-xl text-gray-700 dark:text-gray-200 font-medium leading-relaxed">
          &quot;Complexity is easy. Simplicity is where the real work begins.&quot;
        </p>
      </div>

    </div>
  );
}