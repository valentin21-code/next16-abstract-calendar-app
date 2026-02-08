'use client';

import React, {createContext, useContext} from 'react';
import type {UiAdapter} from '@/adapters/ui/ui-adapter';

/*
UiProvider stores the current UiAdapter in React context.

Primitives in src/components/simple read this context and render the
corresponding adapter component.

Pages and sections never import adapters directly.
*/

const UiCtx = createContext<UiAdapter | null>(null);

export function UiProvider({adapter, children}: React.PropsWithChildren<{adapter: UiAdapter}>) {
  return <UiCtx.Provider value={adapter}>{children}</UiCtx.Provider>;
}

export function useUi() {
  const v = useContext(UiCtx);
  if (!v) throw new Error('UiProvider is missing in the root layout.');
  return v;
}
