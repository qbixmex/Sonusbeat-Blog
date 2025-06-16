"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Menu, CircleX } from "lucide-react";
import { ModeToggle } from "../switch-mode";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

const links = [
  { id: "8ybq", url: '/', label: 'Home' },
  { id: "4c65", url: '/news', label: 'News' },
  { id: "cxy7", url: '/tutorials', label: 'Tutorials' },
  { id: "d41c", url: '/articles', label: 'Articles' },
  { id: "e6ea", url: '/music', label: 'Music' },
  { id: "9abg", url: '/videos', label: 'Videos' },
];

export const Navbar: React.FC = () => {
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
        <Link href="/" className={cn(path === '/' && "text-primary")}>
          <Home />
        </Link>
        <div className="hidden md:flex items-center gap-5">
          {links.map(({id, url, label}) => {
            if (url === '/') return null;
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
        <MobileMenu toggleMobileMenu={toggleMobileMenu} />
        <ModeToggle />
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

const MobileMenu: React.FC<{
  className?: string;
  toggleMobileMenu: () => void;
}> = ({ className, toggleMobileMenu }) => {
  return (
    <Button
      size="icon"
      variant="secondary"
      className={cn("border md:hidden", className)}
      onClick={toggleMobileMenu}
    >
      <span className="sr-only">Open menu</span>
      <Menu size={20} />
    </Button>
  );
};

export default Navbar;
