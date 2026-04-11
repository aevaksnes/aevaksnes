export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-8 dark:text-white">Let's connect</h1>
      
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
        Do you have a project in mind, want to collaborate, or just want to say hi? Feel free to reach out through any of the channels below. 
      </p>

      <div className="grid gap-6">
        {/* E-post kort */}
        <a href="mailto:developing.aevaksnes@gmail.com" 
           className="group p-6 rounded-3xl border border-gray-100 dark:border-white/10 hover:border-brand-purple transition-all bg-white dark:bg-white/5 shadow-sm">
          <h2 className="text-sm font-mono text-brand-purple mb-1">E-mail</h2>
          <p className="text-xl font-bold dark:text-white group-hover:underline">developing.aevaksnes@gmail.com</p>
        </a>

        {/* GitHub */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <a href="https://github.com/aevaksnes" 
             className="group p-6 rounded-3xl border border-gray-100 dark:border-white/10 hover:border-brand-orange transition-all bg-white dark:bg-white/5">
            <h2 className="text-sm font-mono text-brand-orange mb-1">GitHub</h2>
            <p className="text-lg font-bold dark:text-white italic">Code & Repositories</p>
          </a>
        </div>
      </div>

      <div className="mt-20 p-8 rounded-3xl bg-brand-purple/5 border border-brand-purple/10">
        <h3 className="text-lg font-bold mb-2 dark:text-white">Based in Norway 🇳🇴</h3>
        <p className="text-gray-600 dark:text-gray-400">
          I work mostly remotely, but I might be open to a coffee in the Stavanger area.
        </p>
      </div>
    </div>
  );
}