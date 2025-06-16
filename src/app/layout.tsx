import type { Metadata } from "next";
import { montserrat, notoSansMono } from "@/fonts";

import "./globals.css";
import { twMerge } from "tailwind-merge";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/navbar/navbar.component";

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
          <main className="w-full">
            <Navbar />
            {props.children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
