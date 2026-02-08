import {defineRouting} from 'next-intl/routing';

/*
Routing config for locales.
To add a new language:
1) Add it to locales below.
2) Create src/i18n/messages/<locale>.json
No other code changes are required.
*/
export const routing = defineRouting({
  locales: ['es', 'en'] as const,
  defaultLocale: 'es',
  localePrefix: 'always'
});

export type AppLocale = (typeof routing.locales)[number];
