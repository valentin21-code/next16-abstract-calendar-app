'use client';

import React from 'react';

/*
AppTopbar:
Reusable top bar for pages.

- title: optional heading
- left: optional content on the left side
- right: optional content on the right side (switchers, logout button, etc.)

This is a client component because it is used by client pages (calendar page).
*/

export function AppTopbar(props: {
  title?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="row topbar">
      {props.left ?? null}
      {props.title ? <h1 className="h1">{props.title}</h1> : null}
      <div className="spacer" />
      {props.right ?? null}
    </div>
  );
}
