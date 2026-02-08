# Next 16 Abstract Calendar App

This project demonstrates a small Next.js app with:
- Login page (cookie-based demo auth)
- Calendar page (event create/edit via dialog)
- Multi-language with next-intl (locale in the URL)
- Theme system with SCSS tokens and theme overrides
- 100% abstract UI components and 100% abstract calendar component (adapter pattern)

## Run

1) Install
- npm install

2) Start
- npm run dev

Open:
- http://localhost:3000/es/login
- http://localhost:3000/en/login

## How to switch UI component library

Open:
- src/adapters/ui/index.ts

Change ONE line:
- export const uiAdapter = nativeUiAdapter;
to:
- export const uiAdapter = antdUiAdapter;

Then restart dev server if needed.

## How to switch calendar library

Open:
- src/adapters/calendar/index.ts

Change ONE line:
- export const calendarAdapter = fullCalendarAdapter;
to:
- export const calendarAdapter = bigCalendarAdapter;

## How to add a new language

1) Add the locale code to:
- src/i18n/routing.ts

2) Add translations file:
- src/i18n/messages/<locale>.json

No other code changes are required.

## How to add a new theme

1) Create a folder:
- src/themes/<themeName>/index.scss

2) Import it in:
- src/themes/themes.scss

3) Register it in the manifest:
- src/themes/manifest.json

4) Add a translation key for the theme label (recommended):
- src/i18n/messages/<locale>.json
