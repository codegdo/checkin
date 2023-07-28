import { NormalizeField } from "@/types";

export interface Field extends NormalizeField {};

export type ButtonType = {
  submit: string;
  cancel: string;
  reset: string;
  next: string;
  previous: string;
};