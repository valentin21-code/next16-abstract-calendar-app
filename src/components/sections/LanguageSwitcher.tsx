'use client';

import {useLocale, useTranslations} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import {Select} from '@/components/simple/Select';

/*
LanguageSwitcher:
- Uses next-intl router helpers so locale is always kept in the URL.
- Adding a new language only requires:
  1) Add locale to src/i18n/routing.ts
  2) Add src/i18n/messages/<locale>.json
*/

export function LanguageSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Select
      name="language"
      label={t('app.language')}
      value={locale}
      options={routing.locales.map(l => ({value: l, label: l.toUpperCase()}))}
      onChange={(nextLocale) => {
        router.replace(pathname, {locale: nextLocale});
      }}
    />
  );
}
