export interface FieldProps {
  id?: string | number;
  name: string;
  type: string;
  label?: string;
  description?: string;
  value?: string;
}

export interface FormProps {
  title?: string;
  description?: string;
  data?: any;
  status?: string | undefined;
  onCallback?: (key?: string, value?: string) => void;
}

export interface FormContextProps extends FormProps {
  form: Record<string, string | undefined>;
  error: Record<string, string | undefined>;
  validation: Record<string, string | undefined>;
  status: string | undefined;
  onClick: (keyvalue: any) => void;
}
