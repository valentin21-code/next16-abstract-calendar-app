import {cookies} from 'next/headers';

export const AUTH_COOKIE = 'auth';

export async function setAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, '1', {httpOnly: true, path: '/'});
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, '0', {httpOnly: true, path: '/', maxAge: 0});
}

export async function isAuthed() {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE)?.value === '1';
}
