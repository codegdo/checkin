import React, { PropsWithChildren } from 'react';
import { DataColumnProps } from './gridview.type';

export const DataColumn: React.FC<PropsWithChildren<DataColumnProps>> = ({ children }): JSX.Element => {
  return <>{children}</>
}