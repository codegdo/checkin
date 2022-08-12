import React, { PropsWithChildren } from 'react';
import { GridViewContextProps } from './gridview.type';

export const GridViewContext = React.createContext<GridViewContextProps<{ [key: string]: any }> | undefined>(undefined);

export const GridViewProvider = <T extends Object>({ children, ...props }: PropsWithChildren<GridViewContextProps<T>>): JSX.Element => {
  return <GridViewContext.Provider value={{ ...props }}>
    {children}
  </GridViewContext.Provider>
}