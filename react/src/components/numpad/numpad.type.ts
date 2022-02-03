export type NumPadContextProps = {
  ref: React.MutableRefObject<null>;
  type?: 'input' | 'passcode' | 'phone';
  value: string;
  placeholder?: string;
  message?: string;
  digit?: number;
  counter?: number;
  keypress: boolean;
  autoSubmit?: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export type NumPadProps = {
  type?: 'input' | 'passcode' | 'phone';
  value?: string;
  className?: string;
  status?: string;
  placeholder?: string;
  message?: string;
  focus?: boolean;
  keypress?: boolean;
  masked?: boolean;
  autoSubmit?: boolean;
  reset?: boolean;
  digit?: number;
  onSubmit?: (value: string | undefined) => void;
}

export type NumPadInputProps = {
  className?: string;
}

export type NumPadMessageProps = {
  className?: string;
}

export type NumPadKeyProps = {
  className?: string;
}