import { FC } from "react";
import Providers from "@/app/providers";
import type { Metadata } from "next";
import { montserrat, notoSansMono } from "@/fonts";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Panel de administración para Sonusbeat Blog',
  robots: { index: false, follow: false },
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

const fontsVariables = [
  notoSansMono.variable,
  montserrat.variable,
];

const AdminLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/sonusbeat_32_32.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={`${fontsVariables.join(' ')} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default AdminLayout;
