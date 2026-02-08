'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {Select} from '@/components/simple/Select';
import themesManifest from '@/themes/manifest.json';

type ThemeId = string;
const STORAGE_KEY = 'theme';

export function ThemeSwitcher() {
  const t = useTranslations();
  const themeOptions = themesManifest.themes;
  const fallbackTheme = themeOptions[0]?.id ?? 'light';

  const [theme, setTheme] = useState<ThemeId>(fallbackTheme);
  const [hydrated, setHydrated] = useState(false);

  // 1) Cargar el tema real (localStorage) una vez
  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as ThemeId | null) ?? null;
    const isValid = saved ? themeOptions.some(th => th.id === saved) : false;

    setTheme(isValid ? saved! : fallbackTheme);
    setHydrated(true);
  }, [fallbackTheme, themeOptions]);

  // 2) Persistir SOLO cuando ya hemos “hidratado” (evita pisar con fallback)
  useEffect(() => {
    if (!hydrated) return;

    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
    document.cookie = `theme=${encodeURIComponent(theme)}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }, [theme, hydrated]);

  return (
    <Select
      name="theme"
      label={t('app.theme')}
      value={theme}
      options={themeOptions.map(th => ({
        value: th.id,
        label: th.labelKey ? t(th.labelKey) : th.id
      }))}
      onChange={(v) => {
        setTheme(v);
        // Opcional: aplicar “inmediato” sin esperar al effect
        document.documentElement.dataset.theme = v;
        localStorage.setItem(STORAGE_KEY, v);
        document.cookie = `theme=${encodeURIComponent(v)}; Path=/; Max-Age=31536000; SameSite=Lax`;
      }}
    />
  );
}