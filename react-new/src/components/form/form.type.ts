
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
  onClick: (key?: string, value?: string) => void;
};

