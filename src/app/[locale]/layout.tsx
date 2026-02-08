import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';

import {routing} from '@/i18n/routing';
import ClientUiProviders from './ClientUiProviders';

/*
Locale layout:
- Loads translations for the current locale.
- Wraps the app with client-side providers (UI adapter + theme init).

This layout does NOT render <html> or <body>.
Those are rendered in src/app/layout.tsx.
*/

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ClientUiProviders locale={locale}>{children}</ClientUiProviders>
    </NextIntlClientProvider>
  );
}
