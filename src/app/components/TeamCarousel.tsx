"use client";

import PeopleCarousel, { type Person } from "./PeopleCarousel";

const team: Person[] = [
  {
    id: 1,
    name: "Hans Fuhrop",
    role: "Coordinador de Equipo",
    image: "/assets/HANS FUHROP copy.png",
    bio: "Cientista político y candidato a magíster en Gerencia Pública. Con 7 años de experiencia profesional, se ha desarrollado en áreas de gestión pública, trabajo legislativo e investigación. En Fábrica Chile se desempeña como Coordinador del Equipo.",
    objectPosition: "20% center",
  },
  {
    id: 2,
    name: "Arantzasu Foppiano",
    role: "Investigadora",
    image: "/assets/arantzasu-foppiano.jpeg",
    bio: "Abogada con experiencia en asesoría legal y comunicación estratégica. En Fábrica Chile se desempeña como investigadora, aportando desde el análisis y la generación de contenido.",
  },
  {
    id: 4,
    name: "Francisco Oyarce",
    role: "Investigador",
    image: "/assets/Fransisco oyarce.jpg",
    bio: "Cientista político con experiencia en administración institucional, procesos electorales y campañas políticas. En Fábrica Chile se desempeña en el área de investigación.",
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
    id: 8,
    name: "Felipe González Vergara",
    role: "Investigador",
    image: "/assets/Felipe Gonzalez Vergara.jpeg",
  },
  {
    id: 9,
    name: "Benjamín Morales Parra",
    role: "Investigador",
    image: "/assets/benjamin morales parra.jpeg",
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
