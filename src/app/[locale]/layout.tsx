import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import GoogleAnalyticsWrapper from "@/components/google-analytics.component";
import Providers from "@/app/providers";

import type { Metadata } from "next";
import { montserrat, notoSansMono } from "@/fonts";
import "@/app/globals.css";

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export const metadata: Metadata = {
  title: "Sonusbeat Blog",
  description: "Un blog sobre música electrónica, producción musical y tutoriales para la producción de música.",
};

const fontsVariables = [
  notoSansMono.variable,
  montserrat.variable,
];

const LocaleLayout: React.FC<Props> = async ({ children, params }) => {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/sonusbeat_32_32.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        {process.env.NEXT_PUBLIC_SITE_URL && (
          <>
            <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/`} />
            {/* Google Hreflangs */}
            <link rel="alternate" hrefLang="es" href={`${process.env.NEXT_PUBLIC_SITE_URL}/es/`} />
            <link rel="alternate" hrefLang="en" href={`${process.env.NEXT_PUBLIC_SITE_URL}/en/`} />
            <link rel="alternate" hrefLang="x-default" href={`${process.env.NEXT_PUBLIC_SITE_URL}/`} />
          </>
        )}
      </head>
      <body className={`${fontsVariables.join(' ')} antialiased`}>
        <NextIntlClientProvider locale={locale}>
          <main className="w-full">
            <Providers>
              {children}
              <GoogleAnalyticsWrapper />
            </Providers>
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default LocaleLayout;
