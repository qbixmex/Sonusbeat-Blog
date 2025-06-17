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

export const content: Item[] = [
  {
    id: "x9j2",
    title: "Artículos",
    url: "#",
    Icon: FileText,
  },
  {
    id: "a3b4",
    title: "Música",
    url: "#",
    Icon: Music,
  },
  {
    id: "c5d6",
    title: "Videos",
    url: "#",
    Icon: Videotape,
  },
  {
    id: "e7f8",
    title: "Usuarios",
    url: "#",
    Icon: Users,
  },
];

export const management: Item[] = [
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