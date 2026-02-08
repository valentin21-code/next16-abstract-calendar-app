'use server';

import {redirect} from 'next/navigation';
import {headers} from 'next/headers';

import {setAuthCookie, clearAuthCookie} from '@/lib/auth';
import {routing} from '@/i18n/routing';

/*
Server actions for login/logout.

- loginAction sets the cookie and redirects to /[locale]/calendar.
- logoutAction clears the cookie and redirects to /[locale]/login.

Why we do NOT use relative redirects:
- Relative paths can accidentally chain (e.g. /calendar/login/calendar) if the current
  URL is not the expected one.
- We derive the locale from the Referer header and build an absolute path.
*/

function getLocaleFromReferer(referer: string | null): string {
  if (!referer) return routing.defaultLocale;

  try {
    const url = new URL(referer);
    const parts = url.pathname.split('/').filter(Boolean);
    const maybeLocale = parts[0];
    return routing.locales.includes(maybeLocale as any) ? maybeLocale : routing.defaultLocale;
  } catch {
    return routing.defaultLocale;
  }
}

async function currentLocale(): Promise<string> {
  const h = await headers();
  const referer = h.get('referer');
  return getLocaleFromReferer(referer);
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get('email') ?? '');
  const pass = String(formData.get('password') ?? '');

  if (!email || !pass) return;

  await setAuthCookie();

  const locale = await currentLocale();
  redirect(`/${locale}/calendar`);
}

export async function logoutAction() {
  await clearAuthCookie();

  const locale = await currentLocale();
  redirect(`/${locale}/login`);
}
