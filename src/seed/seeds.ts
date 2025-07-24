import fs from "fs";
import path from "path";
import type { Article } from "@/interfaces/article.interface";
import type { Category } from "@/interfaces/category.interface";
import type { User } from "@/interfaces/user.interface";

const users: User[] = [
  {
    name: 'Daniel Gonzalez',
    email: 'qbixmex@gmail.com',
    emailVerified: new Date('2024-07-01T12:25:17.435Z'),
    username: 'sonusbeat',
    password: 'secretpassword',
    roles: ['admin'],
    image: 'no-image.jpg',
    isActive: true,
  },
  {
    name: 'Michael Jackson',
    email: 'moonwalker@neverland.com',
    emailVerified: new Date('2023-02-18T17:12:33.734Z'),
    username: 'michaelj',
    password: 'annieareyouokay',
    roles: ['user'],
    image: 'no-image.jpg',
    isActive: false,
  },
  {
    name: 'Gwen Stacy',
    email: 'spiderwoman@marvel.com',
    emailVerified: new Date('2022-05-15T20:12:15.434Z'),
    username: 'gwenstacy',
    password: 'secretpassword',
    roles: ['user'],
    image: 'no-image.jpg',
    isActive: false,
  },
];

const categories: Category[] = [
  {
    name: 'Tutoriales',
    slug: 'tutoriales'
  },
  {
    name: 'Música',
    slug: 'musica',
  },
  {
    name: 'Cursos',
    slug: 'cursos',
  },
  {
    name: 'Videos',
    slug: 'videos',
  }
];

