"use client";

export default function NewsletterForm() {
  return (
    <section id="newsletter" className="bg-[#D81B60] py-24 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <p className="text-white/45 text-xs tracking-[0.4em] uppercase font-medium mb-4">
          Boletín
        </p>
        <h2
          className="serif font-bold text-white mb-5 leading-[1.1]"
          style={{ fontSize: "clamp(2rem, 5.5vw, 4.2rem)" }}
        >
          Claves de la agenda mediática.
        </h2>
        <p className="text-white/65 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Mantente informado de las noticias más mencionadas por los medios de prensa nacionales.
        </p>

        <a
          href="#"
          className="inline-block bg-white text-[#D81B60] px-10 py-5 text-xs tracking-[0.25em] uppercase font-bold hover:bg-[#880E4F] hover:text-white transition-all duration-300 shadow-xl"
        >
          Descargar Último Boletín
        </a>
      </div>
    </section>
  );
}
