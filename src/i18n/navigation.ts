import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

/*
Typed navigation helpers (Link, router, pathname) that understand locales.
Use these instead of next/navigation when you want to keep locale in the URL.
*/
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
