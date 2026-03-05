import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const valores = [
  {
    n: "01",
    title: "Rigor Analítico",
    desc: "Toda nuestra investigación se sustenta en metodologías sólidas y datos verificables.",
  },
  {
    n: "02",
    title: "Independencia",
    desc: "Mantenemos una perspectiva libre de intereses partidarios o corporativos.",
  },
  {
    n: "03",
    title: "Transparencia",
    desc: "Hacemos públicas nuestras metodologías y procesos de investigación.",
  },
  {
    n: "04",
    title: "Innovación",
    desc: "Incorporamos nuevas herramientas y enfoques para el análisis político contemporáneo.",
  },
  {
    n: "05",
    title: "Compromiso Democrático",
    desc: "Trabajamos por el fortalecimiento de las instituciones y el debate democrático.",
  },
];

const areasFoco = [
  {
    icon: "◈",
    title: "Política y Democracia",
    desc: "Análisis de sistemas políticos, procesos electorales e instituciones democráticas en Chile y América Latina.",
  },
  {
    icon: "◈",
    title: "Comunicación Digital",
    desc: "Estrategias de comunicación política en entornos digitales y análisis del ecosistema de redes sociales.",
  },
  {
    icon: "◈",
    title: "Inteligencia Legislativa",
    desc: "Seguimiento, análisis e interpretación del proceso legislativo: tramitación, votaciones y actores clave.",
  },
  {
    icon: "◈",
    title: "Opinión Pública",
    desc: "Medición y análisis de tendencias en la opinión ciudadana mediante metodologías cuantitativas y cualitativas.",
  },
  {
    icon: "◈",
    title: "Análisis Electoral",
    desc: "Modelamiento y proyección de escenarios electorales basados en datos históricos y tendencias actuales.",
  },
  {
    icon: "◈",
    title: "Políticas Públicas",
    desc: "Evaluación del diseño, implementación e impacto de políticas públicas en el contexto chileno.",
  },
];

