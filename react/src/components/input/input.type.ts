// INPUT
export type InputType = {
  id: number;
  name: string;

  type: 'text' | 'number' | 'currency' | 'date' | 'password';

  data: any;

  value: string;
  defaultValue: string;
}

export type InputData = Partial<InputType>;

export type InputProps = {
  input?: InputData;
  onChange?: (value?: string) => void;
} & InputData;

export type InputContextProps = {
  data: InputData;
  value?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
