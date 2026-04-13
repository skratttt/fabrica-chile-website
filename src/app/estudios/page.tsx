import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { getAllEstudios } from "@/lib/queries";
import { FadeInScroll } from "@/app/components/FadeInScroll";
import { AnimatedPageTitle } from "@/app/components/AnimatedTitle";

export const metadata = {
  title: "Repositorio de Conocimiento | Fábrica",
  description: "Expositor de Estudios e Informes",
};

export default async function EstudiosPage() {
  const estudios = await getAllEstudios();

  const getCategoryBgColor = (cat?: string) => {
    switch (cat) {
      case "Informe Técnico":
        return "bg-[#880E4F]"; // Dark red
      case "Estudio":
        return "bg-[#1A2639]"; // Dark navy blue
      case "Doc. de Trabajo":
        return "bg-[#1C3A27]"; // Dark forest green
      default:
        return "bg-[#424242]"; // Gray fallback
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6] pt-24 flex flex-col">
      <Navbar />

      <section className="py-24 px-6 md:px-12 flex-1 w-full max-w-7xl mx-auto">
        <div className="mb-16">
          <FadeInScroll>
            <div className="inline-block bg-[#FCE4EC] text-[#880E4F] text-[10px] tracking-[0.2em] uppercase font-bold px-3 py-1 rounded-full mb-6">
              REPOSITORIO DE CONOCIMIENTO
            </div>
          </FadeInScroll>
          <AnimatedPageTitle
            className="serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#880E4F] mb-6 leading-tight"
            scrollFade={true}
          >
            Todos los Productos
          </AnimatedPageTitle>
          <FadeInScroll delay={0.2}>
            <p className="text-[#424242]/70 text-lg md:text-xl max-w-3xl leading-relaxed">
              Acceda a nuestra biblioteca técnica completa donde la investigación rigurosa se
              encuentra con el análisis estratégico para el desarrollo nacional.
            </p>
          </FadeInScroll>
        </div>

        {estudios.length === 0 ? (
          <div className="text-center py-24 text-[#424242]/50">
            Aún no hay productos disponibles.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {estudios.map((study, i) => (
              <FadeInScroll key={study._id} delay={i * 0.05} className="h-full">
                <div className="group flex flex-col rounded-md mt-2 overflow-hidden shadow-lg hover:-translate-y-2 transition-transform duration-500" style={{ height: "380px" }}>
                  <div className={`flex flex-col h-full p-8 md:p-10 ${getCategoryBgColor(study.category)}`}>
                    <span className="text-white/80 text-[10px] tracking-[0.2em] uppercase font-bold mb-4 block">
                      {study.category || "Fábrica"}
                    </span>
                    <h3 className="serif text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight line-clamp-3">
                      {study.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed line-clamp-3 flex-1">
                      {study.abstract}
                    </p>

                    <div className="mt-4 shrink-0">
                      <Link
                        href={`/estudios/${study.slug?.current || ""}`}
                        className="inline-flex items-center justify-between w-full border border-white/20 text-white/90 px-6 py-4 text-xs tracking-[0.1em] font-medium hover:bg-white/10 transition-colors rounded-sm"
                      >
                        <span>Ver Producto</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeInScroll>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
