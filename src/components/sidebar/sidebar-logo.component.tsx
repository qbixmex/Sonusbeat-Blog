import Link from "next/link";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { LayoutDashboard } from "lucide-react";

export const SidebarLogo = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip={{
          children: "Panel Administrativo",
          className: "text-secondary-foreground font-semibold",
        }}>
          <Link href="/admin/dashboard">
            <LayoutDashboard />
            <span>Panel</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarLogo;