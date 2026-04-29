import Image from "next/image";
import Link from "next/link";
import { Code, FileTerminal, Mail } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 md:p-24">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center max-w-4xl w-full">
        
        {/* Profile Picture */}
        <div className="mb-10 border-4 border-white dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden transform hover:rotate-2 transition-transform duration-500">
          <Image 
            src="/profile.png" 
            alt="Eva's profile picture" 
            width={220} 
            height={220} 
            className="object-cover"
            priority // Loads this image first for better LCP performance
          />
        </div>

        {/* Hook & Introduction */}
        <div className="max-w-2xl mb-16">
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-gray-900 dark:text-gray-100">
            Hi, I&apos;m <span className="text-brand-purple">aevaksnes</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
            I code as a hobby. I build apps and websites that means something to me. Explore my <span className="text-brand-purple font-semibold italic">projects</span> and follow my journey back into programming.
          </p>
        </div>

        {/* Navigation Grid: Direct access to main areas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          
          {/* PROJECTS CARD */}
          <Link href="/projects" className="group bg-white dark:bg-white/5 p-8 rounded-4xl border border-gray-100 dark:border-white/10 shadow-xl hover:border-brand-purple/50 hover:-translate-y-2 transition-all duration-300 flex flex-col text-left">
            <div className="p-3 rounded-2xl bg-brand-purple/10 text-brand-purple w-fit mb-6 group-hover:bg-brand-purple group-hover:text-white transition-colors">
              <Code size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-3 dark:text-white">Projects</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 flex-1">
              A collection of apps and websites.
            </p>
            <div className="text-brand-purple font-bold flex items-center gap-2 mt-auto">
              See my work <span className="group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </Link>

          {/* UPDATES CARD */}
          <Link href="/updates" className="group bg-white dark:bg-white/5 p-8 rounded-4xl border border-gray-100 dark:border-white/10 shadow-xl hover:border-brand-orange/50 hover:-translate-y-2 transition-all duration-300 flex flex-col text-left">
            <div className="p-3 rounded-2xl bg-brand-orange/10 text-brand-orange w-fit mb-6 group-hover:bg-brand-orange group-hover:text-white transition-colors">
              <FileTerminal size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-3 dark:text-white">Updates</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 flex-1">
              What am I working on, I will try to keep you updated.
            </p>
            <div className="text-brand-orange font-bold flex items-center gap-2 mt-auto">
              Follow along <span className="group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </Link>

          {/* CONTACT CARD */}
          <Link href="/contact" className="group bg-white dark:bg-white/5 p-8 rounded-4xl border border-gray-100 dark:border-white/10 shadow-xl hover:border-brand-teal/50 hover:-translate-y-2 transition-all duration-300 flex flex-col text-left">
            <div className="p-3 rounded-2xl bg-brand-teal/10 text-brand-teal w-fit mb-6 group-hover:bg-brand-teal group-hover:text-white transition-colors">
              <Mail size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-3 dark:text-white">Contact</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 flex-1">
              Have a question or maybe some feedback? I&apos;d love to hear from you.
            </p>
            <div className="text-brand-teal font-bold flex items-center gap-2 mt-auto">
              Get in touch <span className="group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </Link>

        </div>
      </section>
    </main>
  );
}