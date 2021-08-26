export type NumPadContextProps = {
  value: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export type NumPadProps = {
  value?: string;
  onClick?: (value: string | undefined) => void;
}