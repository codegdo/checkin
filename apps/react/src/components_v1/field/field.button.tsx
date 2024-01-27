import { FieldProps } from "./hooks";

export function FieldButton({name, title, onClick}: FieldProps) {
  const handleClick = () => {
    onClick && onClick(name);
  }
  return (<button type="button" onClick={handleClick}>{title}</button>);
}