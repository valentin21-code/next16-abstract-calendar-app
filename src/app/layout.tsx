import '@/app/globals.scss';
import {cookies} from 'next/headers';
import themesManifest from '@/themes/manifest.json';

function resolveThemeFromCookie(raw: string | undefined) {
  const themes = themesManifest.themes ?? [];
  const fallback = themes[0]?.id ?? 'default';
  if (!raw) return fallback;

  const isValid = themes.some((t: {id: string}) => t.id === raw);
  return isValid ? raw : fallback;
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const cookieStore = await cookies();
  const rawTheme = cookieStore.get('theme')?.value;

  const theme = resolveThemeFromCookie(rawTheme);

  return (
    <html lang="es" data-theme={theme}>
      <body>{children}</body>
    </html>
  );
}