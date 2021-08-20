import React from 'react';
type ButtonData = {
  name?: string;
  label?: string;
  type?: "button" | "submit" | "reset";
}

type ButtonProps = {
  button?: ButtonData;
  onClick?: (name: string) => void;
} & Partial<ButtonData>

export const Button: React.FC<ButtonProps> = ({ button, onClick, children, ...props }): JSX.Element => {

  const data = button || props;
  const { name = 'click', label = 'Button', type = 'button' } = data;

  const handleClick = () => {
    onClick && onClick(name);
  }

  return (
    <button name={name} type={type} onClick={handleClick}>
      {
        children || label
      }
    </button>
  )
}