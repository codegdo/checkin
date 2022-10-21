export interface InputProps {
  id?: string | number;
  type: string;
  name: string;
  value?: string;
  text?: string;
  onChange?: (key: string, value: string) => void;
}

export interface LabelProps {
  className?: string;
  label?: string;
  description?: string;
}
