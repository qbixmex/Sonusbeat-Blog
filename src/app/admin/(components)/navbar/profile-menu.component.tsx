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
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from '@/app/(auth)/actions/handleLogout';
import { getInitials } from "@/lib/utils";

type Props = Readonly<{
  profile: {
    avatar: string;
    name: string;
  };
}>;

export const ProfileMenu: React.FC<Props> = ({ profile }) => {
  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar>
            <AvatarImage
              src={profile.avatar}
              alt={`${profile.name} profile image`}
            />
            <AvatarFallback>{ getInitials(profile.name) }</AvatarFallback>
          </Avatar>
          <span className="sr-only">Abrir menú de perfil</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={16}>
        <DropdownMenuLabel>{profile.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2">
          <User className="size-[1.2rem]" />
          <span>Perfil</span>
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
