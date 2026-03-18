import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { AnimatedPageTitle, AnimatedWord } from "@/app/components/AnimatedTitle";
import { FadeInScroll } from "@/app/components/FadeInScroll";
import { getColumnaBySlug } from "@/lib/queries";

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

const ptComponents: PortableTextComponents = {
    block: {
        normal: ({ children }) => <FadeInScroll><p>{children}</p></FadeInScroll>,
        h2: ({ children }) => <FadeInScroll><h2>{children}</h2></FadeInScroll>,
        h3: ({ children }) => <FadeInScroll><h3>{children}</h3></FadeInScroll>,
        blockquote: ({ children }) => <FadeInScroll><blockquote>{children}</blockquote></FadeInScroll>,
    },
    list: {
        bullet: ({ children }) => <FadeInScroll><ul>{children}</ul></FadeInScroll>,
        number: ({ children }) => <FadeInScroll><ol>{children}</ol></FadeInScroll>,
    },
};

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
                    <AnimatedPageTitle
                        className="serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#424242] mb-6 leading-[1.1]"
                        scrollFade={true}
                    >
                        <div className="overflow-hidden flex flex-wrap justify-center gap-[0.2em]">
                            {columna.title.split(" ").map((word: string, i: number) => (
                                <AnimatedWord key={i}>{word}</AnimatedWord>
                            ))}
                        </div>
                    </AnimatedPageTitle>
                    <FadeInScroll delay={0.6}>
                        <p className="text-xl text-[#424242]/70 leading-relaxed max-w-2xl mx-auto mb-8">
                            {columna.excerpt}
                        </p>
                    </FadeInScroll>

                    <FadeInScroll delay={0.8}>
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
                    </FadeInScroll>
                </div>

                {columna.mainImage?.asset?.url && (
                    <FadeInScroll delay={0.2} className="relative aspect-[21/9] w-full mb-12 overflow-hidden bg-[#424242]/5">
                        <Image
                            src={columna.mainImage.asset.url}
                            alt={columna.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </FadeInScroll>
                )}

                <div className="
                        text-lg text-[#424242]/80 leading-relaxed
                        [&_p]:text-justify [&_p]:mb-8 
                        [&_h2]:serif [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-[#424242] [&_h2]:mb-6 [&_h2]:mt-12 
                        [&_h3]:serif [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-[#424242] [&_h3]:mb-4 [&_h3]:mt-10
                        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-8
                        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-8
                        [&_li]:mb-3
                        [&_blockquote]:border-l-4 [&_blockquote]:border-[#D81B60] [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-[#424242]/70 [&_blockquote]:my-10 [&_blockquote]:font-serif [&_blockquote]:text-xl
                        [&_a]:text-[#D81B60] [&_a]:underline hover:[&_a]:text-[#880E4F] [&_a]:transition-colors
                        [&_strong]:font-bold [&_strong]:text-[#424242]
                    ">
                    {columna.body ? (
                        <PortableText value={columna.body} components={ptComponents} />
                    ) : (
                        <p className="italic text-center py-10 opacity-70">El contenido de esta columna no está disponible.</p>
                    )}
                </div>
            </article>

            <Footer />
        </main>
    );
}
