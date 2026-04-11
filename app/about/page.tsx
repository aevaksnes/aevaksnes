import { TAGS } from "@/constants/tags";
import Image from "next/image";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      {/* Intro Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-32">
        <div>
          <h1 className="text-5xl font-bold mb-8 dark:text-white tracking-tight">My Journey</h1>

          <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>
              My name is <span className="text-black dark:text-white font-medium">Eva</span>.
              I’m a 46-year-old developer with a background in both
              <span className="bg-brand-purple/10 text-brand-purple px-1 rounded">economics and code</span>.
            </p>

            <p>
              My journey started in high school with Basic computer science. In college, I studied economics and computer science.
              I always loved the <strong>problem-solving aspect</strong> of programming and spent a few years as a developer for ERP-systems like Axapta (Dynamics 365).
            </p>

            <p className="italic border-l-2 border-brand-purple/30 pl-4 py-1">
              "Life happened, and I spent years focusing on family and accounting, but the itch to
              build something from scratch never truly went away."
            </p>

            <p>
              Now, I’m diving back into <strong>modern technologies</strong>, bringing years of experience
              and a fresh passion for creating tools that actually help people.
            </p>
          </div>
        </div>

        {/* Profile Image with "Bento" styling */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-brand-purple to-blue-500 rounded-4xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative h-112.5 w-full rounded-3xl overflow-hidden bg-gray-100 dark:bg-card-bg border border-white/10 shadow-2xl">
            <Image
              src="/programming.jpg"
              alt="Eva at work"
              fill
              className="object-cover transition transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="mb-32 p-12 rounded-[2.5rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Technical Toolkit</h2>
          <p className="text-gray-500">The languages and frameworks I use to bring ideas to life.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {Object.values(TAGS).map((tag) => (
            <span
              key={tag}
              className="px-6 py-3 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 font-medium shadow-sm hover:border-brand-purple/50 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-2xl font-bold dark:text-white">From Idea to Impact</h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Take <span className="text-black dark:text-white font-semibold italic">Braindump</span>, for example.
            It started with a need to clear the mental clutter that keeps us awake at night.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Building it taught me that development isn't just about syntax—it's about <strong>meeting a need</strong>.
            Understanding the user’s peace of mind is just as important as the state management of the app.
          </p>
        </div>
      </section>

      <section className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="p-8 rounded-3xl bg-brand-teal/5 border border-brand-teal/10">
          <h3 className="text-xl font-bold mb-4 dark:text-white">Why I Build</h3>
          <p className="text-gray-600 dark:text-gray-400">
            I’m drawn to projects that bridge the gap between <strong>logic and daily life</strong>.
            Whether it’s automating a family business or building a mindful photo log,
            my goal is always the same: to reduce mental load and create space for what matters.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold dark:text-white font-mono uppercase tracking-widest">Beyond the code</h3>
          <p className="text-gray-600 dark:text-gray-400">
            When I'm not in VS Code, you'll likely find me at the gym where I work as a fitness instructor, organizing projects (yes, I have an app for that),
            or enjoying the balance of family life in Stavanger.
          </p>
        </div>
      </section>

      {/* Oppdatert Sitat-boks helt nederst */}
      <div className="mt-24 h-full min-h-32 rounded-3xl bg-linear-to-r from-brand-purple/10 to-brand-teal/10 border border-white/5 flex items-center justify-center p-8 text-center italic text-lg text-gray-500 dark:text-gray-300">
        "Complexity is easy. Simplicity is where the real work begins."
      </div>

    </div>
  );
}