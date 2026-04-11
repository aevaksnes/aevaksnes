"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const menuLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Downloads", href: "/downloads" },
  { name: "Updates", href: "/updates" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
];

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const closeMenu = () => setMenu(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="p-4 shadow-md border-b-4 bg-brand-light dark:bg-brand-dark border-brand-dark dark:border-brand-light relative z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
        
        {/* Logo & Title */}
        <div className="flex items-center gap-4">
          <Link href="/" onClick={closeMenu} className="shrink-0">
            <Image src="/logo_light.png" alt="Logo" width={48} height={48} className="dark:hidden object-contain" priority />
            <Image src="/logo.png" alt="Logo" width={48} height={48} className="hidden dark:block object-contain" priority />
          </Link>
          <h1 className="text-4xl mb-2 font-bold text-brand-teal dark:hidden">aevaksnes</h1>
          <h1 className="text-4xl mb-2 font-bold text-brand-orange hidden dark:block">aevaksnes</h1>
        </div>

        {/* Mobile Hamburger Button */}
        <button className="lg:hidden p-2 rounded transition" onClick={() => setMenu(!menu)}>
          {menu ? <X size={32} /> : <Menu size={32} />}
        </button>

        {/* PC-menu */}
        <div className="hidden lg:flex flex-wrap gap-x-8 items-center font-bold text-sm xl:text-base">
          {menuLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 transition-colors duration-300
                  ${mounted && active 
                    ? "text-brand-purple dark:text-brand-orange" 
                    : "text-gray-600 dark:text-gray-300 hover:text-brand-teal dark:hover:text-brand-teal"
                  }`}
              >
                {link.name}
                {/* En animert underlinje som kun vises når aktiv */}
                {active && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-purple dark:bg-brand-orange rounded-full animate-in fade-in zoom-in duration-300" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile-menu */}
      {menu && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-brand-light dark:bg-brand-dark border-b-4 border-brand-dark dark:border-brand-light shadow-xl flex flex-col font-bold text-lg">
          {menuLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={`mobil-${link.href}`}
                href={link.href}
                onClick={closeMenu}
                className={`p-4 border-b last:border-none transition-colors
                  ${mounted && active 
                    ? "bg-brand-purple/10 text-brand-purple border-l-8 border-l-brand-purple" 
                    : "text-gray-700 dark:text-gray-200"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}