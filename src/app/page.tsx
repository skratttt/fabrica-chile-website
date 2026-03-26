import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import FocusCarousel from "@/app/components/FocusCarousel";
import PodcastSection from "@/app/components/PodcastSection";
import NewsletterForm from "@/app/components/NewsletterForm";
import { getColumnas, getEstudios, type Columna, type Estudio } from "@/lib/queries";
import { getInstagramPosts, type IgPost } from "@/lib/instagram";
import { FadeInScroll } from "@/app/components/FadeInScroll";
import { AnimatedPageTitle, AnimatedWord } from "@/app/components/AnimatedTitle";

/* ─────────────────────────────────────────
   CONFIG
───────────────────────────────────────────── */
const INSTAGRAM_HANDLE = "@fabrica_chile";
const INSTAGRAM_URL = "https://www.instagram.com/fabrica_chile/?hl=es";

/* ─────────────────────────────────────────
   STATIC FALLBACK DATA
   Shown when Sanity/IG have no content yet.
───────────────────────────────────────────── */
const tickerItems = [
  '"El desarrollo consiste en la expansión de las libertades reales que disfrutan las personas" (Amartya Sen)'
];

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("es-CL", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function formatCount(n?: number) {
  if (!n) return "—";
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

/* ─────────────────────────────────────────
   DISPLAY TYPES
───────────────────────────────────────────── */
type DisplayPost = {
  id: string;
  permalink: string;
  media_url: string;
  caption?: string;
  like_count?: number;
  comments_count?: number;
  bg?: string;
};

/* ─────────────────────────────────────────
   SERVER COMPONENTS
───────────────────────────────────────────── */

function Hero() {
  return (
    <section className="min-h-screen bg-[#880E4F] flex flex-col justify-end pt-28 pb-20 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#F5F5F5 1px, transparent 1px), linear-gradient(90deg, #F5F5F5 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.05]"
        style={{ width: "clamp(20rem, 50vw, 55rem)", height: "clamp(20rem, 50vw, 55rem)" }}
      >
        <Image
          src="/assets/gear.png"
          alt="Logo Gear Background"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain object-left -scale-x-100"
        />
      </div>
      <div className="absolute left-0 top-0 w-1 h-full bg-[#D81B60]" />
      <div
        className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(244,143,177,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 pl-4">
        <FadeInScroll direction="right" delay={0.1}>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-px bg-[#F48FB1]" />
            <span className="text-[#F48FB1] text-xs tracking-[0.35em] uppercase font-medium">
              Centro de Pensamiento
            </span>
          </div>
        </FadeInScroll>

        <AnimatedPageTitle
          className="serif font-bold text-[#F5F5F5] leading-[1.08] mb-8"
          scrollFade={true}
        >
          <div className="overflow-hidden" style={{ fontSize: "clamp(2.8rem, 7.5vw, 6.5rem)" }}>
            <AnimatedWord>Ideas</AnimatedWord> <AnimatedWord>que</AnimatedWord>
            <br />
            <AnimatedWord className="text-[#F48FB1]">fabrican</AnimatedWord> <AnimatedWord>la</AnimatedWord>
            <br />
            <AnimatedWord>conversación.</AnimatedWord>
          </div>
        </AnimatedPageTitle>

        <FadeInScroll delay={0.6}>
          <p className="text-[#F5F5F5]/60 text-lg max-w-md mb-12 leading-relaxed">
            Investigación, columnas y análisis sobre las fuerzas políticas que
            moldean nuestra sociedad. Sigue el debate en Redes.
          </p>
        </FadeInScroll>

        <FadeInScroll delay={0.8}>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#columns"
              className="bg-[#D81B60] text-white px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-white hover:text-[#880E4F] transition-all duration-300 whitespace-nowrap"
            >
              Leer Última Opinión
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#F5F5F5]/30 text-[#F5F5F5] px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:border-[#F48FB1] hover:text-[#F48FB1] transition-all duration-300 whitespace-nowrap"
            >
              Seguir en Instagram
            </a>
            <a
              href="https://x.com/Fabrica_Chile"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#F5F5F5]/30 text-[#F5F5F5] px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:border-[#F48FB1] hover:text-[#F48FB1] transition-all duration-300 whitespace-nowrap"
            >
              Seguir en X
            </a>
            <a
              href="https://www.youtube.com/channel/UCtzT5ASvbHBTJwLw8EpcRpA"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#F5F5F5]/30 text-[#F5F5F5] px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:border-[#F48FB1] hover:text-[#F48FB1] transition-all duration-300 whitespace-nowrap"
            >
              Podcast en YT
            </a>
            <a
              href="#"
              className="border border-[#F5F5F5]/30 text-[#F5F5F5] px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:border-[#F48FB1] hover:text-[#F48FB1] transition-all duration-300 whitespace-nowrap"
            >
              Podcast en Spotify
            </a>
          </div>
        </FadeInScroll>
      </div>
    </section>
  );
}

function Ticker() {
  const doubled = [...tickerItems, ...tickerItems];
  return (
    <div className="bg-[#D81B60] py-3 overflow-hidden">
      <div className="ticker-track flex gap-0 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-white text-xs tracking-[0.22em] uppercase font-medium flex-shrink-0 flex items-center"
          >
            <span className="px-8 opacity-40">◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ColumnsSection({ columnas }: { columnas: Columna[] }) {
  if (!columnas || columnas.length === 0) {
    return (
      <section id="columns" className="bg-[#F5F5F5] py-24 px-6 min-h-[50vh] flex flex-col items-center justify-center text-center">
        <h2 className="serif text-3xl font-bold text-[#424242] mb-4">
          Opinión
        </h2>
        <p className="text-[#424242]/55 tracking-wide">
          Estamos trabajando en esta sección.
        </p>
      </section>
    );
  }

  const displayCols = columnas.slice(0, 3);

  return (
    <section id="columns" className="bg-[#F5F5F5] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 pb-6 border-b border-[#424242]/10">
          <FadeInScroll>
            <div>
              <p className="text-[#D81B60] text-xs tracking-[0.3em] uppercase font-medium mb-2">
                Destacado
              </p>
              <h2 className="serif text-4xl font-bold text-[#424242]">
                Opinión
              </h2>
            </div>
          </FadeInScroll>
          <FadeInScroll delay={0.2} direction="left">
            <Link
              href="/columnas"
              className="hidden md:block text-xs tracking-[0.2em] uppercase text-[#424242]/40 hover:text-[#D81B60] transition-colors"
            >
              Todas las opiniones →
            </Link>
          </FadeInScroll>
        </div>

        <div className="grid gap-12">
          {displayCols.map((columna, i) => (
            <FadeInScroll key={columna._id} delay={i * 0.1}>
              <Link
                href={`/columnas/${columna.slug.current}`}
                className="group block"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {columna.mainImage?.asset?.url ? (
                    <div
                      className="w-full md:w-64 lg:w-72 aspect-[4/3] relative rounded overflow-hidden bg-[#424242]/5 shrink-0"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={columna.mainImage.asset.url}
                        alt={columna.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="w-full md:w-64 lg:w-72 aspect-[4/3] relative rounded overflow-hidden shrink-0"
                      style={{
                        background:
                          "linear-gradient(135deg, #880E4F 0%, #6a0837 55%, #D81B60 100%)",
                      }}
                    >
                      <div
                        className="absolute top-0 left-0 w-2/3 h-2/3 pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(circle at top left, rgba(244,143,177,0.2) 0%, transparent 70%)",
                        }}
                      />
                    </div>
                  )}

                  <div className="flex-1 py-2">
                    <span className="text-[#D81B60] text-xs tracking-[0.25em] uppercase font-medium mb-3 block">
                      {columna.category}
                    </span>
                    <h2 className="serif text-2xl md:text-3xl font-bold text-[#424242] mb-4 group-hover:text-[#D81B60] transition-colors leading-tight">
                      {columna.title}
                    </h2>
                    <p className="text-[#424242]/60 text-base leading-relaxed mb-6 line-clamp-3">
                      {columna.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-[#424242]/40 tracking-[0.1em] uppercase">
                      <span className="font-semibold text-[#424242]/70">{columna.author}</span>
                      <span className="opacity-50">·</span>
                      <span>{formatDate(columna.publishedAt)}</span>
                      {columna.readTime && (
                        <>
                          <span className="opacity-50">·</span>
                          <span>{columna.readTime} min</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </FadeInScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstagramSection({ posts }: { posts: DisplayPost[] }) {
  if (!posts || posts.length === 0) {
    return (
      <section id="instagram" className="bg-[#FCE4EC] py-24 px-6 min-h-[50vh] flex flex-col items-center justify-center text-center">
        <h2 className="serif text-3xl font-bold text-[#880E4F] mb-4">
          Destacados de Instagram
        </h2>
        <p className="text-[#880E4F]/60 tracking-wide">
          Estamos trabajando en esta sección.
        </p>
      </section>
    );
  }

  return (
    <section id="instagram" className="bg-[#FCE4EC] py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <FadeInScroll>
            <div>
              <p className="text-[#D81B60] text-xs tracking-[0.3em] uppercase font-medium mb-2">
                Redes
              </p>
              <h2 className="serif text-4xl font-bold text-[#880E4F]">
                Destacados de Instagram
              </h2>
            </div>
          </FadeInScroll>
          <FadeInScroll delay={0.2} direction="left">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block text-xs tracking-[0.2em] uppercase text-[#880E4F]/50 hover:text-[#D81B60] transition-colors"
            >
              {INSTAGRAM_HANDLE} →
            </a>
          </FadeInScroll>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          {posts.map((post, i) => (
            <FadeInScroll key={post.id} delay={i * 0.1} offset={["start 0%", "start -20%"]}>
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden block rounded-3xl"
              >
                {post.media_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.media_url}
                    alt={post.caption ?? "Instagram post"}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                    style={{ background: post.bg }}
                  />
                )}

                <div className="absolute inset-0 bg-[#880E4F]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-4">
                  <div className="flex items-center gap-5 text-white">
                    <span className="font-bold text-base">
                      ♥ {formatCount(post.like_count)}
                    </span>
                    <span className="font-medium text-sm text-white/70">
                      💬 {formatCount(post.comments_count)}
                    </span>
                  </div>
                  {post.caption && (
                    <p className="text-white/75 text-xs text-center leading-relaxed mt-1 max-w-[160px] line-clamp-3">
                      {post.caption}
                    </p>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[#424242]/60 to-transparent" />
              </a>
            </FadeInScroll>
          ))}
        </div>

        <div className="mt-14 text-center">
          <FadeInScroll delay={0.2}>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-[#880E4F]/20 text-[#880E4F]/80 px-8 py-4 text-xs tracking-[0.25em] uppercase hover:border-[#D81B60] hover:text-[#D81B60] transition-all duration-300 rounded-full"
            >
              Sigue a Fabrica
            </a>
          </FadeInScroll>
        </div>
      </div>
    </section>
  );
}

function StudiesSection({ estudios }: { estudios: Estudio[] }) {
  if (!estudios || estudios.length === 0) {
    return (
      <section id="studies" className="bg-[#F5F5F5] py-24 px-6 min-h-[50vh] flex flex-col items-center justify-center text-center">
        <h2 className="serif text-3xl font-bold text-[#424242] mb-4">
          Productos
        </h2>
        <p className="text-[#424242]/55 tracking-wide">
          Estamos trabajando en esta sección.
        </p>
      </section>
    );
  }

  return (
    <section id="studies" className="bg-[#F5F5F5] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 pb-6 border-b border-[#424242]/10">
          <FadeInScroll>
            <div>
              <p className="text-[#D81B60] text-xs tracking-[0.3em] uppercase font-medium mb-2">
                Investigación
              </p>
              <h2 className="serif text-4xl font-bold text-[#424242]">
                Productos
              </h2>
            </div>
          </FadeInScroll>
          <FadeInScroll delay={0.2} direction="left">
            <a
              href="#"
              className="hidden md:block text-xs tracking-[0.2em] uppercase text-[#424242]/40 hover:text-[#D81B60] transition-colors"
            >
              Todos los estudios →
            </a>
          </FadeInScroll>
        </div>

        <div className="flex flex-col gap-5">
          {estudios.map((study, i) => (
            <FadeInScroll key={study._id} delay={i * 0.1}>
              <div
                className="group border border-[#424242]/10 p-8 hover:border-[#D81B60] transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                <span
                  className="absolute right-6 top-1/2 -translate-y-1/2 serif font-bold text-[#D81B60]/[0.05] leading-none select-none pointer-events-none"
                  style={{ fontSize: "clamp(5rem, 10vw, 8rem)" }}
                >
                  {study.number}
                </span>

                <div className="relative z-10 grid md:grid-cols-4 gap-6 items-center">
                  <div className="md:col-span-3">
                    <div className="flex flex-wrap items-center gap-4 mb-3">
                      <span className="text-[#D81B60] text-xs tracking-[0.3em] uppercase font-medium">
                        Estudio #{study.number}
                      </span>
                      <span className="text-[#424242]/30 text-xs">
                        {study.year}
                        {study.pages && ` · ${study.pages}`}
                      </span>
                    </div>
                    <h3 className="serif text-xl lg:text-2xl font-bold text-[#424242] mb-3 group-hover:text-[#D81B60] transition-colors leading-tight">
                      {study.title}
                    </h3>
                    <p className="text-[#424242]/55 text-sm leading-relaxed">
                      {study.abstract}
                    </p>
                    {study.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {study.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1 bg-[#4DB6AC]/10 text-[#4DB6AC] border border-[#4DB6AC]/20 tracking-[0.15em] uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex md:justify-end">
                    {study.pdfUrl ? (
                      <a
                        href={study.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-[#424242]/40 text-[#424242]/65 px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-[#D81B60] hover:border-[#D81B60] hover:text-white transition-all duration-300"
                      >
                        Descargar PDF
                      </a>
                    ) : (
                      <button className="border border-[#424242]/20 text-[#424242]/30 px-6 py-3 text-xs tracking-[0.2em] uppercase cursor-not-allowed">
                        PDF no disponible
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </FadeInScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PAGE — server component, fetches real data
───────────────────────────────────────────── */
export default async function Home() {
  const [columnas, estudios, igPosts] = await Promise.all([
    getColumnas().catch(() => [] as Columna[]),
    getEstudios().catch(() => [] as Estudio[]),
    getInstagramPosts(6).catch(() => [] as IgPost[]),
  ]);

  const displayPosts: DisplayPost[] =
    igPosts.length > 0
      ? igPosts.map((p) => ({
        id: p.id,
        permalink: p.permalink,
        media_url: p.thumbnail_url ?? p.media_url,
        caption: p.caption,
        like_count: p.like_count,
        comments_count: p.comments_count,
      }))
      : [];

  return (
    <main>
      <Navbar />
      <Hero />
      <Ticker />
      <ColumnsSection columnas={columnas} />
      <InstagramSection posts={displayPosts} />
      <PodcastSection />
      <StudiesSection estudios={estudios} />
      <FocusCarousel />
      <NewsletterForm />
      <Footer />
    </main>
  );
}
