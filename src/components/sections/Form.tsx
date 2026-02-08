'use client';

import React from 'react';

/*
Form:
Reusable wrapper for <form>.

Why this is a client component:
- Client pages/components must be able to import it.
- Server actions still work from client components in Next.

Use:
<Form action={someServerAction}>...</Form>
<Form action={(fd) => { ...client logic... }}>...</Form>
*/

export function Form(props: {
  action: (formData: FormData) => void | Promise<void>;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <form action={props.action} className={props.className}>
      {props.children}
    </form>
  );
}
