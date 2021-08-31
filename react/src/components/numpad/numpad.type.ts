export type NumPadContextProps = {
  ref: React.MutableRefObject<null>;
  type?: 'input' | 'passcode' | 'phone';
  value: string;
  placeholder?: string;
  digit?: number;
  counter?: number;
  keypress: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export type NumPadProps = {
  type?: 'input' | 'passcode' | 'phone';
  value?: string;
  className?: string;
  loading?: string;
  placeholder?: string;
  focus?: boolean;
  keypress?: boolean;
  masked?: boolean;
  digit?: number;
  onSubmit?: (value: string | undefined) => void;
}

export type NumPadInputProps = {
  className?: string;
}

export type NumPadKeyPros = {
  className?: string;
}