import {
  LucideIcon,
  Videotape,
  Users,
  Music,
  FileText,
  Inbox,
  Settings2,
} from "lucide-react";

export type Item = {
  id: string;
  title: string;
  url: string;
  Icon: LucideIcon;
};

export type User = {
  name: string;
  email: string;
  avatar: string;
  bio?: string;
};

export const user: User = {
  name: "Daniel González",
  email: "qbixmex@gmail.com",
  avatar: "https://avatars.githubusercontent.com/u/70177108?v=4",
  bio: "Desarrollador web y entusiasta de la tecnología. Me apasiona crear aplicaciones web modernas y eficientes.",
};

export const content: Item[] = [
  {
    id: "x9j2",
    title: "Artículos",
    url: "/admin/articles",
    Icon: FileText,
  },
  {
    id: "a3b4",
    title: "Música",
    url: "/admin/music",
    Icon: Music,
  },
  {
    id: "c5d6",
    title: "Videos",
    url: "/admin/videos",
    Icon: Videotape,
  },
  {
    id: "e7f8",
    title: "Usuarios",
    url: "/admin/users",
    Icon: Users,
  },
];

export const control: Item[] = [
  {
    id: "e1f2",
    title: "Mensajes",
    url: "#",
    Icon: Inbox,
  },
  {
    id: "mb72",
    title: "Ajustes",
    url: "#",
    Icon: Settings2,
  },
];