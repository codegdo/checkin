import { ObjectSchema } from '../../helpers';

type FormOptions = {
  key?: string;
};

export interface FieldProps {
  id?: string | number;
  name: string;
  type: string;
  label?: string;
  description?: string;
  value?: string;
  isRequired?: boolean;
  [key: string]: any;
}

export interface FormProps {
  title?: string;
  description?: string;
  data?: any;
  status?: string | undefined;
  options?: FormOptions;
  onCallback?: (key?: string, values?: any) => void;
}

export interface FormContextProps extends FormProps {
  data: any;
  form: { [key: string]: any };
  errors: { [key: string]: string };
  validation: { schema: ObjectSchema };
  status: string | undefined;
  options: FormOptions;

  isSubmit: boolean;
  isReset: boolean;
  onClick: (key: string) => void;
}

export interface FormData {
  id: number;
  name: string;
  label: string;
  description: string;
  data: any;
  fields: any;
}
