'use client';

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Credentials } from "./credentials.component";
import { handleLoginGoogle } from "@/app/(auth)/actions/handleLoginGoogle";
import { handleLoginGithub } from "@/app/(auth)/actions/handleLoginGithub";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import styles from "./styles.module.css";

type Notification = {
  type: 'error' | 'success' | 'info' | 'warning' | 'default';
  message: string;
};

type Props = { className?: string; } & React.ComponentProps<"div">;

export const LoginForm: React.FC<Props> = ({ className, ...props }) => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const t = useTranslations('LoginPage');

  const [notification, setNotification] = useState<Notification>({
    type: 'default',
    message: '',
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (error === 'auth') {
      setNotification({
        type: 'error',
        message: '¡ No se pudo iniciar sesión !',
      });
      timeout = setTimeout(() => {
        setNotification({
          type: 'default',
          message: '',
        });
        const url = new URL(window.location.href);
        url.searchParams.delete('error');
        window.history.replaceState({}, '', url.toString());
      }, 3000)
    }
    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {error && notification.message &&
        <div className={cn(styles.notification, {
          [styles.notificationInfo]: notification.type === 'info',
          [styles.notificationSuccess]: notification.type === 'success',
          [styles.notificationWarning]: notification.type === 'warning',
          [styles.notificationError]: notification.type === 'error',
          [styles.notificationDefault]: notification.type === 'default',
        })}>
          {notification.message}
        </div>
      }
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t('title')}</CardTitle>
          <CardDescription>
            {t('socialMediaInstructions')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <form action={handleLoginGithub}>
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
              </form>
              <form action={handleLoginGoogle}>
                <Button variant="outline" className="w-full">
                  <Image
                    src="/images/svg/google.svg"
                    alt="Google Logo"
                    width={16}
                    height={16}
                    className="invert"
                  />
                  Google
                </Button>
              </form>
            </div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                {t('credentialsInstructions')}
              </span>
            </div>
            <Credentials />
          </div>
        </CardContent>
      </Card>
    </div>
  )
};

export default LoginForm;
