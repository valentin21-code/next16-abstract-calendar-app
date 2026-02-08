import type {ComponentType, PropsWithChildren} from 'react';

/*
UiAdapter defines the minimal UI surface that the app uses.

Rules:
- Pages and sections must use primitives from src/components/simple.
- They never import an external UI library (Antd, MUI, etc.) directly.

To replace the UI library:
1) Create a new adapter implementing UiAdapter (see native-adapter.tsx and antd-adapter.tsx).
2) Change ONE line in src/adapters/ui/index.ts
*/

export type ButtonProps = {
  variant?: 'primary' | 'ghost' | 'danger';
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
};

export type TextInputProps = {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
};

export type SelectOption = {value: string; label: string};

export type SelectProps = {
  name: string;
  label?: string;
  options: SelectOption[];
  defaultValue?: string;

  // Controlled usage (needed for ThemeSwitcher and LanguageSwitcher).
  value?: string;
  onChange?: (value: string) => void;
};

export type ModalProps = PropsWithChildren<{
  open: boolean;
  title?: string;
  onClose: () => void;
}>;

export type FormFieldProps = PropsWithChildren<{
  label?: string;
  hint?: string;
}>;

export type UiAdapter = {
  /*
  Some UI libraries need extra providers for SSR/styles (Ant Design registry, etc.).
  The app layout always renders uiAdapter.AppProviders, so pages do not care.
  */
  AppProviders: ComponentType<PropsWithChildren<{locale: string}>>;

  Button: ComponentType<PropsWithChildren<ButtonProps>>;
  TextInput: ComponentType<TextInputProps>;
  Select: ComponentType<SelectProps>;
  Modal: ComponentType<ModalProps>;
  FormField: ComponentType<FormFieldProps>;
};
