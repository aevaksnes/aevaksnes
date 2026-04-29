"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

/**
 * Menu links configuration for easy maintenance
 */
const menuLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Downloads", href: "/downloads" },
  { name: "Updates", href: "/updates" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Prevention of hydration mismatch by ensuring component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  /**
   * Checks if a link is active based on the current path
   */
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-brand-light/80 dark:bg-brand-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

        {/* Logo & Brand Identity */}
        <div className="flex items-center gap-4">
          <Link href="/" onClick={closeMenu} className="shrink-0 transition-transform hover:scale-105">
            <Image
              src="/logo_light.png"
              alt="aevaksnes logo"
              width={42}
              height={42}
              className="dark:hidden"
              priority
            />
            <Image
              src="/logo.png"
              alt="aevaksnes logo"
              width={42}
              height={42}
              className="hidden dark:block"
              priority
            />
          </Link>
          <span className="text-2xl font-black tracking-tighter text-brand-teal dark:text-brand-orange">
            aevaksnes
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-x-8 font-semibold text-base tracking-tight">
          {menuLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 transition-all duration-300
          ${mounted && active
                    ? "text-brand-purple dark:text-brand-orange"
                    : "text-gray-600 hover:text-brand-teal dark:text-gray-300 dark:hover:text-brand-teal"
                  }`}
              >
                {link.name}
                {mounted && active && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-purple dark:bg-brand-orange rounded-full animate-in slide-in-from-left-2 duration-500" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-gray-600 dark:text-gray-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-brand-light dark:bg-brand-dark border-b border-gray-200 dark:border-white/10 shadow-2xl animate-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col p-4">
            {menuLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={`mobile-${link.href}`}
                  href={link.href}
                  onClick={closeMenu}
                  className={`p-4 rounded-xl font-bold transition-all
                    ${mounted && active
                      ? "bg-brand-purple/10 text-brand-purple"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}