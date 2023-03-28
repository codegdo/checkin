import React, { PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren {
  name?: string;
  className?: string;
  text?: string;
  disabled?: boolean;
  onClick?: (name: string) => void;
}

export function Button({ name = 'button', className = 'button', text = 'button', disabled = false, onClick, children }: ButtonProps) {

  const handleClick = () => {
    onClick && onClick(name);
  }

  return <button className={className} type="button" name={name} disabled={disabled} onClick={handleClick}>
    {children ? children : text}
  </button>
}