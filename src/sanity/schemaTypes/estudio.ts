import { defineField, defineType } from "sanity";

export const estudio = defineType({
  name: "estudio",
  title: "Estudio / Informe",
  type: "document",
  fields: [
    defineField({
      name: "number",
      title: "Número",
      type: "string",
      description: 'Ej: "001", "002"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "abstract",
      title: "Abstract / Resumen",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "tags",
      title: "Etiquetas",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "year",
      title: "Año",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pages",
      title: "Páginas",
      type: "string",
      description: 'Ej: "84 págs."',
    }),
    defineField({
      name: "publishedAt",
      title: "Fecha de publicación",
      type: "datetime",
    }),
    defineField({
      name: "pdfFile",
      title: "Archivo PDF",
      type: "file",
      options: { accept: ".pdf" },
    }),
  ],
  orderings: [
    {
      title: "Número, ascendente",
      name: "numberAsc",
      by: [{ field: "number", direction: "asc" }],
    },
    {
      title: "Fecha de publicación, reciente primero",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", number: "number", year: "year" },
    prepare({ title, number, year }) {
      return { title, subtitle: `#${number} · ${year}` };
    },
  },
});
