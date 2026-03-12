"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const serviciosOptions = [
  "Charlas Estratégicas",
  "Pensando Chile",
  "Inteligencia Legislativa",
  "Estudios",
  "Informes de Comunicación Digital y Estratégica",
  "Informes de Reputación y Opinión Pública Digital",
  "Informes de Estudio",
  "Análisis de Proyección Electoral",
  "Otro / Consulta General",
];

export default function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    organizacion: "",
    email: "",
    servicio: "",
    mensaje: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.mensaje) return;

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar el mensaje");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Ocurrió un error inesperado al enviar.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <Navbar />

      {/* ── Hero ── */}
      <section className="min-h-[50vh] bg-[#880E4F] flex flex-col justify-end pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute left-0 top-0 w-1 h-full bg-[#D81B60]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#F5F5F5 1px, transparent 1px), linear-gradient(90deg, #F5F5F5 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          className="absolute top-0 right-0 w-[35vw] h-[35vw] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(244,143,177,0.15) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto w-full relative z-10 pl-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-px bg-[#F48FB1]" />
            <span className="text-[#F48FB1] text-xs tracking-[0.35em] uppercase font-medium">
              Hablemos
            </span>
          </div>
          <h1
            className="serif font-bold text-[#F5F5F5] leading-[1.08] mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            Contacto
          </h1>
          <p className="text-[#F5F5F5]/60 text-lg max-w-md leading-relaxed">
            ¿Tienes un proyecto, consulta o quieres contratar alguno de nuestros
            servicios? Completa el formulario y te responderemos a la brevedad.
          </p>
        </div>
      </section>

      {/* ── Form + Info ── */}
      <section className="bg-[#F5F5F5] py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-16">
          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="border border-[#4DB6AC]/30 bg-[#4DB6AC]/5 p-12 text-center">
                <div className="text-[#4DB6AC] text-4xl mb-4">✓</div>
                <h3 className="serif text-2xl font-bold text-[#424242] mb-3">
                  Mensaje enviado
                </h3>
                <p className="text-[#424242]/55 leading-relaxed">
                  Gracias por contactarnos. Nos comunicaremos contigo en las
                  próximas 48 horas hábiles.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Nombre */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs tracking-[0.25em] uppercase text-[#424242]/50 font-medium">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre completo"
                      className="border border-[#424242]/15 bg-white px-5 py-3.5 text-sm text-[#424242] placeholder-[#424242]/30 focus:outline-none focus:border-[#D81B60] transition-colors"
                    />
                  </div>

                  {/* Organización */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs tracking-[0.25em] uppercase text-[#424242]/50 font-medium">
                      Organización
                    </label>
                    <input
                      type="text"
                      name="organizacion"
                      value={form.organizacion}
                      onChange={handleChange}
                      placeholder="Tu organización o empresa"
                      className="border border-[#424242]/15 bg-white px-5 py-3.5 text-sm text-[#424242] placeholder-[#424242]/30 focus:outline-none focus:border-[#D81B60] transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[0.25em] uppercase text-[#424242]/50 font-medium">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@correo.com"
                    className="border border-[#424242]/15 bg-white px-5 py-3.5 text-sm text-[#424242] placeholder-[#424242]/30 focus:outline-none focus:border-[#D81B60] transition-colors"
                  />
                </div>

                {/* Servicio */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[0.25em] uppercase text-[#424242]/50 font-medium">
                    Servicio de interés
                  </label>
                  <select
                    name="servicio"
                    value={form.servicio}
                    onChange={handleChange}
                    className="border border-[#424242]/15 bg-white px-5 py-3.5 text-sm text-[#424242] focus:outline-none focus:border-[#D81B60] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Selecciona un servicio…</option>
                    {serviciosOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mensaje */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[0.25em] uppercase text-[#424242]/50 font-medium">
                    Mensaje *
                  </label>
                  <textarea
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Cuéntanos sobre tu proyecto o consulta…"
                    className="border border-[#424242]/15 bg-white px-5 py-3.5 text-sm text-[#424242] placeholder-[#424242]/30 focus:outline-none focus:border-[#D81B60] transition-colors resize-none"
                  />
                </div>

                {errorMsg && (
                  <p className="text-red-500 text-sm mt-2">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="self-start bg-[#D81B60] text-white px-10 py-4 text-xs tracking-[0.3em] uppercase font-semibold hover:bg-[#880E4F] transition-all duration-300 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            )}
          </div>

          {/* Info sidebar */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-[#D81B60] text-xs tracking-[0.3em] uppercase font-medium mb-4">
                Información
              </p>
              <div className="w-8 h-px bg-[#D81B60] mb-6" />

              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-[#424242]/40 text-xs tracking-[0.2em] uppercase mb-1">
                    Correo
                  </p>
                  <p className="text-[#424242] text-sm">contacto@fabricachile.cl</p>
                </div>
                <div>
                  <p className="text-[#424242]/40 text-xs tracking-[0.2em] uppercase mb-1">
                    Instagram
                  </p>
                  <p className="text-[#424242] text-sm">@fabricachile</p>
                </div>
                <div>
                  <p className="text-[#424242]/40 text-xs tracking-[0.2em] uppercase mb-1">
                    Ubicación
                  </p>
                  <p className="text-[#424242] text-sm">Santiago, Chile</p>
                </div>
                <div>
                  <p className="text-[#424242]/40 text-xs tracking-[0.2em] uppercase mb-1">
                    Tiempo de respuesta
                  </p>
                  <p className="text-[#424242] text-sm">48 horas hábiles</p>
                </div>
              </div>
            </div>

            {/* Servicios quick list */}
            <div className="border-t border-[#424242]/10 pt-8">
              <p className="text-[#424242]/40 text-xs tracking-[0.2em] uppercase mb-4">
                Nuestros Servicios
              </p>
              <ul className="flex flex-col gap-2.5">
                {serviciosOptions.slice(0, -1).map((s) => (
                  <li
                    key={s}
                    className="text-[#424242]/55 text-xs leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-[#D81B60] mt-0.5 shrink-0">›</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
