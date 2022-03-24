import { InputElementType } from '../form/form.type';

// INPUT
export type InputType = {
  id: number;
  name: string;

  type: InputElementType;

  data: any;
  value: string;
  defaultValue: string;

  isRequired: boolean;
};

export type InputData = Partial<InputType>;

export type InputProps = {
  input?: InputData;
  status?: string;
  onChange?: (value?: string) => void;
} & InputData;

export type InputContextProps = {
  input: InputData;
  value: string | undefined;
  handleChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};
