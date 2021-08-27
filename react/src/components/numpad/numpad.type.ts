export type NumPadContextProps = {
  ref: React.MutableRefObject<null>;
  type?: 'input' | 'passcode';
  value: string;
  digit?: number;
  counter?: number;
  keypress: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export type NumPadProps = {
  type?: 'input' | 'passcode';
  value?: string;
  className?: string;
  focus?: boolean;
  keypress?: boolean;
  digit?: number;
  onClick?: (value: string | undefined) => void;
}

export type NumPadInputProps = {
  className?: string;
}

export type NumPadKeyPros = {
  className?: string;
}