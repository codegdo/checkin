export interface KeyValue {
  key: string;
  value: any;
}

export interface InputProps {
  id?: string | number;
  name: string;
  type: string;
  value?: string;
  defaultValue?: string;
  data?: any;
  placeholder?: string;
  note?: string;

  isReset?: boolean;
  onChange?: (keyValue: KeyValue) => void;
}

export interface LabelProps {
  className?: string;
  label?: string;
  description?: string;

  styles?: any;
}
