import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

const LocaleLayout: React.FC<Props> = async ({ children, params }) => {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
 
  return (
    <NextIntlClientProvider>
      {children}
    </NextIntlClientProvider>
  );
}

export default LocaleLayout;
