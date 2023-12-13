import { ChangeEvent } from "react";

export interface KeyValue {
  key: string;
  value: any;
}

export interface LabelField {
  className?: string;
  title?: string;
  description?: string;
  hint?: string;

  styles?: any;
}

export interface InputField {
  id?: string | number;
  name: string;
  type: string;
  value?: string;
  defaultValue?: string;
  data?: any;
  placeholder?: string;
  hint?: string;

  onChange?: (event:ChangeEvent<HTMLInputElement>) => void;
}