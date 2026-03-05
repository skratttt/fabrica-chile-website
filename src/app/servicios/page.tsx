import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const servicios = [
  {
    n: "01",
    title: "Charlas Estratégicas",
    desc: "Presentaciones y talleres especializados para equipos políticos, empresariales y organizaciones sobre el escenario político actual, tendencias y análisis de coyuntura.",
    tags: ["Formación", "Estrategia"],
  },
  {
    n: "02",
    title: "Pensando Chile",
    desc: "Programa de reflexión y análisis sobre los desafíos estructurales, oportunidades y dilemas del desarrollo político y social chileno contemporáneo.",
    tags: ["Investigación", "Análisis"],
  },
  {
    n: "03",
    title: "Inteligencia Legislativa",
    desc: "Seguimiento, análisis e interpretación del proceso legislativo: tramitación de proyectos, votaciones clave, actores parlamentarios y su impacto en el escenario político.",
    tags: ["Legislativo", "Monitoreo"],
  },
  {
    n: "04",
    title: "Estudios",
    desc: "Investigaciones académicas y aplicadas sobre fenómenos políticos, electorales y sociales en Chile. Incluye estudios longitudinales, comparativos y de caso.",
    tags: ["Investigación", "Academia"],
  },
  {
    n: "05",
    title: "Informes de Comunicación Digital y Estratégica",
    desc: "Análisis del ecosistema digital político: narrativas predominantes, tendencias en redes sociales, estrategias de comunicación y posicionamiento de actores.",
    tags: ["Digital", "Comunicación"],
  },
  {
    n: "06",
    title: "Informes de Reputación y Opinión Pública Digital",
    desc: "Medición y análisis de la presencia digital de actores políticos, instituciones y marcas, y su relación con la opinión pública en entornos digitales.",
    tags: ["Reputación", "Opinión Pública"],
  },
  {
    n: "07",
    title: "Informes de Estudio",
    desc: "Documentos analíticos especializados sobre temáticas políticas y sociales de coyuntura. Entregables ágiles con análisis profundo y recomendaciones accionables.",
    tags: ["Análisis", "Informes"],
  },
  {
    n: "08",
    title: "Análisis de Proyección Electoral",
    desc: "Modelamiento y proyección de escenarios electorales basados en datos históricos, tendencias actuales, opinión pública y variables contextuales del proceso político.",
    tags: ["Electoral", "Proyección"],
  },
];

export default function Servicios() {
  return (
    <main>
      <Navbar />

      {/* ── Hero ── */}
      <section className="min-h-[55vh] bg-[#880E4F] flex flex-col justify-end pt-32 pb-20 px-6 relative overflow-hidden">
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
              Oferta institucional
            </span>
          </div>
          <h1
            className="serif font-bold text-[#F5F5F5] leading-[1.08] mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            Nuestros <span className="text-[#F48FB1]">Servicios</span>
          </h1>
          <p className="text-[#F5F5F5]/60 text-lg max-w-xl leading-relaxed">
            Ofrecemos ocho líneas de trabajo especializadas para organizaciones,
            instituciones y actores políticos que requieren análisis riguroso e
            inteligencia estratégica.
          </p>
        </div>
      </section>

      {/* ── Services grid ── */}
      <section className="bg-[#F5F5F5] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {servicios.map((s) => (
              <div
                key={s.n}
                className="group border border-[#424242]/10 p-8 hover:border-[#D81B60] transition-all duration-300 relative overflow-hidden cursor-pointer"
              >
                {/* Watermark number */}
                <span className="absolute right-5 bottom-4 serif font-bold text-[#D81B60]/[0.05] text-[5rem] leading-none select-none pointer-events-none">
                  {s.n}
                </span>

                <div className="relative z-10">
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
                  <p className="text-[#424242]/55 text-sm leading-relaxed">
                    {s.desc}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs text-[#D81B60]/60 group-hover:text-[#D81B60] transition-colors tracking-widest uppercase">
                    <span>Solicitar información</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#424242] py-20 px-6">
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
      </section>

      <Footer />
    </main>
  );
}
