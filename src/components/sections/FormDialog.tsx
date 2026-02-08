'use client';

import React from 'react';
import {Dialog} from './Dialog';
import {Form} from './Form';
import {Button} from '@/components/simple/Button';

/*
FormDialog:
Reusable dialog that contains a form.

- Ensures the submit button is inside the <form>.
- Uses primitives Button so it remains UI-library agnostic.
*/

export function FormDialog(props: {
  open: boolean;
  title?: string;
  onClose: () => void;

  action: (formData: FormData) => void;

  submitLabel: string;
  cancelLabel: string;

  children: React.ReactNode;
}) {
  return (
    <Dialog open={props.open} title={props.title} onClose={props.onClose}>
      <Form action={props.action} className="formGrid">
        {props.children}

        <div className="ui-dialog__footer">
          <Button variant="ghost" type="button" onClick={props.onClose}>
            {props.cancelLabel}
          </Button>
          <Button variant="primary" type="submit">
            {props.submitLabel}
          </Button>
        </div>
      </Form>
    </Dialog>
  );
}
