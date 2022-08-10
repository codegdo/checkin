import React, { PropsWithChildren } from 'react';
import { GridviewColumnProps } from './gridview.type';


export const Column: React.FC<PropsWithChildren<GridviewColumnProps>> = ({ children }): JSX.Element => {
  return <>{children}</>
}