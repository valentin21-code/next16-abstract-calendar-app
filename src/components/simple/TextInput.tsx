'use client';

import React from 'react';
import {useUi} from '@/providers/UiProvider';
import type {TextInputProps} from '@/adapters/ui/ui-adapter';

/*
TextInput primitive used everywhere.
*/

export function TextInput(props: TextInputProps) {
  const {TextInput: C} = useUi();
  return <C {...props} />;
}
