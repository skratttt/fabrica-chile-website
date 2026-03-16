import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { getColumnas } from "@/lib/queries";

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

            <div className="max-w-5xl mx-auto px-6 py-12 lg:py-16">
                <div className="mb-16 border-b border-[#424242]/10 pb-8 text-center md:text-left">
                    <p className="text-[#D81B60] text-xs tracking-[0.3em] uppercase font-medium mb-4">
                        Archivo
                    </p>
                    <h1 className="serif text-4xl md:text-5xl lg:text-5xl font-bold text-[#424242]">
                        Todas las Columnas &amp; Opiniones
                    </h1>
                </div>

                {columnas.length === 0 ? (
                    <p className="text-center text-[#424242]/50 py-20 bg-white/50 border border-[#424242]/5">
                        No hay columnas publicadas todavía.
                    </p>
                ) : (
                    <div className="grid gap-12">
                        {columnas.map((columna) => (
                            <Link
                                key={columna._id}
                                href={`/columnas/${columna.slug.current}`}
                                className="group block"
                            >
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    {columna.mainImage?.asset?.url && (
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
                                    )}

                                    <div className="flex-1 py-2">
                                        <span className="text-[#D81B60] text-xs tracking-[0.25em] uppercase font-medium mb-3 block">
                                            {columna.category}
                                        </span>
                                        <h2 className="serif text-3xl font-bold text-[#424242] mb-4 group-hover:text-[#D81B60] transition-colors leading-tight">
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
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