export default function SobreNosotros() {
  return (
    <main>
      <Navbar />

      {/* ── Hero ── */}
      <section className="min-h-[60vh] bg-[#880E4F] flex flex-col justify-end pt-32 pb-20 px-6 relative overflow-hidden">
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
              Quiénes somos
            </span>
          </div>
          <h1
            className="serif font-bold text-[#F5F5F5] leading-[1.08] mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            Sobre <span className="text-[#F48FB1]">Nosotros</span>
          </h1>
          <p className="text-[#F5F5F5]/60 text-lg max-w-lg leading-relaxed">
            Un think tank político comprometido con el análisis riguroso,
            la investigación independiente y el fortalecimiento del debate
            democrático en Chile.
          </p>
        </div>
      </section>

      {/* ── Misión ── */}
      <section className="bg-[#F5F5F5] py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#D81B60] text-xs tracking-[0.3em] uppercase font-medium mb-3">
              Misión
            </p>
            <h2 className="serif text-4xl font-bold text-[#424242] mb-6 leading-tight">
              Nuestra Misión
            </h2>
            <div className="w-12 h-px bg-[#D81B60] mb-8" />
            <p className="text-[#424242]/70 text-lg leading-relaxed">
              Generar conocimiento político riguroso e independiente para
              fortalecer el debate público, la toma de decisiones y la
              comprensión de los procesos democráticos en Chile.
            </p>
          </div>
          <div className="bg-[#880E4F] p-10 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(#F5F5F5 1px, transparent 1px), linear-gradient(90deg, #F5F5F5 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <p
              className="serif font-bold text-[#F5F5F5] leading-tight relative z-10"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
            >
              "Fabricamos las ideas que guían el Chile de mañana."
            </p>
            <div className="mt-6 w-8 h-px bg-[#F48FB1]" />
          </div>
        </div>
      </section>

      {/* ── Visión ── */}
      <section className="bg-[#424242] py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="border-l-4 border-[#D81B60] pl-8">
            <p className="text-[#F48FB1] text-xs tracking-[0.3em] uppercase font-medium mb-3">
              Visión
            </p>
            <h2 className="serif text-4xl font-bold text-[#F5F5F5] mb-6 leading-tight">
              Nuestra Visión
            </h2>
            <p className="text-[#F5F5F5]/65 text-lg leading-relaxed">
              Ser el principal think tank político de Chile, reconocido por la
              calidad de su investigación y su contribución efectiva al
              fortalecimiento de la democracia y el debate ciudadano.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            {[
              { label: "Años de trayectoria", value: "4+" },
              { label: "Estudios publicados", value: "18" },
              { label: "Columnas de opinión", value: "96+" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between border-b border-[#F5F5F5]/10 pb-5 last:border-0 last:pb-0"
              >
                <span className="text-[#F5F5F5]/50 text-sm tracking-wide">
                  {stat.label}
                </span>
                <span className="serif text-3xl font-bold text-[#D81B60]">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Valores ── */}
      <section className="bg-[#F5F5F5] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 pb-6 border-b border-[#424242]/10">
            <p className="text-[#D81B60] text-xs tracking-[0.3em] uppercase font-medium mb-2">
              Principios
            </p>
            <h2 className="serif text-4xl font-bold text-[#424242]">
              Nuestros Valores
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {valores.map((v) => (
              <div
                key={v.n}
                className="border border-[#424242]/10 p-8 hover:border-[#D81B60] transition-all duration-300 group relative overflow-hidden"
              >
                <span className="absolute top-4 right-5 serif font-bold text-[#D81B60]/[0.07] text-5xl leading-none select-none">
                  {v.n}
                </span>
                <div className="w-8 h-px bg-[#D81B60] mb-5" />
                <h3 className="serif text-xl font-bold text-[#424242] mb-3 group-hover:text-[#D81B60] transition-colors">
                  {v.title}
                </h3>
                <p className="text-[#424242]/55 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Historia ── */}
      <section className="bg-[#880E4F] py-24 px-6 relative overflow-hidden">
        <div className="absolute left-0 top-0 w-1 h-full bg-[#D81B60]" />
        <div
          className="absolute top-0 right-0 w-[30vw] h-[30vw] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(244,143,177,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10 pl-4">
          <p className="text-[#F48FB1] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Historia
          </p>
          <h2 className="serif text-4xl font-bold text-[#F5F5F5] mb-12">
            Nuestra Historia
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                year: "2022",
                title: "Fundación",
                desc: "Fabrica Chile nació como respuesta a la creciente necesidad de análisis político riguroso e independiente en el Chile contemporáneo.",
              },
              {
                year: "2023",
                title: "Expansión Digital",
                desc: "Lanzamos nuestra presencia en redes sociales, con especial foco en Instagram, llevando el análisis político a nuevas audiencias.",
              },
              {
                year: "2024–2025",
                title: "Consolidación",
                desc: "Publicamos nuestros estudios más relevantes y posicionamos a Fabrica Chile como referente del pensamiento político contemporáneo.",
              },
            ].map((item) => (
              <div key={item.year} className="border-t border-[#F5F5F5]/15 pt-6">
                <span className="serif text-4xl font-bold text-[#D81B60]">
                  {item.year}
                </span>
                <h3 className="serif text-xl font-bold text-[#F5F5F5] mt-3 mb-3">
                  {item.title}
                </h3>
                <p className="text-[#F5F5F5]/55 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Áreas de Enfoque ── */}
      <section className="bg-[#F5F5F5] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 pb-6 border-b border-[#424242]/10">
            <p className="text-[#D81B60] text-xs tracking-[0.3em] uppercase font-medium mb-2">
              Especialidades
            </p>
            <h2 className="serif text-4xl font-bold text-[#424242]">
              Áreas de Enfoque
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areasFoco.map((area) => (
              <div
                key={area.title}
                className="group p-8 border border-[#424242]/10 hover:border-[#4DB6AC] transition-all duration-300"
              >
                <span className="text-[#4DB6AC] text-2xl mb-4 block">
                  {area.icon}
                </span>
                <h3 className="serif text-lg font-bold text-[#424242] mb-3 group-hover:text-[#D81B60] transition-colors">
                  {area.title}
                </h3>
                <p className="text-[#424242]/55 text-sm leading-relaxed">
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
