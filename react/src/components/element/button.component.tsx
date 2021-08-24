import React, { useEffect, useState } from 'react';
type ButtonData = {
  name?: string;
  label?: string;
  type?: "button" | "submit" | "reset";
}

type ButtonProps = {
  button?: ButtonData;
  status?: string;
  onClick?: (name: string) => void;
} & Partial<ButtonData>

export const Button: React.FC<ButtonProps> = ({ button, status, onClick, children, ...props }): JSX.Element => {

  const data = button || props;
  const { name = 'click', label = 'Button', type = 'button' } = data;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status])

  const handleClick = () => {
    onClick && onClick(name);
  }

  return (
    <button disabled={loading ? true : false} name={name} type={type} onClick={handleClick}>
      {
        children || label
      }
    </button>
  )
}