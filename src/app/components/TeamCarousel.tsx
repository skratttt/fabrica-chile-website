"use client";

import PeopleCarousel, { type Person } from "./PeopleCarousel";

const team: Person[] = [
  {
    id: 2,
    name: "Arantzasu Foppiano",
    role: "Coordinadora de Equipo",
    image: "/assets/arantzasu-foppiano.jpeg",
    bio: "Abogada con experiencia en asesoría legal y comunicación estratégica. En Fábrica Chile se desempeña como coordinadora del equipo, aportando desde el análisis y la generación de contenido.",
  },
  {
    id: 5,
    name: "Nicolás Germain",
    role: "Analista de Datos",
    image: "/assets/Nicolas Germain.jpg",
    bio: "Estudiante de Ingeniería Civil Industrial con experiencia en desarrollo fullstack y amplio dominio del inglés. En Fábrica Chile se desempeña en el área de análisis de datos.",
  },
  {
    id: 6,
    name: "Tomás Domínguez",
    role: "Comunicaciones",
    image: "/assets/Tomas Dominguez.jpg",
    bio: "Estudiante de Periodismo de la Universidad Diego Portales con experiencia en gestión de prensa, comunicaciones e investigación periodística.",
  },
  {
    id: 7,
    name: "Máximo Alonso",
    role: "Investigador",
    image: "/assets/maximo-alonso.JPG",
    bio: "Estudiante de Ciencia Política de la Universidad de Chile. Sus áreas de interés son las relaciones internacionales y el diseño de proyectos.",
  },
  {
    id: 10,
    name: "Felipe Valenzuela",
    role: "Investigador",
    image: "/assets/felipe valenzuela.jpeg",
  },
  {
    id: 11,
    name: "Cristóbal Ramírez",
    role: "Investigador",
    image: "/assets/cristobal-ramirez.jpeg",
  },
];

export default function TeamCarousel() {
  return (
    <PeopleCarousel
      sectionId="team"
      eyebrow="Equipo"
      title="Nuestro Equipo"
      people={team}
      theme="dark"
    />
  );
}
