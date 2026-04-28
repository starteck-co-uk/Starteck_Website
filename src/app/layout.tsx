import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/layout/JsonLd";
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
    default: "StarTeck | AI Development Company Manchester, UK",
    template: "%s | StarTeck Manchester",
  },
  description:
    "StarTeck is a leading AI development company in Manchester, UK. We specialize in bespoke AI products, Agentic workflows, and Secure RAG systems engineered for excellence.",
  keywords: [
    "AI Development Manchester",
    "Tech Company Stretford",
    "Manchester AI Agency",
    "UK AI Solutions",
    "Custom AI Products",
    "Bespoke Software Manchester",
    "Agentic AI UK",
    "Secure RAG Systems",
    "StarTeck",
  ],
  metadataBase: new URL("https://www.starteck.co.uk"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://www.starteck.co.uk",
    siteName: "StarTeck",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <div className="ambient-bg" />
        <div className="grid-overlay" />
        <Navbar />
        <main className="flex-1 pt-32">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
