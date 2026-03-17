import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { AnimatedPageTitle, AnimatedWord } from "@/app/components/AnimatedTitle";
import { FadeInScroll } from "@/app/components/FadeInScroll";

const valores = [
  {
    n: "01",
    title: "Innovación",
    desc: "Buscamos nuevas soluciones a problemas públicos desde otra mirada, incorporando a nuestros procesos nuevas tecnologías y metodologías para obtener mejores resultados.",
  },
  {
    n: "02",
    title: "Independencia",
    desc: "Defendemos nuestro derecho a ser libres a la hora de construir ideas. La autonomía intelectual es, para nosotros, esencial para enriquecer el debate público.",
  },
  {
    n: "03",
    title: "Transparencia",
    desc: "Trabajamos con apertura y creemos en el valor de nuestros procesos y en la nitidez desde donde nacen.",
  },
  {
    n: "04",
    title: "Responsabilidad",
    desc: "Trabajamos con el objetivo de aportar y construir una democracia más fuerte, en miras de un Chile más libre.",
  },
  {
    n: "05",
    title: "Excelencia",
    desc: "Buscamos altos estándares de investigación, análisis y producción de conocimiento.",
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
      <section className="min-h-[60vh] bg-[#880E4F] flex flex-col justify-end pt-32 pb-20 px-6 relative">
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
                Quiénes somos
              </span>
            </div>
          </FadeInScroll>
          <AnimatedPageTitle
            className="serif font-bold text-[#F5F5F5] leading-[1.08] mb-6"
            scrollFade={true}
          >
            <div className="overflow-hidden" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
              <AnimatedWord>Sobre</AnimatedWord>{" "}
              <AnimatedWord className="text-[#F48FB1]">Nosotros</AnimatedWord>
            </div>
          </AnimatedPageTitle>
          <FadeInScroll delay={0.6}>
            <p className="text-[#F5F5F5]/60 text-lg max-w-lg leading-relaxed">
              Somos un centro de estudios dedicado a la investigación, la divulgación y la promoción de la democracia representativa liberal. Nos posicionamos como un espacio de análisis de coyunturas de interés público en el marco de los complejos procesos y desafíos que gobiernan las democracias liberales actuales.
            </p>
          </FadeInScroll>
        </div>
      </section>

      {/* ── Misión ── */}
      <section className="bg-[#F5F5F5] py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeInScroll direction="right">
            <div>
              <p className="text-[#D81B60] text-xs tracking-[0.3em] uppercase font-medium mb-3">
                Misión
              </p>
              <h2 className="serif text-4xl font-bold text-[#424242] mb-6 leading-tight">
                Nuestra Misión
              </h2>
              <div className="w-12 h-px bg-[#D81B60] mb-8" />
              <p className="text-[#424242]/70 text-lg leading-relaxed">
                Analizamos problemas de alta complejidad buscando fortalecer la estabilidad democrática y la cohesión social, así como potenciar el desarrollo humano en un entorno justo y equitativo.
              </p>
            </div>
          </FadeInScroll>
          <FadeInScroll direction="left" delay={0.2}>
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
          </FadeInScroll>
        </div>
      </section>

      {/* ── Visión ── */}
      <section className="bg-[#424242] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeInScroll>
            <div className="border-l-4 border-[#D81B60] pl-8 max-w-3xl">
              <p className="text-[#F48FB1] text-xs tracking-[0.3em] uppercase font-medium mb-3">
                Visión
              </p>
              <h2 className="serif text-4xl font-bold text-[#F5F5F5] mb-6 leading-tight">
                Nuestra Visión
              </h2>
              <p className="text-[#F5F5F5]/65 text-lg leading-relaxed">
                Queremos ser referentes, tanto a nivel nacional como internacional, en la generación de conocimiento, propuestas y debates que impulsen una sociedad más inclusiva, justa, libre, próspera y democrática.
              </p>
            </div>
          </FadeInScroll>
        </div>
      </section>

      {/* ── Valores ── */}
      <section className="bg-[#F5F5F5] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeInScroll>
            <div className="mb-14 pb-6 border-b border-[#424242]/10">
              <p className="text-[#D81B60] text-xs tracking-[0.3em] uppercase font-medium mb-2">
                Principios
              </p>
              <h2 className="serif text-4xl font-bold text-[#424242]">
                Nuestros Valores
              </h2>
            </div>
          </FadeInScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {valores.map((v, i) => (
              <FadeInScroll key={v.n} delay={i * 0.1}>
                <div
                  className="border border-[#424242]/10 p-8 hover:border-[#D81B60] transition-all duration-300 group relative overflow-hidden h-full"
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
              </FadeInScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Áreas de Enfoque ── */}
      <section className="bg-[#F5F5F5] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeInScroll>
            <div className="mb-14 pb-6 border-b border-[#424242]/10">
              <p className="text-[#D81B60] text-xs tracking-[0.3em] uppercase font-medium mb-2">
                Especialidades
              </p>
              <h2 className="serif text-4xl font-bold text-[#424242]">
                Áreas de Enfoque
              </h2>
            </div>
          </FadeInScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areasFoco.map((area, i) => (
              <FadeInScroll key={area.title} delay={i * 0.1}>
                <div
                  className="group p-8 border border-[#424242]/10 hover:border-[#4DB6AC] transition-all duration-300 h-full"
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
              </FadeInScroll>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
