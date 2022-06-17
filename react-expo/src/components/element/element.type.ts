export type ElementButton = {
  name: string;
  type: string;
  value?: string;
  title?: string;
  className?: string;
  onClick?: (key: string, value: string | undefined) => void;
}

export type ElementProps = | ElementButton;

