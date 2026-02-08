import type {ComponentType} from 'react';

/*
CalendarAdapter defines the minimal calendar API used by the app.

Rules:
- Pages/sections never import FullCalendar or any other calendar library.
- They only use CalendarSection (src/components/sections/CalendarSection.tsx).
- To switch calendar library, you implement a new adapter and change ONE line
  in src/adapters/calendar/index.ts
*/

export type CalendarEvent = {
  id: string;
  title: string;
  start: string; // ISO string
  end?: string;  // ISO string
};

export type CalendarViewProps = {
  events: CalendarEvent[];
  onSelectRange?: (startIso: string, endIso: string) => void;
  onClickEvent?: (eventId: string) => void;
};

export type CalendarAdapter = {
  CalendarView: ComponentType<CalendarViewProps>;
};
