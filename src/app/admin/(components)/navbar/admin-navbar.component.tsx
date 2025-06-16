"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CircleX } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/switch-mode";
import { ProfileMenu } from "./profile-menu.component";
import OpenPublicPage from "./open-public-page.component";
import MobileMenu from "./mobile-menu.component";

const links = [
  { id: "8ybq", url: '/admin/dashboard', label: 'Dashboard' },
  { id: "4c65", url: '/users', label: 'Users' },
  { id: "cxy7", url: '/articles', label: 'articles' },
  { id: "d41c", url: '/videos', label: 'Videos' },
  { id: "e6ea", url: '/music', label: 'Music' },
];

export const AdminNavbar: React.FC = () => {
  const path = usePathname();
  const [ mobileMenu, setMobileMenu ] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenu(prev => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenu(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <nav className="p-5 flex items-center">
      <div className="flex items-center gap-5 font-semibold text-gray-400">
        <Link href="/admin/dashboard" className={cn(path === '/admin/dashboard' && "text-primary")}>
          <LayoutDashboard />
        </Link>

        <div className="hidden md:flex items-center gap-5">
          {links.map(({id, url, label}) => {
            if (url === '/admin/dashboard') return null;
            return (
              <Link
                key={id}
                href={url}
                className={cn(path === url && "text-primary")}
              >{label}</Link>
            );
          })}
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <OpenPublicPage />
        <MobileMenu toggleMobileMenu={toggleMobileMenu} />
        <ModeToggle />
        <ProfileMenu />
      </div>

      {mobileMenu && (
        <div className="absolute top-0 left-0 w-screen h-screen bg-stone-50 dark:bg-stone-900 flex flex-col items-center justify-center gap-5 p-5 md:hidden text-2xl">
          <CircleX
            size={30}
            className="text-gray-400 cursor-pointer absolute top-10 right-10"
            onClick={toggleMobileMenu}
          />
          {links.map(({id, url, label}) => (
            <Link
              key={id}
              href={url}
              className={cn(path === url && "text-primary")}
              onClick={toggleMobileMenu}
            >{label}</Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
