
import Image from "next/image";
import Link from "next/link";
import { Code, FileTerminal, Mail } from 'lucide-react'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      
      <section className="flex flex-col items-center justify-center pt-20 pb-20 font-sans">
        {/* Profile Picture */}
        <div className="mb-8 border-4 border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl">
          <Image src="/profile.png" alt="Profile picture" width={250} height={250} className="rounded-2xl" />
        </div>

        {/* Title and Hook */}
        <div className="text-center max-w-xl mb-12 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight text-gray-900 dark:text-gray-100">
            Hi, I'm aevaksnes!
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Welcome to my homepage. This is where I share my programming <span className="text-brand-purple font-semibold">projects</span>, ideas, and document my journey.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full px-4">
          
          {/* PROJECTS CARD */}
          <Link href="/projects" className="group bg-white dark:bg-white/5 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-lg hover:border-brand-purple hover:scale-[1.03] transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl p-3 rounded-2xl bg-brand-purple/10 text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-colors">
                <Code className="w-8 h-8 text-brand-purple group-hover:text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Projects
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              A mix of finished projects and work in progress. Apps, web apps, libraries...
            </p>
            <div className="text-brand-purple font-bold flex items-center gap-2">
              See my work <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* BLOG CARD */}
          <Link href="/blog" className="group bg-white dark:bg-white/5 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-lg hover:border-brand-orange hover:scale-[1.03] transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl p-3 rounded-2xl bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors">
                <FileTerminal className="w-8 h-8 text-brand-orange group-hover:text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Blog
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              See what I am currently working on, new projects, new concepts, and more. I share updates on my programming journey and other thoughts.
            </p>
            <div className="text-brand-orange font-bold flex items-center gap-2">
              Read updates <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* CONTACT CARD */}
          <Link href="/contact" className="group bg-white dark:bg-white/5 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-lg hover:border-brand-teal hover:scale-[1.03] transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl p-3 rounded-2xl bg-brand-teal/10 text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-colors">
                <Mail className="w-8 h-8 text-brand-teal group-hover:text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Contact
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Have a question, a comment, an idea or maybe want to collaborate? Feel free to reach out and say hello.
            </p>
            <div className="text-brand-teal font-bold flex items-center gap-2">
              Get in touch <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

        </div>
      </section>
    </main>
  )
}
