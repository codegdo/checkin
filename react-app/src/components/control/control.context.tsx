import React, { FC, PropsWithChildren, createContext } from 'react';


import { ControlContextProps, ControlProps } from './control.type';

export const ControlContext = createContext<ControlContextProps | null>(null);

export const ControlProvider: FC<PropsWithChildren<ControlProps>> = ({ data, values, children, onChange, onClick }) => {

  return <ControlContext.Provider value={{ data, values, onChange, onClick }}>
    {children}
  </ControlContext.Provider>
}