import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { AnimatedPageTitle, AnimatedWord } from "@/app/components/AnimatedTitle";
import { getColumnas } from "@/lib/queries";
import { FadeInScroll } from "@/app/components/FadeInScroll";

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

export default async function ColumnasIndexPage() {
    const columnas = await getColumnas();

    return (
        <main className="min-h-screen bg-[#F5F5F5] pt-32 pb-24">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
                <div className="mb-16 border-b border-[#424242]/10 pb-8 text-center md:text-left">
                    <FadeInScroll direction="right" delay={0.1}>
                        <p className="text-[#D81B60] text-xs tracking-[0.3em] uppercase font-medium mb-4">
                            Archivo
                        </p>
                    </FadeInScroll>
                    <AnimatedPageTitle
                        className="serif text-4xl md:text-5xl lg:text-5xl font-bold text-[#424242]"
                        scrollFade={true}
                    >
                        <div className="overflow-hidden">
                            <AnimatedWord>Opinión</AnimatedWord>
                        </div>
                    </AnimatedPageTitle>
                </div>

                {columnas.length === 0 ? (
                    <p className="text-center text-[#424242]/50 py-20 bg-white/50 border border-[#424242]/5">
                        No hay opiniones publicadas todavía.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {columnas.map((columna, i) => (
                            <FadeInScroll key={columna._id} delay={(i % 3) * 0.1}>
                                <Link
                                    href={`/columnas/${columna.slug.current}`}
                                    className="group flex flex-col bg-white rounded-sm overflow-hidden shadow-sm hover:-translate-y-1 transition-transform duration-300 h-full"
                                >
                                    {columna.mainImage?.asset?.url && (
                                        <div className="aspect-[16/9] relative overflow-hidden bg-[#424242]/5 shrink-0">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={columna.mainImage.asset.url}
                                                alt={columna.title}
                                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className="flex flex-col flex-1 p-6">
                                        <span className="text-[#D81B60] text-[10px] tracking-[0.25em] uppercase font-medium mb-2 block">
                                            {columna.category}
                                        </span>
                                        <h2 className="serif text-xl font-bold text-[#424242] mb-3 group-hover:text-[#D81B60] transition-colors leading-snug line-clamp-3">
                                            {columna.title}
                                        </h2>
                                        <p className="text-[#424242]/60 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                                            {columna.excerpt}
                                        </p>
                                        <div className="flex items-center gap-2 text-[10px] text-[#424242]/40 tracking-[0.1em] uppercase mt-auto pt-4 border-t border-[#424242]/5">
                                            <span className="font-semibold text-[#424242]/60">{columna.author}</span>
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
                                </Link>
                            </FadeInScroll>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
