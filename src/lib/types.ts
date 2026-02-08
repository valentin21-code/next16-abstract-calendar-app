/*
Domain types used by the app.
Keep these stable so UI/calendars can be swapped without breaking the app.
*/

export type AppEvent = {
  id: string;
  title: string;
  start: string; // ISO
  end?: string;  // ISO
};
