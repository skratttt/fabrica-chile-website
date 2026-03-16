import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { getColumnaBySlug } from "@/lib/queries";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

function formatDate(iso: string) {
    try {
        return new Date(iso).toLocaleDateString("es-CL", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    } catch {
        return iso;
    }
}

export default async function ColumnaPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const columna = await getColumnaBySlug(slug);

    if (!columna) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#F5F5F5] pt-24">
            <Navbar />

            <article className="max-w-3xl mx-auto px-6 py-12 lg:py-20">
                <div className="mb-10 text-center">
                    <Link href="/columnas" className="text-[#D81B60] text-xs tracking-[0.2em] uppercase font-medium hover:underline mb-6 inline-block">
                        ← Volver a Columnas
                    </Link>
                    <div className="flex justify-center items-center gap-2 mb-6">
                        <span className="bg-[#D81B60] text-white text-xs px-3 py-1.5 tracking-[0.2em] uppercase">
                            {columna.category}
                        </span>
                    </div>
                    <h1 className="serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#424242] mb-6 leading-[1.1]">
                        {columna.title}
                    </h1>
                    <p className="text-xl text-[#424242]/70 leading-relaxed max-w-2xl mx-auto mb-8">
                        {columna.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#424242]/50 tracking-wide uppercase">
                        <div className="font-semibold text-[#424242]">{columna.author}</div>
                        <span>•</span>
                        <time dateTime={columna.publishedAt}>{formatDate(columna.publishedAt)}</time>
                        {columna.readTime && (
                            <>
                                <span>•</span>
                                <span>{columna.readTime} min lectura</span>
                            </>
                        )}
                    </div>
                </div>

                {columna.mainImage?.asset?.url && (
                    <div className="relative aspect-[21/9] w-full mb-12 overflow-hidden bg-[#424242]/5">
                        <Image
                            src={columna.mainImage.asset.url}
                            alt={columna.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#424242] prose-p:text-[#424242]/80 prose-a:text-[#D81B60] prose-a:no-underline hover:prose-a:underline prose-li:text-[#424242]/80 prose-strong:text-[#424242] prose-blockquote:border-l-[#D81B60] prose-blockquote:text-[#424242]/70 prose-blockquote:pl-6 prose-blockquote:font-serif prose-blockquote:italic">
                    {columna.body ? (
                        <PortableText value={columna.body} />
                    ) : (
                        <p className="italic text-center py-10 opacity-70">El contenido de esta columna no está disponible.</p>
                    )}
                </div>
            </article>

            <Footer />
        </main>
    );
}
