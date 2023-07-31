import { NormalizeField } from "@/types"

export interface Field extends NormalizeField { }

export interface CustomFieldProps extends Field {
  handleClick?: (name: string) => void
}

export type ButtonType = {
  submit: string;
  cancel: string;
  reset: string;
  next: string;
  previous: string;
}