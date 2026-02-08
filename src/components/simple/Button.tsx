'use client';

import React from 'react';
import {useUi} from '@/providers/UiProvider';
import type {ButtonProps} from '@/adapters/ui/ui-adapter';

/*
Button primitive used everywhere.
Do not import a UI library button directly in pages/sections.
*/

export function Button(props: React.PropsWithChildren<ButtonProps>) {
  const {Button: C} = useUi();
  return <C {...props} />;
}
