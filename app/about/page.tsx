import { TAGS } from "@/constants/tags";
import Image from "next/image";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      {/* Intro Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div>
          <h1 className="text-4xl font-bold mb-6 dark:text-white">My Journey</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            My name is Eva. I am 46 years old, married for 30 years, and a mother of two teenagers. 
            I have a background in economics and accounting, but my true passion has always been programming. 
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            My first experience with programming was in high school, where I did a class of basic computer science. 
            I loved the problem-solving ascpect of programming, and later when I did my very sensible education in economics and accounting, 
            I also kept taking programming classes. 
            After finishing my education, I found work as a programmer in an ERP-system, then called Axapta (now Dynamics 365).
            Life happened, and I became a stay at home mother for quite a few years, working from home with accounting.
            But I have missed programming and started to look into newer technologies.
            </p>
        </div>
        
        {/* Image of me at work */}
        <div className="relative h-80 w-full rounded-3xl overflow-hidden bg-gray-100 dark:bg-white/5 border border-white/10 shadow-xl">
           <div className="absolute inset-0 flex items-center justify-center text-gray-400 italic">
             <Image src="/programming.jpg" alt="Programming" fill className="object-cover" unoptimized />
           </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold mb-8 dark:text-white">Technologies I am using</h2>
        <div className="flex flex-wrap gap-3">
          {Object.values(TAGS).map((tag) => (
            <span 
              key={tag}
              className="px-5 py-2 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Historie/Galleri Seksjon */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-8 rounded-3xl bg-brand-purple/5 border border-brand-purple/10">
          <h3 className="text-xl font-bold mb-4 dark:text-white">From idea to app</h3>
          <p className="text-gray-600 dark:text-gray-400">
            The journey of creating Braindump has been an incredible learning experience.
            It all started with a simple idea: to create a tool that could help me and others free their minds from the thouhts that keeps us from being present and focused. 
            I went through several iterations of the app, experimenting with different features and designs. 
            Along the way, I learned a lot about mobile development, user experience, and the importance of feedback from real users. 
            I'm excited to continue improving Braindump and see how it can help others find clearity and peace of mind in their daily lives.
          </p>
        </div>
        
        {/* Plass til bilde 2: Et skjermbilde av kode eller en tidlig skisse */}
        <div className="h-full min-h-50 rounded-3xl overflow-hidden bg-gray-100 dark:bg-white/5 border border-white/10">
           <div className="flex items-center justify-center h-full text-gray-400 italic px-4 text-center">
             [Bilde: Tidlig skisse / Mockup]
           </div>
        </div>
      </section>
    </div>
  );
}