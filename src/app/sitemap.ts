import type { MetadataRoute } from "next";
import { getColumnas } from "@/lib/queries";

const BASE_URL = "https://fabricachile.cl";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const columnas = await getColumnas().catch(() => []);

  const columnaUrls = columnas.map((col) => ({
    url: `${BASE_URL}/columnas/${col.slug.current}`,
    lastModified: new Date(col.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/sobre-nosotros`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/servicios`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/columnas`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...columnaUrls,
  ];
}
