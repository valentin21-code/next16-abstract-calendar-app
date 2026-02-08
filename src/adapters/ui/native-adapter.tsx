'use client';

import React, {useEffect, useRef} from 'react';
import type {
  UiAdapter,
  ButtonProps,
  ModalProps,
  FormFieldProps,
  TextInputProps,
  SelectProps
} from './ui-adapter';

/*
Native adapter:
- Uses only standard HTML elements.
- Uses the global CSS classes defined in src/themes/default/ui/primitives.scss.

If you replace this adapter with a library adapter (Antd, MUI, etc.),
you do not change pages/components. You only change src/adapters/ui/index.ts
*/

function AppProviders({children}: React.PropsWithChildren<{locale: string}>) {
  // Native adapter does not need extra providers.
  return <>{children}</>;
}

function Button({
  children,
  variant = 'ghost',
  type = 'button',
  disabled,
  onClick
}: React.PropsWithChildren<ButtonProps>) {
  const cls = [
    'ui-button',
    variant === 'primary' ? 'ui-button--primary' : '',
    variant === 'danger' ? 'ui-button--danger' : ''
  ].filter(Boolean).join(' ');

  return (
    <button className={cls} type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

function FormField({label, hint, children}: FormFieldProps) {
  return (
    <div className="ui-field">
      {label ? <div className="ui-field__label">{label}</div> : null}
      {children}
      {hint ? <div className="ui-field__hint">{hint}</div> : null}
    </div>
  );
}

function TextInput({name, label, type='text', placeholder, defaultValue, required}: TextInputProps) {
  return (
    <FormField label={label}>
      <input
        className="ui-input"
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
      />
    </FormField>
  );
}

function Select({name, label, options, defaultValue, value, onChange}: SelectProps) {
  return (
    <FormField label={label}>
      <select
        className="ui-select"
        name={name}
        defaultValue={defaultValue}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </FormField>
  );
}

function Modal({open, title, onClose, children}: ModalProps) {
  /*
  We use <dialog> because it is built-in and accessible.
  The surrounding "sections/Dialog" component adds footer buttons when needed.
  */
  const ref = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="ui-dialog"
      onCancel={(e) => {
        // Prevent closing by ESC so parent controls the state.
        e.preventDefault();
        onClose();
      }}
    >
      <div className="ui-dialog__head">
        <div className="ui-dialog__title">{title}</div>
        <div className="spacer" />
        <button type="button" className="ui-dialog__close" onClick={onClose}>✕</button>
      </div>
      <div className="ui-dialog__body">{children}</div>
    </dialog>
  );
}

export const nativeUiAdapter: UiAdapter = {
  AppProviders,
  Button,
  TextInput,
  Select,
  Modal,
  FormField
};
