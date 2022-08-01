import React, { PropsWithChildren } from 'react';

export interface GridViewContextProps {
  data?: any;
  columns?: any;
  status?: string;
  onCallback?: (key?: string, value?: string) => void;
};

type GridViewProviderProps = GridViewContextProps;

const initialProps: GridViewContextProps = {
  data: null,
  columns: null,
  onCallback: () => console.log('onCallback')
}

export const GridViewContext = React.createContext<GridViewContextProps>(initialProps);

export const GridViewProvider: React.FC<PropsWithChildren<GridViewProviderProps>> = ({ children, ...props }) => {
  return <GridViewContext.Provider value={{ ...props }}>
    {children}
  </GridViewContext.Provider>
}