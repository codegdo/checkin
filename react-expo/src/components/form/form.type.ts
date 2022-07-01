export type FormProps = {
  className?: string;
  data?: any;
  callback?: (values: Record<string, string>) => Promise<void>;
}

export type FieldProps = {
  id: string;
  type: string;
  name: string;
  className?: string;
  title?: string;
  value?: string;
  placeholder?: string;
  role?: string;
  map?: string;
  isRequired?: boolean;
}