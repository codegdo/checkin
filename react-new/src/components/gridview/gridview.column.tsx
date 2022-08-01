import React, { PropsWithChildren } from 'react';

interface ColumnProps {
  id?: string | number;
  name: string;
  type: string;
  role?: string;
}

export const Column: React.FC<PropsWithChildren<ColumnProps>> = ({ children }): JSX.Element => {
  return <>{children}</>
}