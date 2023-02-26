import React, { PropsWithChildren } from 'react';

export interface ButtonProps {
  name?: string;
  className?: string;
  text?: string;
  disabled?: boolean;
  onClick?: (name: string) => void;
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ name = 'button', className = 'button', text = 'button', disabled = false, onClick, children }): JSX.Element => {

  const handleClick = () => {
    onClick && onClick(name);
  }

  return <button className={className} type="button" name={name} disabled={disabled} onClick={handleClick}>
    {children ? children : text}
  </button>
}