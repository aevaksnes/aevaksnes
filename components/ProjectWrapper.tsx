/**
 * ProjectWrapper provides the layout shell for individual project pages.
 * Focuses on high-contrast typography and clean spacing.
 */
export function ProjectWrapper({ 
  children, 
  title, 
  tags 
}: { 
  children: React.ReactNode, 
  title: string, 
  tags: string[] 
}) {
  return (
    <article className="max-w-4xl mx-auto py-24 px-6 animate-in fade-in duration-700">
      <header className="mb-20">
        {/* The main project title - bold, black and confident */}
        <h1 className="text-5xl md:text-7xl font-black mb-6 dark:text-white tracking-tighter leading-tight">
          {title}
        </h1>
        
        {/* Subtle tags to keep the focus on the title */}
        <div className="flex flex-wrap gap-3">
          {tags.map(t => (
            <span 
              key={t} 
              className="text-xs font-bold font-mono text-brand-purple/60 dark:text-brand-orange/60 tracking-wider"
            >
              #{t.toLowerCase()}
            </span>
          ))}
        </div>
      </header>
      
      {/* Page content */}
      <main className="space-y-16">
        {children}
      </main>
    </article>
  );
}