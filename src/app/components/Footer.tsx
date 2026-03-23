import Link from "next/link";
import Image from "next/image";

const SITE_NAME = "Fabrica Chile";
const TAGLINE = "Ideas. Analysis. Perspective.";

const contentLinks = [
  { label: "Opinión", href: "/#columns" },
  { label: "Instagram", href: "/#instagram" },
  { label: "Podcast", href: "/#podcast" },
  { label: "Productos", href: "/#studies" },
];

const aboutLinks = [
  { label: "Nosotros", href: "/sobre-nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Contacto", href: "/contacto" },
  { label: "Boletín", href: "/#newsletter" },
];

export default function Footer() {
  return (
    <footer className="bg-[#424242] px-6 pt-16 pb-8 border-t border-[#F5F5F5]/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 pb-12 border-b border-[#F5F5F5]/10">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="mb-6 inline-block"
            >
              <Image
                src="/assets/logo-black.png"
                alt={SITE_NAME}
                width={200}
                height={55}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-[#F5F5F5]/35 text-sm leading-relaxed max-w-[220px] mt-4">
              Un centro de pensamiento comprometido con el análisis, la
              investigación independiente y el debate público abierto.
            </p>
          </div>

          {/* Content */}
          <div>
            <h4 className="text-[#F5F5F5]/30 text-xs tracking-[0.3em] uppercase mb-5">
              Contenido
            </h4>
            <ul className="flex flex-col gap-3.5">
              {contentLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#F5F5F5]/55 text-sm hover:text-[#F48FB1] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-[#F5F5F5]/30 text-xs tracking-[0.3em] uppercase mb-5">
              Institución
            </h4>
            <ul className="flex flex-col gap-3.5">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#F5F5F5]/55 text-sm hover:text-[#F48FB1] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#F5F5F5]/20 text-xs leading-relaxed text-center md:text-left">
            © 2026 {SITE_NAME}. Todos los derechos reservados. <span className="hidden md:inline mx-1">|</span><br className="md:hidden" />
            Desarrollado por <strong className="font-bold text-[#F5F5F5]/40">MugiwaraDev</strong>®
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/fabrica_chile/?hl=es"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5F5F5]/20 text-xs tracking-[0.2em] uppercase hover:text-[#F48FB1] transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://x.com/Fabrica_Chile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5F5F5]/20 text-xs tracking-[0.2em] uppercase hover:text-[#F48FB1] transition-colors"
            >
              Twitter / X
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
