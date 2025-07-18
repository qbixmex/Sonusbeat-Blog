'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar';
import { LogOut, Mail, User, UserRoundPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from '@/app/(auth)/actions/handleLogout';
import { getInitials } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const ProfileMenu: React.FC = () => {
  const { data } = useSession();
  const { user } = data ?? {
    expires: '',
    user: {
      id: '',
      name: '',
      image: '',
      email: '',
      username: '',
      isActive: false,
      roles: []
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar>
            {user.image !== 'no-image.jpg' && (
              <AvatarImage src={user.image} alt={`${user.name} profile image`} />
            )}
            <AvatarFallback>{ getInitials(user.name) }</AvatarFallback>
          </Avatar>
          <span className="sr-only">Abrir menú de perfil</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={16}>
        <DropdownMenuLabel>
          <section className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="size-[1.2rem]" />
            <span>{user.name}</span>
          </section>
          <section className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="size-[1.2rem]" />
            <span>{user.email}</span>
          </section>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/admin/profile/${user.id}`} className="flex items-center gap-2">
            <UserRoundPen className="size-[1.2rem]" />
            <span>Perfil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          className="flex items-center gap-2"
          onClick={logout}
        >
          <LogOut className="size-[1.2rem]" />
          <span>Salir</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
