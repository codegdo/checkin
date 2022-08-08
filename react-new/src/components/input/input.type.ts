export interface InputProps {
  id?: string | number;
  type: string;
  name: string;
  value?: string;
  onChange?: (key: string, value: string) => void;
}
