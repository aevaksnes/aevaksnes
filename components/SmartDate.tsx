"use client";

import { useEffect, useState } from "react";

export default function SmartDate({ dateString }: { dateString: string }) {
  const [mounted, setMounted] = useState(false);

  // We need to wait until the component is mounted to ensure that the date is rendered correctly on the client side, avoiding hydration issues with server-side rendering.
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Before hydration, we return an invisible span to avoid mismatch between server and client rendering
    return <span className="opacity-0">{dateString}</span>;
  }

  const date = new Date(dateString);
  
  return (
    <span>
      {date.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })}
    </span>
  );
}