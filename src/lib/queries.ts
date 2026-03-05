import { sanityClient } from "./sanity";

// ── Types ─────────────────────────────────────────────────────────────────

export interface Columna {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readTime: number;
  featured: boolean;
  mainImage?: { asset: { url: string } };
}

export interface Estudio {
  _id: string;
  number: string;
  title: string;
  abstract: string;
  tags: string[];
  year: string;
  pages: string;
  pdfUrl?: string;
}

// ── Queries ───────────────────────────────────────────────────────────────

export async function getColumnas(): Promise<Columna[]> {
  return sanityClient.fetch(
    `*[_type == "columna"] | order(publishedAt desc)[0...5] {
      _id, title, slug, category, excerpt, author, publishedAt, readTime, featured,
      mainImage { asset->{ url } }
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getEstudios(): Promise<Estudio[]> {
  return sanityClient.fetch(
    `*[_type == "estudio"] | order(publishedAt desc) {
      _id, number, title, abstract, tags, year, pages,
      "pdfUrl": pdfFile.asset->url
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}
