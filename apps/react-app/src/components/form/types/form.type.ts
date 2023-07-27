import { Field } from "@/types";

export type FieldType = Field;

// export enum ButtonType {
//   SUBMIT = 'submit',
//   RESET = 'reset',
//   CANCEL = 'cancel',
//   NEXT = 'next',
//   PREVIOUS = 'previous'
// }

export type ButtonType = {
  submit: string;
  cancel: string;
  reset: string;
  next: string;
  previous: string;
};