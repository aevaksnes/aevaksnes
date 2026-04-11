import { UPDATES, CATEGORY_STYLES } from "@/constants/updates";
import Date from "@/components/SmartDate";



export default function Updates() {
  return (
    <div className="max-w-3xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-16 dark:text-white">Updates</h1>
      
      <div className="space-y-0"> {/* We use padding instead of gap to keep the line intact */}
        {UPDATES.map((update, index) => (
          <div key={update.id} className="flex gap-6 md:gap-10 group">
            
            {/* Timeline */}
            <div className="flex flex-col items-center">
              <div className={`w-4 h-4 rounded-full mt-1.5 shrink-0 ${CATEGORY_STYLES[update.category]}`} />
              {index !== UPDATES.length - 1 && (
                <div className="w-1 h-full bg-gray-200 dark:bg-white/10 my-2 rounded-full" />
              )}
            </div>

            {/* Content Column */}
            <div className="pb-16 flex-1">
              <time className="font-mono text-sm text-gray-500 dark:text-gray-400 uppercase tracking-tighter">
                <Date dateString={update.date} />
              </time>
              
              <h2 className="text-2xl font-bold mt-2 mb-4 dark:text-white group-hover:text-brand-purple transition-colors">
                {update.title}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {update.content}
              </p>

              {update.image && (
                <div className="mt-6 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5">
                  <img src={update.image} alt="" className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity" />
                </div>
              )}

              {update.links && (
                <div className="mt-4 flex gap-4">
                  {update.links.map(link => (
                    <a key={link.url} href={link.url} className="text-sm font-bold text-brand-teal hover:underline">
                      {link.label} →
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}