import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "600", "700", "800", "900"],
});

/**
 * Global Metadata for SEO and Social Sharing.
 * This is what appears in Google searches and when sharing links.
 */
export const metadata: Metadata = {
  title: {
    default: "aevaksnes | Portfolio",
    template: "%s | aevaksnes" // This allows sub-pages to have titles like "Projects | aevaksnes"
  },
  description: "A portfolio showcasing my journey back into programming, featuring projects, updates, and digital resources.",
  keywords: ["Developer", "Next.js", "Firebase", "Flutter", "Portfolio", "Software Engineering"],
  authors: [{ name: "aevaksnes" }],
  creator: "aevaksnes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${nunito.variable} font-sans antialiased flex flex-col min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100`}>
        
        {/* Navigation Bar - Stays constant across all pages */}
        <Navbar />
        
        {/* Main Content Area - Grows to fill the screen if content is short */}
        <main className="grow flex flex-col">
          {children}
        </main>

        {/* Footer - Across all pages */}
        <Footer />

      </body>
    </html>
  );
}