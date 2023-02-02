export interface KeyValue {
  key: string;
  value: any;
}

export interface InputProps {
  id?: string | number;
  type: string;
  name: string;
  value?: string | number;
  defaultValue?: string | number;
  data?: any;
  text?: string;
  unit?: string;
  onChange?: (keyvalue: KeyValue) => void;
}

export interface LabelProps {
  className?: string;
  label?: string;
  description?: string;

  styles?: any;
}
