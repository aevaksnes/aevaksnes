// src/components/Footer.tsx
import Link from "next/link";
import { Github, Mail } from "lucide-react";

/**
 * Global Footer component.
 * Provides navigation, social links, and branding at the bottom of every page.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-white/10 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand/Bio Section */}
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-black tracking-tighter dark:text-white">
              aevaksnes<span className="text-brand-purple">.</span>
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed">
              Coding as a hobby, building apps and websites that means something to me.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-bold mb-6 text-gray-900 dark:text-white text-base tracking-tight">
              Navigation
            </h4>
            <ul className="space-y-4">
              <li><Link href="/projects" className="text-gray-600 dark:text-gray-400 hover:text-brand-purple transition-colors">Projects</Link></li>
              <li><Link href="/updates" className="text-gray-600 dark:text-gray-400 hover:text-brand-orange transition-colors">Updates</Link></li>
              <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-brand-teal transition-colors">About me</Link></li>
              <li><Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-brand-purple transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Social Presence */}
          <div>
            <h4 className="font-bold mb-6 text-gray-900 dark:text-white text-base tracking-tight">
              Connect
            </h4>
            <div className="flex gap-4">
              <a 
                href="https://github.com/aevaksnes" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-brand-purple hover:border-brand-purple/50 transition-all shadow-sm"
              >
                <Github size={20} />
              </a>
              <a 
                href="mailto:developing.aevaksnes@gmail.com" 
                className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-brand-purple hover:border-brand-purple/50 transition-all shadow-sm"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and tech stack */}
        <div className="pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {currentYear} aevaksnes. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <span className="text-brand-purple font-bold">Next.js</span> & <span className="text-brand-teal font-bold">Firebase</span>
          </p>
        </div>
      </div>
    </footer>
  );
}