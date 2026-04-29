import LiveClock from "@/components/LiveClock";

/**
 * Contact page providing multiple ways to reach out.
 * Maintains the consistent bento-style card design.
 */



export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto py-24 px-6">
      {/* Header Section */}
      <h1 className="text-4xl md:text-5xl font-black mb-8 dark:text-white tracking-tighter">
        Let&apos;s connect
      </h1>
      
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
        Do you have questions, feedback or just want to say hi? 
        Feel free to reach out through any of the channels below. 
      </p>

      <div className="grid gap-6">
        {/* Email Card - Primary contact method */}
        <a href="mailto:developing.aevaksnes@gmail.com" 
           className="group p-8 rounded-4xl border border-gray-100 dark:border-white/10 hover:border-brand-purple transition-all bg-white dark:bg-white/5 shadow-sm">
          <h2 className="text-xs font-mono font-bold text-brand-purple mb-2 tracking-widest uppercase opacity-80">E-mail</h2>
          <p className="text-xl md:text-2xl font-bold dark:text-white group-hover:text-brand-purple transition-colors break-all">
            developing.aevaksnes@gmail.com
          </p>
        </a>

        {/* Secondary Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* GitHub Link */}
          <a href="https://github.com/aevaksnes" 
             target="_blank"
             rel="noopener noreferrer"
             className="group p-8 rounded-4xl border border-gray-100 dark:border-white/10 hover:border-brand-orange transition-all bg-white dark:bg-white/5 shadow-sm">
            <h2 className="text-xs font-mono font-bold text-brand-orange mb-2 tracking-widest uppercase opacity-80">GitHub</h2>
            <p className="text-lg font-bold dark:text-white group-hover:text-brand-orange transition-colors">Code & Repositories</p>
          </a>

        </div>
      </div>

      {/* Location Footer Note */}
      <div className="mt-20 p-8 rounded-4xl bg-brand-purple/5 border border-brand-purple/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold mb-1 dark:text-white">Based in Norway</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Work from my home in Stavanger.
          </p>
        </div>
        <div className="shrink-0">
          <LiveClock />
        </div>
      </div>
    </div>
  );
}