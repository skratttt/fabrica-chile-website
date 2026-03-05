"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <section id="newsletter" className="bg-[#D81B60] py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-white/45 text-xs tracking-[0.4em] uppercase font-medium mb-4">
          Newsletter
        </p>
        <h2
          className="serif font-bold text-white mb-5 leading-[1.1]"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
        >
          Mantente
          <br />
          Informado.
        </h2>
        <p className="text-white/65 text-lg max-w-sm mx-auto mb-10 leading-relaxed">
          Nuestras últimas columnas, estudios y destacados de Instagram directo
          a tu correo.
        </p>

        {submitted ? (
          <p className="serif text-xl text-white/90 tracking-wide">
            Gracias por suscribirte.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
              className="flex-1 bg-white/10 border border-white/25 text-white placeholder-white/35 px-6 py-4 text-sm focus:outline-none focus:border-white transition-colors"
            />
            <button
              type="submit"
              className="bg-white text-[#D81B60] px-8 py-4 text-xs tracking-[0.25em] uppercase font-bold hover:bg-[#880E4F] hover:text-white transition-all duration-300 shrink-0"
            >
              Suscribirse
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
