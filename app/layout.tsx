import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "700"],
});


export const metadata: Metadata = {
  title: "aevaksnes",
  description: "My portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <Navbar />
        <main className="grow flex flex-col ">
          {children}
        </main>
      </body>
    </html>
  );
}
