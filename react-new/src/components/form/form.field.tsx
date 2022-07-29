import React from 'react';

interface FieldProps {
  id?: string | number;
  name: string;
  type: string;
  role?: string;
}

export const Field: React.FC<FieldProps> = (props): JSX.Element => {
  return <div>{props.name}</div>
}