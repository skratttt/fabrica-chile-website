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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://script.google.com/macros/s/AKfycbxSv5QiukNC8G9v4LskyHCnBztl8zmyiDk7_Sksfxo30mPPivQ0nv3_vm6JfUv5Pog/exec"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#D81B60] px-10 py-5 text-xs tracking-[0.25em] uppercase font-bold hover:bg-[#880E4F] hover:text-white transition-all duration-300 shadow-xl"
          >
            Suscríbete
          </a>
          <a
            href="https://wa.me/56936901276?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20el%20bolet%C3%ADn%20Claves%20de%20la%20agenda%20medi%C3%A1tica"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-10 py-5 text-xs tracking-[0.25em] uppercase font-bold hover:bg-[#1DA851] transition-all duration-300 shadow-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            Pídelo por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
