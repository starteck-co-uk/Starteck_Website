import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "StarTeck | Customized AI Products",
    template: "%s | StarTeck",
  },
  description:
    "StarTeck is the dedicated technology and AI innovation arm of StarFM. We specialize in designing, engineering, and deploying customized AI products that solve complex business challenges.",
  keywords: [
    "AI",
    "artificial intelligence",
    "custom AI solutions",
    "RAG",
    "prompt engineering",
    "agentic AI",
    "computer vision",
    "StarTeck",
    "StarFM",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <div className="ambient-bg" />
        <div className="grid-overlay" />
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
