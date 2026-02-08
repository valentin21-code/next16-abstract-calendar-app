'use client';

import {useMemo, useState} from 'react';
import type {AppEvent} from './types';

/*
Client-side event store for the demo.

- Uses React state (in memory).
- In a real app, replace with API calls (REST/GraphQL) or server actions + DB.
- The rest of the UI should not change if you swap the store implementation.
*/

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export function useEventsStore() {
  const [events, setEvents] = useState<AppEvent[]>([
    {id: 'seed-1', title: 'Demo', start: new Date().toISOString()}
  ]);

  return useMemo(() => ({
    events,

    add(evt: Omit<AppEvent, 'id'>) {
      setEvents(prev => [...prev, {id: uid(), ...evt}]);
    },

    update(id: string, patch: Partial<Omit<AppEvent, 'id'>>) {
      setEvents(prev => prev.map(e => e.id === id ? {...e, ...patch} : e));
    },

    getById(id: string) {
      return events.find(e => e.id === id);
    }
  }), [events]);
}
