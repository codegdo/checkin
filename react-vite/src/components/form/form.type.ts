import { ObjectSchema } from 'joi';

export interface FieldProps {
  id?: string | number;
  name: string;
  type: string;
  label?: string;
  description?: string;
  value?: string;
  isRequired?: boolean;
}

export interface FormProps {
  title?: string;
  description?: string;
  data?: any;
  status?: string | undefined;
  onCallback?: (key?: string, value?: string) => void;
}

export interface FormContextProps extends FormProps {
  form: { [key: string]: any };
  error: { [key: string]: any };
  validation: { [key: string]: ObjectSchema<any> };
  status: string | undefined;
  isSubmitting: boolean;
  onClick: (key: string) => void;
}
