"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/ui/Logo";
import { navigation } from "@/data/company";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-950/95 backdrop-blur-lg border-b border-gold/10"
          : "bg-gradient-to-b from-navy-950/95 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <Logo size="sm" />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-gold ${
                pathname === item.href ? "text-gold" : "text-text-main"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="border border-gold text-gold-light px-6 py-2 rounded-full text-sm font-medium transition-all hover:bg-gold/10 hover:shadow-[0_0_20px_rgba(217,165,92,0.4)]"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-text-main p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy-950/98 backdrop-blur-xl border-b border-gold/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-lg font-medium transition-colors hover:text-gold ${
                    pathname === item.href ? "text-gold" : "text-text-main"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 border border-gold text-gold-light px-6 py-3 rounded-full text-center font-medium transition-all hover:bg-gold/10"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
