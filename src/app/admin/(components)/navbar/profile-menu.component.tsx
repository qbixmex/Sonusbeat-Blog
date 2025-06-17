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
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProfileMenu: React.FC = () => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar>
            <AvatarImage src="https://avatars.githubusercontent.com/u/70177108?v=4" />
            <AvatarFallback>DG</AvatarFallback>
          </Avatar>
          <span className="sr-only">Abrir menú de perfil</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={16}>
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2">
          <User className="size-[1.2rem]" />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" className="flex items-center gap-2">
          <LogOut className="size-[1.2rem]" />
          <span>Salir</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

};

export default ProfileMenu;
