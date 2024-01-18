import { FieldType } from "@/components_v1/types";

export interface IField extends FieldType {
  // id?: number | string | null;
  // name: string;
  // type: string;
  // title?: string | null;
  // description?: string | null;
  // hint?: string | null;
  // placeholder?: string | null;
  // value?: string | null;
  // readonly?: boolean;
  // disabled?: boolean;
  // maxLength?: number;
  // minLength?: number;
  // pattern?: string | null;
  // required?: boolean;
  // autoComplete?: string | null;
  // autoFocus?: boolean;
  // step?: number;
  // min?: number;
  // max?: number;
  // rows?: number;
  // cols?: number;
  // multiple?: boolean;
  // list?: string | null;
  // checked?: boolean;

  onChange?: (value: string) => void;
  onBlur?: (value?: string) => void;
  onFocus?: (value?: string) => void;
}