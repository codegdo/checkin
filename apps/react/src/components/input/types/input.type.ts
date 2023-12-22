import { ChangeEvent } from "react";

export interface KeyValue {
  key: string;
  value: any;
}

export interface ILabel {
  className?: string;
  title?: string;
  description?: string;
  hint?: string;

  styles?: any;
}

export interface IInput {
  id?: string | number;
  name: string;
  type: string;
  value?: string;
  defaultValue?: string;
  data?: any;
  placeholder?: string;
  hint?: string;
}