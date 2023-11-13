import { Field } from "@/components/types";

export interface FormField extends Field { }

export interface CustomFieldProps extends Field {
  currentValue: string;
  error: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CustomElementProps extends Field {
  handleClick?: (param: string) => void
}

export type FormFieldArray = Field[];

export type ButtonType = {
  submit: string;
  cancel: string;
  reset: string;
  next: string;
  previous: string;
}

export interface FormValue {
  [key: string]: string;
}

export interface FormError {
  [key: string]: string;
}

export interface FormEvent {
  [key: string]: {
    update: (value: string) => void;
    error: React.Dispatch<React.SetStateAction<boolean>>
  };
}
