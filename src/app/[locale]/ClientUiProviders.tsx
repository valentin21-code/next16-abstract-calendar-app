'use client';

import React, {useLayoutEffect} from 'react';
import {uiAdapter} from '@/adapters/ui';
import {UiProvider} from '@/providers/UiProvider';
import themesManifest from '@/themes/manifest.json';

const THEME_STORAGE_KEY = 'theme';

function applyThemeFromStorage() {
  try {
    const options = themesManifest.themes;
    const serverTheme = document.documentElement.dataset.theme; // ya viene del SSR/cookie

    const fallback =
      (serverTheme && options.some(t => t.id === serverTheme) ? serverTheme : null) ??
      (options[0]?.id ?? 'light');

    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    const theme = saved && options.some(t => t.id === saved) ? saved : fallback;

    document.documentElement.dataset.theme = theme;
    document.cookie = `theme=${encodeURIComponent(theme)}; Path=/; Max-Age=31536000; SameSite=Lax`;
  } catch {
    // ignore
  }
}

export default function ClientUiProviders({locale, children}: {locale: string; children: React.ReactNode}) {
  useLayoutEffect(() => {
    applyThemeFromStorage();
  }, []);

  return (
    <uiAdapter.AppProviders locale={locale}>
      <UiProvider adapter={uiAdapter}>{children}</UiProvider>
    </uiAdapter.AppProviders>
  );
}