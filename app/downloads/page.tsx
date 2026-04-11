import { DOWNLOADS } from "@/constants/downloads";

export default function Downloads() {

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <header className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4 dark:text-white">Downloads</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Download pre-made prompt sets. Use them as a starting point for your Braindump sessions, or customize them to fit your unique needs.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {DOWNLOADS.map((file) => (
          <div key={file.filename} className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 rounded-full bg-brand-teal/10 text-brand-teal text-xs font-bold uppercase tracking-wider">
                  JSON File
                </span>
                <span className="text-sm text-gray-400 font-mono">{file.size}</span>
              </div>
              <h2 className="text-2xl font-bold mb-2 dark:text-white">{file.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {file.description}
              </p>
            </div>

            {/* Download button */}
            <a 
              href={`/downloads/braindump_prompts/${file.filename}`}
              download={file.filename} // This forces download instead of opening in browser
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-brand-purple text-white font-bold hover:bg-brand-purple/90 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              Download JSON
            </a>
          </div>
        ))}
      </div>

      <div className="mt-20 p-8 rounded-3xl bg-brand-orange/5 border border-brand-orange/10 text-center">
        <h3 className="text-lg font-bold mb-2 dark:text-white">How to import?</h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Open the Braindump app, go to settings and select "Import Prompts". 
          Choose the file you have downloaded here, and you're ready to go!
        </p>
      </div>
    </div>
  );
}
