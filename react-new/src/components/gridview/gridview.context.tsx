import React, { PropsWithChildren } from 'react';
import { GridViewProps } from './gridview.type';

export const GridViewContext = React.createContext<GridViewProps<{ [key: string]: any }> | undefined>(undefined);

export const GridViewProvider = <T extends Object>({ children, ...props }: PropsWithChildren<GridViewProps<T>>): JSX.Element => {
  return <GridViewContext.Provider value={{ ...props }}>
    {children}
  </GridViewContext.Provider>
}