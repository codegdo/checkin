import { NormalizeField } from "@/types"

export interface Field extends NormalizeField { }

export interface CustomFieldProps extends Field {
  currentValue: string;
  events: FormEvents;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdate?: (param: string) => void;
  handleCallback?: (param: { name: string, value: string }) => void;
}

export interface CustomElementProps extends Field {
  handleClick?: (param: string) => void
}

export type ButtonType = {
  submit: string;
  cancel: string;
  reset: string;
  next: string;
  previous: string;
}

export interface FormValues {
  [key: string]: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormEvents {
  [key: string]: {
    update: (value: string) => void;
  };
}