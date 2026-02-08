'use client';

import React from 'react';
import {Calendar, dateFnsLocalizer, type Event as RBCEvent} from 'react-big-calendar';
import {format, parse, startOfWeek, getDay} from 'date-fns';
import {es, enUS} from 'date-fns/locale';

import type {CalendarAdapter, CalendarViewProps} from './calendar-adapter';

/*
React Big Calendar adapter:
- React Big Calendar expects Date objects, so we convert ISO strings to Date.
- Emits selection and click events back using our adapter API.

Note:
React Big Calendar CSS is imported under src/themes/default/vendors.
*/

const locales = { es, en: enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), {weekStartsOn: 1}),
  getDay,
  locales
});

type RBCAppEvent = RBCEvent & { resource: string };

function isoToDate(iso: string) {
  return new Date(iso);
}

function CalendarView({events, onSelectRange, onClickEvent}: CalendarViewProps) {
  const rbcEvents: RBCAppEvent[] = events.map(e => {
    const start = isoToDate(e.start);
    // If end is missing, create a default 1-hour end.
    const end = e.end ? isoToDate(e.end) : new Date(start.getTime() + 60 * 60 * 1000);
    return { title: e.title, start, end, allDay: false, resource: e.id };
  });

  return (
    <div className="bigCalendar">
      <Calendar
        localizer={localizer}
        events={rbcEvents}
        selectable
        views={['month', 'week', 'day']}
        defaultView="month"
        onSelectSlot={(slot) => {
          const startIso = new Date(slot.start as Date).toISOString();
          const endIso = new Date(slot.end as Date).toISOString();
          onSelectRange?.(startIso, endIso);
        }}
        onSelectEvent={(evt) => {
          const id = (evt as RBCAppEvent).resource;
          onClickEvent?.(id);
        }}
      />
    </div>
  );
}

export const bigCalendarAdapter: CalendarAdapter = { CalendarView };
