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
    title: "Tips for Building a Loyal Fanbase on YouTube",
    slug: "tips-for-building-a-loyal-fanbase-on-youtube",
    description: "YouTube is a powerful platform for growing your audience, deepening fan connections, and turning casual viewers into dedicated supporters.",
    content: fs.readFileSync(
      path.join(__dirname, "./md/tips-building-loyal-fanbase.md"),
      "utf-8"
    ),
    imageURL: "drummer-playing.webp",
    imagePublicID: "",
    imageAlt: "Drummer Playing",
    category: "Tutoriales",
    author: "Sonusbeat",
    seoTitle: "Tips for Building a Loyal Fanbase on YouTube",
    seoDescription: "YouTube is a powerful platform for growing your audience, deepening fan connections, and turning casual viewers into dedicated supporters.",
    seoRobots: "index_follow",
    publishedAt: new Date("2025-03-13T00:01:00.000Z"),
    published: true,
  },
  {
    title: "11 Music Marketing Tools Every Independent Musician Should Be Using",
    slug: "eleven-music-marketing-tools",
    description: "Successfully marketing your music doesn't have to be overwhelming or expensive. With the right tools in your pocket, you can reach new fans, build your brand, and promote your releases like ...",
    content: fs.readFileSync(
      path.join(__dirname, "./md/eleven-marketing-tools-for-musicians.md"),
      "utf-8"
    ),
    imageURL: "recording-studio.webp",
    imagePublicID: "",
    imageAlt: "Recording Studio",
    category: "Tutoriales",
    author: "michaelj",
    seoTitle: "11 Music Marketing Tools Every Independent Musician Should Be Using",
    seoDescription: "Successfully marketing your music doesn't have to be overwhelming or expensive. With the right tools in your pocket, you can reach new fans, build your ...",
    seoRobots: "index_follow",
    publishedAt: new Date("2025-05-16T00:02:00.000Z"),
    published: true,
  },
  {
    title: "Best Practices For Getting Featured on Spotify Playlists",
    slug: "best-practices-for-getting-featured-on-spotify-playlists",
    description: "If you want your music shared with listeners on a global scale, getting featured on Spotify playlists is a great way to get there!",
    content: fs.readFileSync(
      path.join(__dirname, "./md/best-practices-for-getting-featured-on-spotify-playlists.md"),
      "utf-8"
    ),
    imageURL: "headphones-spotify.webp",
    imagePublicID: "",
    imageAlt: "Social Media",
    category: "Cursos",
    author: "Sonusbeat",
    seoTitle: "Best Practices For Getting Featured on Spotify Playlists",
    seoDescription: "If you want your music shared with listeners on a global scale, getting featured on Spotify playlists is a great way to get there! ...",
    seoRobots: "index_follow",
    publishedAt: new Date("2025-05-23T00:03:00.000Z"),
    published: true,
  },
  {
    title: "How to turn one release into a evergreen content",
    slug: "how-to-turn-one-release-into-a-evergreen-content",
    "description": "One song, video, or photoshoot can fuel months of momentum if you know how to finesse it properly ...",
    content: fs.readFileSync(
      path.join(__dirname, "./md/how-to-turn-release-into-evergreen-content.md"),
      "utf-8"
    ),
    imageURL: "people-hanging-out.webp",
    imagePublicID: "",
    imageAlt: "People Hanging Out",
    category: "videos",
    author: "michaelj",
    "seoTitle": "How to turn one release into a evergreen content",
    "seoDescription": "One song, video, or photoshoot can fuel months of momentum if you know how to finesse it properly ...",
    "seoRobots": "index_follow",
    publishedAt: new Date("2025-06-26T00:04:00.000Z"),
    published: true,
  },
  {
    title: "How to Protect Your Mental Health on Social Media as an Artist",
    slug: "protect-your-mental-health",
    description: "Social media can be a double-edged sword. On one hand, it gives you a direct line of connection to ...",
    content: fs.readFileSync(
      path.join(__dirname, "./md/protect-your-mental-health.md"),
      "utf-8"
    ),
    imageURL: "social-media.webp",
    imagePublicID: "",
    imageAlt: "Social Media",
    category: "Cursos",
    author: "Sonusbeat",
    seoTitle: "How to Protect Your Mental Health on Social Media as an Artist",
    seoDescription: "Social media can be a double-edged sword. On one hand, it gives you a direct line of connection to ...",
    seoRobots: "index_follow",
    publishedAt: new Date("2025-06-26T00:05:00.000Z"),
    published: true,
  },
  {
    title: "Best Apps for Independent Musicians in 2025",
    slug: "best-apps-for-independent-musicians-in-2025",
    description: "In today's digital age, being a musician entails more than just being musically inclined. You must master social media, marketing, scheduling, data, and everything in between.",
    content: fs.readFileSync(
      path.join(__dirname, "./md/best-apps-for-independient-musicians.md"),
      "utf-8"
    ),
    imageURL: "apps-musicians.webp",
    imagePublicID: "",
    imageAlt: "Apps for musicians",
    category: "Musica",
    author: "Gwenstacy",
    seoTitle: "Best Apps for Independent Musicians in 2025",
    seoDescription: "In today's digital age, being a musician entails more than just being musically inclined. You must master social media, marketing, scheduling, data, and ...",
    seoRobots: "index_follow",
    publishedAt: new Date("2025-06-26T00:06:00.000Z"),
    published: true,
  },
];

export const initialData = {
  users,
  categories,
  articles,
};
