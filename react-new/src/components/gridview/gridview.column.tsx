import React from 'react';

interface ColumnProps {
  id?: string | number;
  name: string;
  type: string;
  role?: string;
}

export const Column: React.FC<ColumnProps> = (props): JSX.Element => {
  return <div>{props.name}</div>
}