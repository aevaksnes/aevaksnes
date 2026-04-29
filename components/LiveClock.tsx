"use client";

import { useState, useEffect } from "react";

/**
 * A clean, live-updating clock displaying local time in Stavanger.
 */
export default function LiveClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-GB", {
        timeZone: "Europe/Oslo",
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(timeString);
    };

    updateTime();
    // We update every minute instead of every second now
    const timer = setInterval(updateTime, 60000);
    
    return () => clearInterval(timer);
  }, []);

  if (!time) return <div className="h-9 w-32 bg-gray-100 dark:bg-white/5 animate-pulse rounded-full" />;

  return (
    <div className="flex flex-col items-end gap-1">
      {/* Label indicating the location */}
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mr-2">
        Local time (Stavanger)
      </span>
      
      <div className="flex items-center gap-3 bg-white dark:bg-white/5 px-4 py-2 rounded-2xl border border-brand-purple/20 shadow-sm transition-all hover:border-brand-purple/50">
        <span className="relative flex h-2 w-2">
          <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
        </span>
        <span className="font-mono text-sm font-bold text-brand-purple tracking-wider">
          {time}
        </span>
      </div>
    </div>
  );
}