
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { content, management } from "./data";
import Link from "next/link";
import { ChevronUp, LayoutDashboard, User2, LogOut, Plus, PlusCircle, Eye, ChevronsUpDown, Rocket, Projector, Music2, Music, SquareLibrary, Book } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import { CollapsibleContent } from "@radix-ui/react-collapsible";

export const AppSidebar: React.FC = async () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/admin/dashboard">
                <LayoutDashboard />
                <span>Panel</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Contenido</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {content.map(({ id, title, url, Icon }) => (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton asChild tooltip={title}>
                    <Link href={url}>
                      <Icon />
                      <span>{title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Proyectos</SidebarGroupLabel>
          <SidebarGroupAction>
            <Plus />
            <span className="sr-only">Agregar Articulo</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Ver Proyectos">
                  <Link href="#">
                    <Projector />
                    <span>Ver Proyectos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Crear Proyecto">
                  <Link href="#">
                    <PlusCircle />
                    <span>Agregar Proyecto</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Collapsible defaultOpen={false} className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <span>Lanzamientos</span>
                <ChevronsUpDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Ver Lanzamientos">
                      <Link href="#">
                        <Eye />
                        <span>Ver Lanzamientos</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Crear Lanzamiento">
                      <Link href="#">
                        <Rocket />
                        <span>Crear Lanzamiento</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <SidebarGroup>
          <SidebarGroupLabel>Categorías</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Padre">
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
                <SidebarMenuButton asChild tooltip="Padre">
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

        <SidebarGroup>
          <SidebarGroupLabel>Gestión</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {management.map(({ id, title, url, Icon }) => (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton asChild tooltip={title}>
                    <Link href={url}>
                      <Icon />
                      <span>{title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {title === "Mensajes" && (
                    <SidebarMenuBadge>8</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <Avatar>
                  <AvatarImage
                    src="https://avatars.githubusercontent.com/u/70177108?v=4"
                    className="size-5"
                  />
                  <AvatarFallback>DG</AvatarFallback>
                </Avatar>
                <span className="sr-only">Abrir menú de perfil</span>
                <span>Daniel González</span>
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><User2 /> Perfil</DropdownMenuItem>
              <DropdownMenuItem><LogOut /> Salir</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
};

export default AppSidebar;
