'use client';

import React, {useMemo, useState} from 'react';
import {useTranslations} from 'next-intl';

import {logoutAction} from '@/app/actions/auth';

import {useEventsStore} from '@/lib/events-store';
import type {AppEvent} from '@/lib/types';

import {AppTopbar} from '@/components/sections/AppTopbar';
import {ThemeSwitcher} from '@/components/sections/ThemeSwitcher';
import {LanguageSwitcher} from '@/components/sections/LanguageSwitcher';
import {CalendarSection} from '@/components/sections/CalendarSection';
import {EventDialog} from '@/components/sections/EventDialog';
import {Form} from '@/components/sections/Form';

import {Button} from '@/components/simple/Button';

/*
Calendar page.

This page is client-side because it uses the demo event store in React state.
You can replace the store with API calls later without changing the calendar UI.
*/

function fromLocalInputValue(v: string) {
  // datetime-local is local time, convert to ISO.
  return new Date(v).toISOString();
}

export default function CalendarPage() {
  const t = useTranslations();
  const store = useEventsStore();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [prefill, setPrefill] = useState<{start?: string; end?: string}>({});

  const events = useMemo(() => store.events.map(e => ({
    id: e.id,
    title: e.title,
    start: e.start,
    end: e.end
  })), [store.events]);

  function openCreate(startIso?: string, endIso?: string) {
    setMode('create');
    setEditingId(null);
    setPrefill({start: startIso, end: endIso});
    setOpen(true);
  }

  function openEdit(eventId: string) {
    const evt = store.getById(eventId);
    if (!evt) return;

    setMode('edit');
    setEditingId(eventId);
    setPrefill({start: evt.start, end: evt.end});
    setOpen(true);
  }

  function onSubmit(formData: FormData) {
    const title = String(formData.get('title') ?? '').trim();
    const start = String(formData.get('start') ?? '');
    const end = String(formData.get('end') ?? '');

    if (!title || !start) return;

    const payload: Omit<AppEvent, 'id'> = {
      title,
      start: fromLocalInputValue(start),
      end: end ? fromLocalInputValue(end) : undefined
    };

    if (mode === 'create') store.add(payload);
    if (mode === 'edit' && editingId) store.update(editingId, payload);

    setOpen(false);
  }

  return (
    <div className="container">
      <AppTopbar
        title={t('calendar.title')}
        right={
          <>
            <ThemeSwitcher />
            <LanguageSwitcher />
            <Form action={logoutAction}>
              <Button type="submit" variant="danger">
                {t('app.logout')}
              </Button>
            </Form>
          </>
        }
      />

      <div className="card calendarCard">
        <div className="row calendarBar">
          <Button variant="primary" onClick={() => openCreate()}>
            {t('calendar.newEvent')}
          </Button>
          <div className="spacer" />
          <p className="small">Calendar via adapter</p>
        </div>

        <CalendarSection
          events={events}
          onSelectRange={(startIso, endIso) => openCreate(startIso, endIso)}
          onClickEvent={(id) => openEdit(id)}
        />
      </div>

      <EventDialog
        open={open}
        mode={mode}
        prefill={prefill}
        onClose={() => setOpen(false)}
        onSubmit={onSubmit}
      />
    </div>
  );
}
