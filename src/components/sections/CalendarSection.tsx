'use client';

import React from 'react';
import {calendarAdapter} from '@/adapters/calendar';
import type {CalendarEvent} from '@/adapters/calendar/calendar-adapter';

/*
CalendarSection:
Reusable calendar component for any page.

- It only depends on the CalendarAdapter API.
- It does not import a calendar library.

To switch calendar library:
Change ONE line in src/adapters/calendar/index.ts
*/

export function CalendarSection(props: {
  events: CalendarEvent[];
  onSelectRange: (startIso: string, endIso: string) => void;
  onClickEvent: (eventId: string) => void;
}) {
  const CalendarView = calendarAdapter.CalendarView;

  return (
    <div className="calendarWrap">
      <CalendarView
        events={props.events}
        onSelectRange={props.onSelectRange}
        onClickEvent={props.onClickEvent}
      />
    </div>
  );
}
