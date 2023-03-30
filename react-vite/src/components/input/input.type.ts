export interface KeyValue {
  key: string;
  value: any;
}

export interface InputProps {
  id?: string | number;
  type: string;
  name: string;
  value?: string;
  defaultValue?: string;
  data?: any;
  text?: string;
  unit?: string;
  isReset?: boolean;
  onChange?: (keyValue: KeyValue) => void;
}

export interface LabelProps {
  className?: string;
  label?: string;
  description?: string;

  styles?: any;
}
