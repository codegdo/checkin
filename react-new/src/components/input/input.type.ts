export interface InputProps {
  id?: string | number;
  type: string;
  name: string;
  value?: string | number;
  defaultValue?: string | number;
  data?: any;
  text?: string;
  unit?: string;
  onChange?: ({ key, value }: { key: string; value: any }) => void;
}

export interface LabelProps {
  className?: string;
  label?: string;
  description?: string;

  style?: any;
}
