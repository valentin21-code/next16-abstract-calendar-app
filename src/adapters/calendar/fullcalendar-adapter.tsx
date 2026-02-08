'use client';

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import type {CalendarAdapter, CalendarViewProps} from './calendar-adapter';

/*
FullCalendar adapter:
- Maps our CalendarEvent[] into FullCalendar events.
- Emits selection and click events back using our adapter API.

Note:
FullCalendar v6 injects its own base styles; optional overrides live in
src/themes/default/adapters/calendar/fullcalendar.scss.
*/

function CalendarView({events, onSelectRange, onClickEvent}: CalendarViewProps) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      selectable
      editable={false}
      events={events}
      select={(info) => onSelectRange?.(info.startStr, info.endStr)}
      eventClick={(info) => onClickEvent?.(String(info.event.id))}
      height="auto"
    />
  );
}

export const fullCalendarAdapter: CalendarAdapter = { CalendarView };
