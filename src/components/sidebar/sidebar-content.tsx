import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "../ui/sidebar";
import { Item } from "./data";

type Props = Readonly<{
  items: Item[];
}>;

export const SidebarManagement: React.FC<Props> = ({ items }) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Contenido</SidebarGroupLabel>
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
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarManagement;
