"use client";

import { ModeToggle } from "@/components/switch-mode";
import { ProfileMenu } from "./profile-menu.component";
import OpenPublicPage from "./open-public-page.component";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { PanelLeftIcon } from "lucide-react";
import { User } from "@/root/next-auth";

export const AdminNavbar: React.FC<{ user: User }> = ({ user }) => {
  const { toggleSidebar } = useSidebar();

  return (
    <nav className="p-5 flex items-center">
      <Button
        variant="ghost"
        onClick={toggleSidebar}
      >
        <PanelLeftIcon />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>

      <div className="ml-auto flex items-center gap-2">
        <OpenPublicPage />
        <ModeToggle />
        <ProfileMenu profile={{
          name: user.name,
          avatar: user.image,
        }} />
      </div>
    </nav>
  );
};

export default AdminNavbar;
