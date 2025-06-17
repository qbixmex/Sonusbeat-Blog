import type { Metadata } from "next";
import { montserrat, notoSansMono } from "@/fonts";

import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sonusbeat Blog",
  description: "Un blog sobre música electrónica, producción musical y tutoriales para la producción de música.",
};

const fontsVariables = [
  notoSansMono.variable,
  montserrat.variable,
];

type Props = Readonly<{ children: React.ReactNode; }>;

const RootLayout: React.FC<Props> = (props) => {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/images/svg/react.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={`${fontsVariables.join(' ')} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="w-full">
            {props.children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
