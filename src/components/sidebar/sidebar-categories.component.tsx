import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import {
  Music,
  Music2,
  SquareLibrary,
  Book,
} from "lucide-react";

export const SidebarCategories = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Categorías</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Música Electrónica">
              <Link href="#">
                <Music />
                <span>Música Electrónica</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuButton asChild tooltip="Tech House">
                  <Link href="#">
                    <Music2 />
                    <span>Tech House</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuButton asChild tooltip="Techno">
                  <Link href="#">
                    <Music2 />
                    <span>Techno</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuButton asChild tooltip="Trance">
                  <Link href="#">
                    <Music2 />
                    <span>Trance</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Tutoriales">
              <Link href="#">
                <SquareLibrary />
                <span>Tutoriales</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuButton asChild tooltip="Tech House">
                  <Link href="#">
                    <Book />
                    <span>Ableton Live</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuButton asChild tooltip="Techno">
                  <Link href="#">
                    <Book />
                    <span>Cubase</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuButton asChild tooltip="Trance">
                  <Link href="#">
                    <Book />
                    <span>Producción</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarCategories;