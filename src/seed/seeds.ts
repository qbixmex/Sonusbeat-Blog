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
    translations: [
      {
        language: 'es',
        name: 'Tutoriales',
        slug: 'tutoriales',
      },
      {
        language: 'en',
        name: 'Tutorials',
        slug: 'tutorials',
      },
    ],
  },
  {
    translations: [
      {
        language: 'es',
        name: 'Música',
        slug: 'musica',
      },
      {
        language: 'en',
        name: 'Music',
        slug: 'music',
      },
    ],
  },
  {
    translations: [
      {
        language: 'es',
        name: 'Cursos',
        slug: 'cursos',
      },
      {
        language: 'en',
        name: 'Courses',
        slug: 'courses',
      },
    ],
  },
  {
    translations: [
      {
        language: 'es',
        name: 'Videos',
        slug: 'videos',
      },
      {
        language: 'en',
        name: 'Videos',
        slug: 'videos',
      },
    ],
  }
];

const articles: Article[] = [
  {
    imageURL: "alien-encounter.webp",
    category: "Musica",
    author: "Gwenstacy",
    seoRobots: "index_follow",
    publishedAt: new Date("2025-06-01T00:00:00.000Z"),
    published: true,
    translations: [
      {
        language: "es",
        title: "¿ La IA nos prepara para un contacto extraterrestre en 2030 ?",
        slug: "inteligencia-artificial-nos-prepara-para-contacto-extraterrestre",
        description: "Descubre cómo la IA podría ayudarnos a comunicarnos con seres de otros mundos, ¿acaso nos están preparando para algo? Entonces para el 2030 Elon Musk tiene planeado.",
        content: fs.readFileSync(path.join(__dirname, "./md/es/inteligencia-artificial-nos-prepara-para-contacto-extraterrestre.md"), "utf-8"),
        imageAlt: "Encuentro Extraterrestre",
        seoTitle: "¿ La IA nos prepara para un contacto extraterrestre en 2030 ?",
        seoDescription: "Descubre cómo la IA podría ayudarnos a comunicarnos con seres de otros mundos, ¿acaso nos están preparando para algo? Entonces para el 2030 Elon Musk tiene planeado.",
      },
      {
        language: "en",
        title: "Is AI Preparing Us for Extraterrestrial Contact in 2030?",
        slug: "is-ai-preparing-us-for-extraterrestrial-contact-in-2030",
        description: "Discover how AI could help us communicate with beings from other worlds, are they preparing us for something? Then for 2030 Elon Musk has planned.",
        content: fs.readFileSync(path.join(__dirname, "./md/en/is-ai-preparing-us-for-extraterrestrial-contact-in-2030.md"), "utf-8"),
        imageAlt: "Alien Encounter",
        seoTitle: "Is AI Preparing Us for Extraterrestrial Contact in 2030?",
        seoDescription: "Discover how AI could help us communicate with beings from other worlds, are they preparing us for something? Then for 2030 Elon Musk has planned.",
      }
    ],
  },
  {
    imageURL: "artificial-intelligence-music.webp",
    category: "Cursos",
    author: "Sonusbeat",
    seoRobots: "index_follow",
    publishedAt: new Date("2025-06-02T00:00:00.000Z"),
    published: true,
    translations: [
      {
        language: "es",
        title: "Música Generada con Inteligencia Artificial",
        slug: "musica-generada-con-inteligencia-artificial",
        description: "La industria musical esta transformándose gracias a la generación por inteligencia artificial, ¡ Entérate como esto te beneficia !",
        content: fs.readFileSync(path.join(__dirname, "./md/es/musica-generada-con-inteligencia-artificial.md"), "utf-8"),
        imageAlt: "Inteligencia Artificial en la Música",
        seoTitle: "Música Generada con Inteligencia Artificial",
        seoDescription: "La industria musical esta transformándose gracias a la generación por inteligencia artificial, ¡ Entérate como esto te beneficia !",
      },
      {
        language: "en",
        title: "AI-Generated Music",
        slug: "ai-generated-music",
        description: "The music industry is being transformed by AI-generated content, find out how this benefits you!",
        content: fs.readFileSync(path.join(__dirname, "./md/en/ai-generated-music.md"), "utf-8"),
        imageAlt: "AI in Music",
        seoTitle: "AI-Generated Music",
        seoDescription: "The music industry is being transformed by AI-generated content, find out how this benefits you!",
      }
    ],
  },
  {
    imageURL: "music-producer.webp",
    category: "Tutoriales",
    author: "Sonusbeat",
    seoRobots: "index_follow",
    publishedAt: new Date("2025-01-03T06:00:00.000Z"),
    published: true,
    translations: [
      {
        language: "es",
        title: "¿ Qué son las notas MIDI y cómo se usan en la producción musical ?",
        slug: "que-son-las-notas-midi-y-como-se-usan",
        description: "Descubre qué son las notas MIDI, cómo funcionan y por qué son clave para producir música digital con control y creatividad.",
        content: fs.readFileSync(path.join(__dirname, "./md/es/que-son-las-notas-midi-y-como-se-usan.md"), "utf-8"),
        imageAlt: "Productor Musical",
        seoTitle: "¿ Qué son las notas MIDI y cómo se usan en la producción musical ?",
        seoDescription: "Descubre qué son las notas MIDI, cómo funcionan y por qué son clave para producir música digital con control y creatividad.",
      },
      {
        language: "en",
        title: "What are MIDI Notes and How are They Used in Music Production?",
        slug: "what-are-midi-notes-and-how-are-they-used",
        description: "Discover what MIDI notes are, how they work, and why they are key to producing digital music with control and creativity.",
        content: fs.readFileSync(path.join(__dirname, "./md/en/what-are-midi-notes-and-how-are-they-used.md"), "utf-8"),
        imageAlt: "Music Producer",
        seoTitle: "What are MIDI Notes and How are They Used in Music Production?",
        seoDescription: "Discover what MIDI notes are, how they work, and why they are key to producing digital music with control and creativity.",
      }
    ],
  },
  {
    imageURL: "constroladores-midi.webp",
    category: "Cursos",
    author: "Sonusbeat",
    seoRobots: "index_follow",
    publishedAt: new Date("2025-06-04T00:00:00.000Z"),
    published: true,
    translations: [
      {
        language: "es",
        title: "¿ Qué es un controlador MIDI y cómo usarlo en tu música ?",
        slug: "que-es-un-controlador-midi",
        description: "Descubre qué es un controlador MIDI, sus tipos, cómo ayudan en producción y en vivo, y cuál es el mejor para empezar en el mundo musical.",
        content: fs.readFileSync(path.join(__dirname, "./md/es/que-es-un-controlador-midi.md"), "utf-8"),
        imageAlt: "Controladores Midi",
        seoTitle: "¿ Qué es un controlador MIDI y cómo usarlo en tu música ?",
        seoDescription: "Descubre qué es un controlador MIDI, sus tipos, cómo ayudan en producción y en vivo, y cuál es el mejor para empezar en el mundo musical.",
      },
      {
        language: "en",
        title: "What is a MIDI Controller and How to Use It in Your Music?",
        slug: "what-is-a-midi-controller",
        description: "Discover what a MIDI controller is, its types, how they help in production and live settings, and which one is best to start with in the music world.",
        content: fs.readFileSync(path.join(__dirname, "./md/en/what-is-a-midi-controller.md"), "utf-8"),
        imageAlt: "MIDI Controllers",
        seoTitle: "What is a MIDI Controller and How to Use It in Your Music?",
        seoDescription: "Discover what a MIDI controller is, its types, how they help in production and live settings, and which one is best to start with in the music world.",
      }
    ],
  },
  {
    imageURL: "musician-frustrated.webp",
    category: "Tutoriales",
    author: "michaelj",
    seoRobots: "index_follow",
    publishedAt: new Date("2025-06-05T00:00:00.000Z"),
    published: true,
    translations: [
      {
        language: "es",
        title: "¿ Cómo superar el bloqueo creativo en la Música Electrónica ?",
        slug: "como-superar-el-bloqueo-creativo-en-la-musica-electronica",
        description: "Descubre cómo romper el bloqueo musical con IA, letras generadas y fuentes de inspiración como la filosofía o la ciencia ficción.",
        content: fs.readFileSync(path.join(__dirname, "./md/es/como-superar-el-bloqueo-creativo-musical.md"), "utf-8"),
        imageAlt: "Productor Musical con Bloqueo Musical",
        seoTitle: "¿ Cómo superar el bloqueo creativo en la música electrónica ?",
        seoDescription: "Social media can be a double-edged sword. On one hand, it gives you a direct line of connection to",
      },
      {
        language: "en",
        title: "How to Overcome Creative Block in Electronic Music?",
        slug: "how-to-overcome-creative-block-in-electronic-music",
        description: "Discover how to break through musical blockages with AI, generated lyrics, and sources of inspiration like philosophy or science fiction.",
        content: fs.readFileSync(path.join(__dirname, "./md/en/how-to-overcome-creative-block-in-electronic-music.md"), "utf-8"),
        imageAlt: "Music Producer with Creative Block",
        seoTitle: "How to Overcome Creative Block in Electronic Music?",
        seoDescription: "Social media can be a double-edged sword. On one hand, it gives you a direct line of connection to",
      }
    ],
  },
  {
    imageURL: "electronic-music.webp",
    category: "Cursos",
    author: "Sonusbeat",
    seoRobots: "index_follow",
    publishedAt: new Date("2025-06-06T00:00:00.000Z"),
    published: true,
    translations: [
      {
        language: "es",
        title: "Los Géneros más conocidos de la Música Electrónica",
        slug: "generos-mas-conocidos-de-la-musica-electronica",
        description: "Descubre los géneros top de la música electrónica, sus BPM, sonidos, eventos donde dominan y los DJs que los hicieron famosos ¿ Ya conoces todos ?",
        content: fs.readFileSync(path.join(__dirname, "./md/es/generos-mas-conocidos-de-la-musica-electronica.md"), "utf-8"),
        imageAlt: "Música Electrónica",
        seoTitle: "Los géneros más populares de la Música Electrónica Explicados",
        seoDescription: "Descubre los géneros top de la música electrónica, sus BPM, sonidos, eventos donde dominan y los DJs que los hicieron famosos ¿ Ya conoces todos ?",
      },
      {
        language: "en",
        title: "The Most Popular Genres of Electronic Music Explained",
        slug: "the-most-popular-genres-of-electronic-music-explained",
        description: "Discover the top genres of electronic music, their BPM, sounds, events where they dominate, and the DJs who made them famous. Do you know them all?",
        content: fs.readFileSync(path.join(__dirname, "./md/en/the-most-popular-genres-of-electronic-music-explained.md"), "utf-8"),
        imageAlt: "Electronic Music",
        seoTitle: "The Most Popular Genres of Electronic Music Explained",
        seoDescription: "Discover the top genres of electronic music, their BPM, sounds, events where they dominate, and the DJs who made them famous. Do you know them all?",
      }
    ],
  },
  {
    imageURL: "produciendo-musica-electronica.webp",
    category: "videos",
    author: "michaelj",
    seoRobots: "index_follow",
    publishedAt: new Date("2025-06-07T00:00:00.000Z"),
    published: true,
    translations: [
      {
        language: "es",
        title: "¿ Cuánto tiempo toma producir una canción de Música Electrónica ?",
        slug: "cuanto-tiempo-toma-producir-una-cancion-de-musica-electronica",
        description: "Desde el diseño sonoro hasta la mezcla final, descubre cuánto tiempo lleva lanzar una canción electrónica profesional y qué hacen los grandes productores para lograrlo.",
        content: fs.readFileSync(path.join(__dirname, "./md/es/cuanto-tiempo-toma-producir-una-cancion-de-musica-electronica.md"), "utf-8"),
        imageAlt: "Productor de Música Electrónica",
        seoTitle: "¿ Cuánto tiempo toma producir una canción de Música Electrónica ?",
        seoDescription: "Desde el diseño sonoro hasta la mezcla final, descubre cuánto tiempo lleva lanzar una canción electrónica profesional y qué hacen los grandes productores para",
      },
      {
        language: "en",
        title: "How Long Does It Take to Produce an Electronic Music Track?",
        slug: "how-long-does-it-take-to-produce-an-electronic-music-track",
        description: "From sound design to final mixing, discover how long it takes to release a professional electronic track and what top producers do to achieve it.",
        content: fs.readFileSync(path.join(__dirname, "./md/en/how-long-does-it-take-to-produce-an-electronic-music-track.md"), "utf-8"),
        imageAlt: "Electronic Music Producer",
        seoTitle: "How Long Does It Take to Produce an Electronic Music Track?",
        seoDescription: "From sound design to final mixing, discover how long it takes to release a professional electronic track and what top producers do to achieve it.",
      }
    ],
  },
  {
    imageURL: "tech-house-origins.webp",
    category: "musica",
    author: "Sonusbeat",
    seoRobots: "index_follow",
    publishedAt: new Date("2025-06-08T00:00:00.000Z"),
    published: true,
    translations: [
      {
        language: "es",
        title: "Orígenes del Tech House: Historia, sonidos y cómo ha cambiado el género",
        slug: "origenes-del-tech-house",
        description: "Descubre cómo nació el Tech House, sus elementos originales, artistas pioneros y por qué hoy suena tan distinto al sonido clásico de los años 90. Y sobre todo como su impacto en la industria musical.",
        content: fs.readFileSync(path.join(__dirname, "./md/es/origenes-del-tech-house.md"), "utf-8"),
        imageAlt: "Reproductor de DJ",
        seoTitle: "Orígenes del Tech House",
        seoDescription: "Descubre cómo nació el Tech House, sus elementos originales, artistas pioneros y por qué hoy suena tan distinto al sonido clásico de los años 90. Y sobre todo",
      },
      {
        language: "en",
        title: "Origins of Tech House: History, sounds, and how the genre has changed",
        slug: "tech-house-origins",
        description: "Discover how Tech House was born, its original elements, pioneering artists, and why it sounds so different today from the classic sound of the '90s. And, above all, its impact on the music industry.",
        content: fs.readFileSync(path.join(__dirname, "./md/en/tech-house-origins.md"), "utf-8"),
        imageAlt: "DJ Player",
        seoTitle: "Origins of Tech House: History, sounds, and how the genre has changed",
        seoDescription: "Discover how Tech House was born, its original elements, pioneering artists, and why it sounds so different today from the classic sound of the 90s. And more",
      },
    ],
  },
  {
    imageURL: "techno-origins.webp",
    category: "musica",
    author: "Sonusbeat",
    seoRobots: "index_follow",
    publishedAt: new Date("2025-06-09T00:00:00.000Z"),
    published: true,
    translations: [
      {
        language: "es",
        title: "Los orígenes del Techno y su impacto en la Música Electrónica",
        slug: "origenes-del-techno",
        description: "Explora la historia del Techno desde sus raíces en Detroit, sus variantes y los artistas que lo han definido en cada década hasta la actualidad.",
        content: fs.readFileSync(path.join(__dirname, "./md/es/origenes-del-techno.md"), "utf-8"),
        imageAlt: "Música Techno",
        seoTitle: "Los orígenes del Techno y su impacto en la Música Electrónica",
        seoDescription: "Explora la historia del Techno desde sus raíces en Detroit, sus variantes y los artistas que lo han definido en cada década hasta la actualidad.",
      },
      {
        language: "en",
        title: "The origins of Techno and its impact on Electronic Music",
        slug: "techno-origins",
        description: "Explore the history of Techno from its roots in Detroit, its variations, and the artists who have defined it in each decade to the present day.",
        content: fs.readFileSync(path.join(__dirname, "./md/en/techno-origins.md"), "utf-8"),
        imageAlt: "Techno Music",
        seoTitle: "The origins of Techno and its impact on Electronic Music",
        seoDescription: "Explore the history of Techno from its roots in Detroit, its variations, and the artists who have defined it in each decade to the present day.",
      },
    ],
  },
];

export const initialData = {
  users,
  categories,
  articles,
};
