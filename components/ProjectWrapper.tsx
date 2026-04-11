export function ProjectWrapper({ children, title, tags }: { children: React.ReactNode, title: string, tags: string[] }) {
  return (
    <article className="max-w-4xl mx-auto py-20 px-6">
      <header className="mb-12">
        <h1 className="text-5xl font-bold mb-4 dark:text-white">{title}</h1>
        <div className="flex gap-2">
          {tags.map(t => <span key={t} className="text-xs font-mono opacity-50">#{t}</span>)}
        </div>
      </header>
      
      {children}
    </article>
  );
}