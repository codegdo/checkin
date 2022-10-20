export interface InputProps {
  id?: string | number;
  type: string;
  name: string;
  value?: string;
  onChange?: (key: string, value: string) => void;
}

export interface LabelProps {
  label?: string;
  description?: string;
}
