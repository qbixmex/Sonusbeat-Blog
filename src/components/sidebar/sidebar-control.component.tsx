import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
} from "../ui/sidebar";
import { Item } from "./data";

type Props = Readonly<{
  items: Item[];
}>;

export const SidebarControl: React.FC<Props> = ({ items }) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Gestión</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(({ id, title, url, Icon }) => (
            <SidebarMenuItem key={id}>
              <SidebarMenuButton asChild tooltip={{
              children: title,
              className: "text-secondary-foreground font-semibold",
            }}>
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
  );
};

export default SidebarControl;