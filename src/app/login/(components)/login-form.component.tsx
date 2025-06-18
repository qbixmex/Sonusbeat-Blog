import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Send } from "lucide-react";

type Props = { className?: string; } & React.ComponentProps<"div">;

export const LoginForm: React.FC<Props> = ({ className, ...props }) => {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bienvenido de Vuelta</CardTitle>
          <CardDescription>
            Accede con tu cuenta de Github ó Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  <Image
                    src="/images/svg/github.svg"
                    alt="GitHub Logo"
                    width={16}
                    height={16}
                    className="invert"
                  />
                  Github
                </Button>
                <Button variant="outline" className="w-full">
                  <Image
                    src="/images/svg/google.svg"
                    alt="GitHub Logo"
                    width={16}
                    height={16}
                    className="invert"
                  />
                  Google
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Accede con tus credenciales
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input id="password" type="password" />
                </div>
                <Button type="submit" className="w-full">
                  Acceder <Send />
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
};

export default LoginForm;
