'use client';

import { FC } from 'react';

import { useLocale } from 'next-intl';
import { usePathname, redirect } from '@/i18n/navigation';
import MexicoFlagIcon from '@/components/icons/mexico-flag-icon.component';
import USAFlagIcon from '@/components/icons/usa-flag-icon.component';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const locales = [
  { code: "en", label: "English", icon: <USAFlagIcon /> },
  { code: "es", label: "Español", icon: <MexicoFlagIcon /> },
];

export const LanguageSwitcher: FC = () => {
  const locale = useLocale();
  const pathname = usePathname();

  const current = locales.find(object => object.code === locale);

  return (
    <Select value={locale} onValueChange={(newLocale) => {
      redirect({ href: pathname, locale: newLocale });
    }}>
      <SelectTrigger className="w-36">
        <SelectValue>
          <span className="flex items-center gap-2">
            {current?.icon}
            {current?.label}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {locales.map(({ code, label, icon }) => (
          <SelectItem key={code} value={code}>
            <span>{icon}</span>
            <span>{label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;