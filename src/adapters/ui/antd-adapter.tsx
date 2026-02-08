'use client';

import React, {useId, useState} from 'react';
import {AntdRegistry} from '@ant-design/nextjs-registry';
import {ConfigProvider, Button as AntButton, Input, Modal as AntModal, Select as AntSelect} from 'antd';

import esES from 'antd/locale/es_ES';
import enUS from 'antd/locale/en_US';

// If you use antd v5 with React 19, install and import the patch once:
// import '@ant-design/v5-patch-for-react-19';

import type {UiAdapter, ButtonProps, TextInputProps, SelectProps, ModalProps, FormFieldProps} from './ui-adapter';

/*
Ant Design adapter:
- Renders Antd components but keeps the same UiAdapter API.
- Pages and sections still use primitives from src/components/simple.

Important note about <Select>:
- Antd Select is not a native <select>, so it does not submit "name=value" by default.
- We render a hidden input to include the value in FormData when using server actions.
*/

const antdLocaleMap: Record<string, any> = {
  es: esES,
  en: enUS
};

function AppProviders({children, locale}: React.PropsWithChildren<{locale: string}>) {
  return (
    <AntdRegistry>
      <ConfigProvider locale={antdLocaleMap[locale] ?? enUS}>
        {children}
      </ConfigProvider>
    </AntdRegistry>
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

function Button({children, variant='ghost', type='button', disabled, onClick}: React.PropsWithChildren<ButtonProps>) {
  const props: any = {htmlType: type, disabled, onClick};

  if (variant === 'primary') props.type = 'primary';
  if (variant === 'danger') props.danger = true;

  return <AntButton {...props}>{children}</AntButton>;
}

function TextInput({name, label, type='text', placeholder, defaultValue, required}: TextInputProps) {
  const control =
    type === 'password'
      ? <Input.Password name={name} placeholder={placeholder} defaultValue={defaultValue} required={required} />
      : <Input name={name} type={type} placeholder={placeholder} defaultValue={defaultValue} required={required} />;

  return <FormField label={label}>{control}</FormField>;
}

function Select({name, label, options, defaultValue, value, onChange}: SelectProps) {
  // Keep an internal value if the parent uses defaultValue (uncontrolled).
  const [internal, setInternal] = useState<string>(value ?? defaultValue ?? '');
  const controlValue = value ?? internal;

  const inputId = useId();

  return (
    <FormField label={label}>
      <AntSelect
        className="ui-antd-select"
        value={controlValue}
        options={options.map(o => ({value: o.value, label: o.label}))}
        onChange={(v) => {
          const next = String(v);
          setInternal(next);
          onChange?.(next);
        }}
      />
      {/* This hidden input ensures FormData contains the value */}
      <input id={inputId} type="hidden" name={name} value={controlValue} />
    </FormField>
  );
}

function Modal({open, title, onClose, children}: ModalProps) {
  return (
    <AntModal
      open={open}
      title={title}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      {children}
    </AntModal>
  );
}

export const antdUiAdapter: UiAdapter = {
  AppProviders,
  Button,
  TextInput,
  Select,
  Modal,
  FormField
};
