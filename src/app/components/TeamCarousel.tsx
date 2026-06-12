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
    image: "/assets/Arantzasu foppiano copy.JPG",
    bio: "Abogada con experiencia en asesoría legal y comunicación estratégica. En Fábrica Chile se desempeña como investigadora, aportando desde el análisis y la generación de contenido.",
  },
  {
    id: 3,
    name: "Bartolomé Reus",
    role: "Comunicaciones",
    image: "/assets/bartolome reus.jpeg",
    bio: "Publicista y magíster (c) en Comunicación Estratégica. Posee más de 8 años de experiencia en gestión de medios, comunicaciones y redes sociales.",
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
