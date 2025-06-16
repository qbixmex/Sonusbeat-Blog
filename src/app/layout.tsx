import type { Metadata } from "next";
import { montserrat, notoSansMono } from "@/fonts";

import "./globals.css";
import { twMerge } from "tailwind-merge";
import { ThemeProvider } from "next-themes";
import { ModeToggle } from "@/components/switch-mode";

export const metadata: Metadata = {
  title: "Sonusbeat Blog",
  description: "Un blog sobre música electrónica, producción musical y tutoriales para la producción de música.",
};

type Props = Readonly<{ children: React.ReactNode; }>;

const RootLayout: React.FC<Props> = (props) => {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={twMerge([
        `${notoSansMono.variable}`,
        `${montserrat.variable}`,
        'antialiased',
      ])}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute top-5 right-5"><ModeToggle /></div>
          {props.children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
