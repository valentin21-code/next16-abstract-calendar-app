'use client';

import React from 'react';
import {useUi} from '@/providers/UiProvider';
import type {SelectProps} from '@/adapters/ui/ui-adapter';

/*
Select primitive used everywhere.
*/

export function Select(props: SelectProps) {
  const {Select: C} = useUi();
  return <C {...props} />;
}
