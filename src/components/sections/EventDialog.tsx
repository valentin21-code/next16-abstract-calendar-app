'use client';

import React from 'react';
import {useTranslations} from 'next-intl';
import {FormDialog} from './FormDialog';
import {TextInput} from '@/components/simple/TextInput';

/*
EventDialog:
Reusable dialog for creating/editing calendar events.

Important:
- The event shape is always the same, no matter which calendar library you use.
- Calendar adapters only change how events are displayed, not how they are stored.
*/

function toLocalInputValue(iso?: string) {
  if (!iso) return '';

  const d = new Date(iso);
  const pad = (n:number) => String(n).padStart(2,'0');

  // datetime-local expects: YYYY-MM-DDTHH:mm (local time)
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function EventDialog(props: {
  open: boolean;
  mode: 'create' | 'edit';
  prefill?: {start?: string; end?: string};
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}) {
  const t = useTranslations();

  return (
    <FormDialog
      open={props.open}
      title={props.mode === 'create' ? t('calendar.newEvent') : t('calendar.editEvent')}
      onClose={props.onClose}
      action={props.onSubmit}
      cancelLabel={t('calendar.cancel')}
      submitLabel={t('calendar.save')}
    >
      <TextInput name="title" label={t('calendar.eventTitle')} required />
      <TextInput
        name="start"
        label={t('calendar.start')}
        type="datetime-local"
        defaultValue={toLocalInputValue(props.prefill?.start)}
        required
      />
      <TextInput
        name="end"
        label={t('calendar.end')}
        type="datetime-local"
        defaultValue={toLocalInputValue(props.prefill?.end)}
      />
    </FormDialog>
  );
}
