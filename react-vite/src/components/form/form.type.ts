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
}

export interface FormProps {
  title?: string;
  description?: string;
  data?: any;
  status?: string | undefined;
  options?: FormOptions;
  onCallback?: (key?: string, value?: string) => void;
}

export interface FormContextProps extends FormProps {
  data: any;
  form: { [key: string]: any };
  errors: { [key: string]: string };
  validation: { [key: string]: ObjectSchema };
  status: string | undefined;
  options: FormOptions;

  isSubmit: boolean;
  isReset: boolean;
  onClick: (key: string) => void;
}
