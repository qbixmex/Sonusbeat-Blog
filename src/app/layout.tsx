import type { Metadata } from "next";
import { montserrat, notoSansMono } from "@/fonts";

import "./globals.css";
import Providers from "./providers";

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
        <link rel="icon" type="image/png" href="/sonusbeat_32_32.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={`${fontsVariables.join(' ')} antialiased`}>
        <Providers>
          <main className="w-full">
            {props.children}
          </main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
