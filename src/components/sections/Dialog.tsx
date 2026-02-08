'use client';

import React from 'react';
import {useUi} from '@/providers/UiProvider';

/*
Dialog:
Reusable dialog wrapper.

- Uses the current UI adapter modal.
- Does not assume buttons. Buttons are provided by the caller.
- Use FormDialog for dialogs that contain forms.
*/

export function Dialog(props: {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const {Modal} = useUi();

  return (
    <Modal open={props.open} title={props.title} onClose={props.onClose}>
      {props.children}
    </Modal>
  );
}
