import React, { useEffect, useState } from 'react';
import { useLoading } from '../../hooks';
type ButtonData = {
  name?: string;
  label?: string;
  type?: "button" | "submit" | "reset";
}

type ButtonProps = {
  button?: ButtonData;
  loading?: string;
  onClick?: (name: string) => void;
} & Partial<ButtonData>

export const Button: React.FC<ButtonProps> = ({ button, loading, onClick, children, ...props }): JSX.Element => {

  const data = button || props;
  const { name = 'click', label = 'Button', type = 'button' } = data;

  const isLoading = useLoading(loading);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onClick && onClick(name);
  }

  return (
    <button disabled={isLoading} name={name} type={type} onClick={e => handleClick(e)}>
      {
        children || label
      }
    </button>
  )
}