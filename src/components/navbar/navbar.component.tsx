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
  // { id: "4c65", url: '/news', label: 'News' },
  // { id: "cxy7", url: '/tutorials', label: 'Tutorials' },
  // { id: "d41c", url: '/articles', label: 'Articles' },
  // { id: "e6ea", url: '/music', label: 'Music' },
  // { id: "9abg", url: '/videos', label: 'Videos' },
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
    <div className={cn(cssClasses)}>
      <nav className="flex items-center">
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
          <div className="absolute top-0 left-0 z-[1000] w-screen h-screen bg-stone-50 dark:bg-stone-900 flex flex-col items-center justify-center gap-5 p-5 md:hidden text-2xl">
            <CircleX
              size={30}
              className="text-gray-400 cursor-pointer absolute top-10 right-10"
              onClick={toggleMobileMenu}
            />
            {links.map(({id, url, label}) => (
              <Link
                key={id}
                href={url}
                className={cn(path === url && "text-stone-800 dark:text-stone-200")}
                onClick={toggleMobileMenu}
              >{label}</Link>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
};

const cssClasses = [
  "w-full",
  "mx-auto px-8 pt-5 pb-10",
  "md:max-w-[95%] md:px-0",
  "lg:max-w-[90%]",
  "xl:max-w-[85%]",
  "2xl:max-w-[80%]",
];

type Props = Readonly<{
  className?: string;
  toggleMobileMenu: () => void;
}>;

const MobileMenu: React.FC<Props> = (props) => {
  const { className, toggleMobileMenu } = props;

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
