export type InputProps = {
  id: string;
  type: string;
  name: string;
  value?: string;
  className?: string;
  title?: string;
  placeholder?: string;
  onChange?: (input: any) => void;
}

export type InputTextData = {
  name: string;
  type: string;
  text: string;
}

export type InputData = | InputTextData;