const articles: Article[] = [
  {
    title: "¿ Cómo superar el bloqueo creativo en la Música Electrónica ?",
    slug: "como-superar-el-bloqueo-creativo-en-la-musica-electronica",
    description: "Descubre cómo romper el bloqueo musical con IA, letras generadas y fuentes de inspiración como la filosofía o la ciencia ficción.",
    content: fs.readFileSync( path.join(__dirname, "./md/como-superar-el-bloqueo-creativo-musical.md"), "utf-8"),
    imageURL: "musician-frustrated.webp",
    imageAlt: "Productor Musical con Bloqueo Musical",
    category: "Tutoriales",
    author: "michaelj",
    seoTitle: "¿ Cómo superar el bloqueo creativo en la música electrónica ?",
    seoDescription: "Social media can be a double-edged sword. On one hand, it gives you a direct line of connection to",
    seoRobots: "index_follow",
    publishedAt: new Date("2025-06-01T00:00:00.000Z"),
    published: true,
  },
  {
    title: "¿ Cuánto tiempo toma producir una canción de Música Electrónica ?",
    slug: "cuanto-tiempo-toma-producir-una-cancion-de-musica-electronica",
    description: "Desde el diseño sonoro hasta la mezcla final, descubre cuánto tiempo lleva lanzar una canción electrónica profesional y qué hacen los grandes productores para lograrlo.",
    content: fs.readFileSync( path.join(__dirname, "./md/cuanto-tiempo-toma-producir-una-cancion-de-musica-electronica.md"), "utf-8"),
    imageURL: "produciendo-musica-electronica.webp",
    imageAlt: "Productor de Música Electrónica",
    category: "videos",
    author: "michaelj",
    seoTitle: "¿ Cuánto tiempo toma producir una canción de Música Electrónica ?",
    seoDescription: "Desde el diseño sonoro hasta la mezcla final, descubre cuánto tiempo lleva lanzar una canción electrónica profesional y qué hacen los grandes productores para",
    seoRobots: "index_follow",
    publishedAt: new Date("2025-06-02T00:00:00.000Z"),
    published: true,
  },
  {
    title: "Los Géneros más conocidos de la Música Electrónica",
    slug: "generos-mas-conocidos-de-la-musica-electronica",
    description: "Descubre los géneros top de la música electrónica, sus BPM, sonidos, eventos donde dominan y los DJs que los hicieron famosos ¿ Ya conoces todos ?",
    content: fs.readFileSync( path.join(__dirname, "./md/generos-mas-conocidos-de-la-musica-electronica.md"), "utf-8"),
    imageURL: "electronic-music.webp",
    imageAlt: "Música Electrónica",
    category: "Cursos",
    author: "Sonusbeat",
    seoTitle: "Los géneros más populares de la Música Electrónica Explicados",
    seoDescription: "Descubre los géneros top de la música electrónica, sus BPM, sonidos, eventos donde dominan y los DJs que los hicieron famosos ¿ Ya conoces todos ?",
    seoRobots: "index_follow",
    publishedAt: new Date("2025-06-03T00:00:00.000Z"),
    published: true,
  },
  {
    title: "¿ La IA nos prepara para un contacto extraterrestre en 2030 ?",
    slug: "inteligencia-artificial-nos-prepara-para-contacto-extraterrestre",
    description: "Descubre cómo la IA podría ayudarnos a comunicarnos con seres de otros mundos, ¿acaso nos están preparando para algo? Entonces para el 2030 Elon Musk tiene planeado.",
    content: fs.readFileSync( path.join(__dirname, "./md/inteligencia-artificial-nos-prepara-para-contacto-extraterrestre.md"), "utf-8"),
    imageURL: "alien-encounter.webp",
    imageAlt: "Encuentro Extraterrestre",
    category: "Musica",
    author: "Gwenstacy",
    seoTitle: "¿ La IA nos prepara para un contacto extraterrestre en 2030 ?",
    seoDescription: "Descubre cómo la IA podría ayudarnos a comunicarnos con seres de otros mundos, Para el año 2030 Elon Musk tiene planeado",
    seoRobots: "index_follow",
    publishedAt: new Date("2025-06-04T00:00:00.000Z"),
    published: true,
  },
  {
    title: "Música Generada con Inteligencia Artificial",
    slug: "musica-generada-con-inteligencia-artificial",
    description: "La industria musical esta transformándose gracias a la generación por inteligencia artificial, ¡ Entérate como esto te beneficia !",
    content: fs.readFileSync(
      path.join(__dirname, "./md/musica-generada-con-inteligencia-artificial.md"),
      "utf-8"
    ),
    imageURL: "artificial-intelligence-music.webp",
    imageAlt: "Inteligencia Artificial en la Música",
    category: "Cursos",
    author: "Sonusbeat",
    seoTitle: "Música Generada con Inteligencia Artificial",
    seoDescription: "La industria musical esta transformándose gracias a la generación por inteligencia artificial, ¡ Entérate como esto te beneficia !",
    seoRobots: "index_follow",
    publishedAt: new Date("2025-06-05T00:00:00.000Z"),
    published: true,
  },
  {
    title: "¿ Qué es un controlador MIDI y cómo usarlo en tu música ?",
    slug: "que-es-un-controlador-midi",
    description: "Descubre qué es un controlador MIDI, sus tipos, cómo ayudan en producción y en vivo, y cuál es el mejor para empezar en el mundo musical.",
    content: fs.readFileSync( path.join(__dirname, "./md/que-es-un-controlador-midi.md"), "utf-8"),
    imageURL: "constroladores-midi.webp",
    imageAlt: "Controladores Midi",
    category: "Cursos",
    author: "Sonusbeat",
    seoTitle: "¿ Qué es un controlador MIDI y cómo usarlo en tu música ?",
    seoDescription: "Descubre qué es un controlador MIDI, sus tipos, cómo ayudan en producción y en vivo, y cuál es el mejor para empezar en el mundo musical.",
    seoRobots: "index_follow",
    publishedAt: new Date("2025-06-07T00:00:00.000Z"),
    published: true,
  },
  {
    title: "¿ Qué son las Notas MIDI y cómo se usan en la Producción Musical ?",
    slug: "que-son-las-notas-midi-y-como-se-usan",
    description: "Descubre qué son las notas MIDI, cómo funcionan y por qué son clave para producir música digital con control y creatividad.",
    content: fs.readFileSync( path.join(__dirname, "./md/que-son-las-notas-midi-y-como-se-usan.md"), "utf-8"),
    imageURL: "music-producer.webp",
    imageAlt: "Productor Musical",
    category: "Tutoriales",
    author: "Sonusbeat",
    seoTitle: "¿ Qué son las notas MIDI y cómo se usan en la producción musical ?",
    seoDescription: "Descubre qué son las notas MIDI, cómo funcionan y por qué son clave para producir música digital con control y creatividad.",
    seoRobots: "index_follow",
    publishedAt: new Date("2025-01-01T06:00:00.000Z"),
    published: true,
  },
];

export const initialData = {
  users,
  categories,
  articles,
};
