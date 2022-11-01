export interface InputProps {
  id?: string | number;
  type: string;
  name: string;
  value?: string;
  text?: string;
  onChange?: ({ key, value }: { key: string; value: any }) => void;
}

export interface LabelProps {
  className?: string;
  label?: string;
  description?: string;
}
