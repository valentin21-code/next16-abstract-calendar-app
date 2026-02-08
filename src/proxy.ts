import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {routing} from './i18n/routing';

/*
Next.js 16 uses src/proxy.ts for request middleware.

We combine two concerns here:
1) next-intl routing (adds/normalizes locale prefix).
2) demo auth protection for the calendar route.

If you remove demo auth later, delete the auth section and keep next-intl middleware.
*/

const intl = createMiddleware(routing);

function getLocaleFromPath(pathname: string) {
  // pathname example: /es/login or /en/calendar
  const parts = pathname.split('/').filter(Boolean);
  const maybeLocale = parts[0];
  return routing.locales.includes(maybeLocale as any) ? maybeLocale : null;
}

export default function middleware(req: NextRequest) {
  // Step 1: let next-intl handle locale redirects first.
  const intlResponse = intl(req);

  // If next-intl decided to redirect, return it immediately.
  if (intlResponse.headers.get('location')) {
    return intlResponse;
  }

  // Step 2: auth guard (demo cookie).
  const {pathname} = req.nextUrl;
  const locale = getLocaleFromPath(pathname);

  // If locale is missing, next-intl will redirect, so we can ignore here.
  if (!locale) return intlResponse;

  const isLogin = pathname.startsWith(`/${locale}/login`);
  const isCalendar = pathname.startsWith(`/${locale}/calendar`);

  const authed = req.cookies.get('auth')?.value === '1';

  if (isCalendar && !authed) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/login`;
    return NextResponse.redirect(url);
  }

  if (isLogin && authed) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/calendar`;
    return NextResponse.redirect(url);
  }

  return intlResponse;
}

export const config = {
  // Match all routes except static files and Next internals.
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
