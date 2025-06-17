import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import {
  Plus,
  Projector,
  PlusCircle,
} from "lucide-react";

export const SidebarProjects: React.FC = () => {
  return (
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
  );
};

export default SidebarProjects;