import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { AnimatedPageTitle, AnimatedWord } from "@/app/components/AnimatedTitle";
import { FadeInScroll } from "@/app/components/FadeInScroll";

const servicios = [
  {
    n: "01",
    title: "Charlas Estratégicas",
    desc: "Realizamos charlas estratégicas sobre ciclos, contingencias y coyunturas sociopolíticas, dirigidas a directorios, concejos, asambleas y otros espacios organizativos del mundo privado, empresarial, diplomático y de la sociedad civil en general, tanto a nivel nacional como internacional.",
    tags: ["Formación", "Estrategia"],
  },
  {
    n: "02",
    title: "Piensa Chile",
    desc: "Generamos reflexiones sobre el desarrollo del país y el futuro de la sociedad democrática, articulando a los principales actores y a las más reconocidas voces de la política nacional.",
    tags: ["Investigación", "Análisis"],
  },
  {
    n: "03",
    title: "Inteligencia Legislativa",
    desc: "Radar parlamentario siempre encendido. Elaboramos minutas e informes estratégicos de seguimiento, impacto y articulación de proyectos de ley, así como prospección de votaciones, stakeholders y movimientos clave en el Congreso.",
    tags: ["Legislativo", "Monitoreo"],
  },
  {
    n: "04",
    title: "Estudios",
    desc: "Desarrollamos reportes, informes y estudios sobre distintas temáticas de interés público que sirven como insumo estratégico para el proceso de toma de decisiones en instituciones públicas y privadas.",
    tags: ["Investigación", "Academia"],
  },
  {
    n: "05",
    title: "Informes de comunicación digital y estratégica",
    desc: "Analizamos la performance comunicacional de actores en el entorno digital y mediático, proveyendo recomendaciones e insumos para la toma de decisiones, el manejo de riesgos y la gestión de crisis derivados del actuar comunicativo de vocerías públicas y privadas.",
    tags: ["Digital", "Comunicación"],
  },
  {
    n: "06",
    title: "Informes de reputación y opinión pública digital",
    desc: "Escuchamos, monitoreamos, damos seguimiento y analizamos temáticas críticas, marcas y tendencias que circulan en la conversación pública digital, evaluando las dinámicas que caracterizan dicha conversación: su circulación, sus lógicas, impactos, audiencias y comunidades.",
    tags: ["Reputación", "Opinión Pública"],
  },
  {
    n: "07",
    title: "Informes de estudio de opinión",
    desc: "Diseñamos, aplicamos y/o analizamos encuestas para medir el clima social, la opinión pública, la opinión publicada y las más variadas aristas de los entornos sociopolíticos, económicos y culturales del país.",
    tags: ["Análisis", "Informes"],
  },
  {
    n: "08",
    title: "Análisis de proyección electoral",
    desc: "Diseñamos, analizamos y proyectamos resultados electorales. Con sustento teórico y rigor metodológico, prospectamos el comportamiento electoral a nivel nacional, regional y comunal, con técnicas e insumos georreferenciados.",
    tags: ["Electoral", "Proyección"],
  },
];

export default function Servicios() {
  return (
    <main>
      <Navbar />

      {/* ── Hero ── */}
      <section className="min-h-[55vh] bg-[#880E4F] flex flex-col justify-end pt-32 pb-20 px-6 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
            className="absolute top-0 right-0 w-[35vw] h-[35vw] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(244,143,177,0.15) 0%, transparent 70%)",
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto w-full relative z-10 pl-4">
          <FadeInScroll direction="right" delay={0.1}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-px bg-[#F48FB1]" />
              <span className="text-[#F48FB1] text-xs tracking-[0.35em] uppercase font-medium">
                Oferta institucional
              </span>
            </div>
          </FadeInScroll>
          <AnimatedPageTitle
            className="serif font-bold text-[#F5F5F5] leading-[1.08] mb-6"
            scrollFade={true}
          >
            <div className="overflow-hidden" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
              <AnimatedWord>Nuestros</AnimatedWord>{" "}
              <AnimatedWord className="text-[#F48FB1]">Servicios</AnimatedWord>
            </div>
          </AnimatedPageTitle>
          <FadeInScroll delay={0.6}>
            <p className="text-[#F5F5F5]/60 text-lg max-w-xl leading-relaxed">
              Ofrecemos ocho líneas de trabajo especializadas para organizaciones,
              instituciones y actores políticos que requieren análisis riguroso e
              inteligencia estratégica.
            </p>
          </FadeInScroll>
        </div>
      </section>

      {/* ── Services grid ── */}
      <section className="bg-[#F5F5F5] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {servicios.map((s, i) => (
              <FadeInScroll key={s.n} delay={i * 0.1}>
                <div
                  className="group border border-[#424242]/10 p-8 hover:border-[#D81B60] transition-all duration-300 relative overflow-hidden cursor-pointer h-full flex flex-col justify-between"
                >
                  {/* Watermark number */}
                  <span className="absolute right-5 bottom-4 serif font-bold text-[#D81B60]/[0.05] text-[5rem] leading-none select-none pointer-events-none">
                    {s.n}
                  </span>

                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <span className="text-[#D81B60] text-xs tracking-[0.3em] uppercase font-medium">
                        Servicio {s.n}
                      </span>
                      <div className="flex flex-wrap gap-1.5 justify-end">
                        {s.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-0.5 bg-[#4DB6AC]/10 text-[#4DB6AC] border border-[#4DB6AC]/20 tracking-[0.1em] uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="serif text-xl lg:text-2xl font-bold text-[#424242] mb-3 group-hover:text-[#D81B60] transition-colors leading-tight">
                      {s.title}
                    </h3>
                    <p className="text-[#424242]/55 text-sm leading-relaxed flex-1">
                      {s.desc}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-xs text-[#D81B60]/60 group-hover:text-[#D81B60] transition-colors tracking-widest uppercase">
                      <span>Solicitar información</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </FadeInScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#424242] py-20 px-6">
        <FadeInScroll>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#F48FB1]/60 text-xs tracking-[0.4em] uppercase font-medium mb-4">
              ¿Tienes un proyecto?
            </p>
            <h2 className="serif text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-6 leading-tight">
              Trabajemos juntos.
            </h2>
            <p className="text-[#F5F5F5]/50 text-lg max-w-md mx-auto mb-10 leading-relaxed">
              Cuéntanos sobre tu organización y el tipo de análisis que necesitas.
              Nuestro equipo te contactará a la brevedad.
            </p>
            <Link
              href="/contacto"
              className="inline-block bg-[#D81B60] text-white px-10 py-4 text-xs tracking-[0.3em] uppercase font-semibold hover:bg-[#880E4F] transition-all duration-300"
            >
              Contactar al equipo
            </Link>
          </div>
        </FadeInScroll>
      </section>

      <Footer />
    </main>
  );
}
