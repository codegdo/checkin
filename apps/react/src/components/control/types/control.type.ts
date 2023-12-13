import { ChangeEvent } from "react";

export interface IControl {
  id?: string | number;
  name: string;
  title?: string;
  description?: string;
  type: string;
  value?: string;
  defaultValue?: string;
  data?: any;
  placeholder?: string;

  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
