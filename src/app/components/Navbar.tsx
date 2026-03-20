"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const SITE_NAME = "Fabrica Chile";

const navLinks = [
  { label: "Sobre Nosotros", href: "/sobre-nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Opinión", href: "/#columns" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href !== "/#columns" && pathname === href;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-[#F5F5F5] transition-all duration-300 ${scrolled ? "shadow-[0_1px_0_rgba(66,66,66,0.1)]" : ""
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between border-b border-[#424242]/10">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center"
        >
          <Image
            src="/assets/logo-black.png"
            alt={SITE_NAME}
            width={200}
            height={55}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] font-medium uppercase">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${isActive(link.href)
                ? "text-[#D81B60]"
                : "text-[#424242]/60 hover:text-[#D81B60]"
                }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            className={`transition-colors px-5 py-2.5 ${pathname === "/contacto"
              ? "bg-[#880E4F] text-white"
              : "bg-[#D81B60] text-white hover:bg-[#880E4F]"
              }`}
          >
            Contacto
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span
            className={`w-6 h-px bg-[#424242] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
          />
          <span
            className={`w-6 h-px bg-[#424242] transition-all duration-300 ${menuOpen ? "opacity-0" : ""
              }`}
          />
          <span
            className={`w-6 h-px bg-[#424242] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#F5F5F5] border-b border-[#424242]/10 px-6 py-6 flex flex-col gap-5 text-sm tracking-[0.2em] uppercase">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`transition-colors ${isActive(link.href)
                ? "text-[#D81B60]"
                : "text-[#424242]/70 hover:text-[#D81B60]"
                }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            onClick={() => setMenuOpen(false)}
            className="text-[#D81B60] font-medium"
          >
            Contacto →
          </Link>
        </div>
      )}
    </nav>
  );
}
