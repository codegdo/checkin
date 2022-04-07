import React from 'react';
import { GridviewDynamic } from './gridview.dynamic';
import { GridviewStatic } from './gridview.static';
import { GridviewContextProps, GridviewProps } from './gridview.type';

export const GridviewContext = React.createContext<GridviewContextProps>(undefined);

export const Gridview: React.FC<GridviewProps> = ({ data, columns, search, children }): JSX.Element => {
  return <div className="gridview">
    <GridviewContext.Provider value={{ data, columns, search }}>
      {
        children ? <GridviewStatic>{children}</GridviewStatic> : <GridviewDynamic />
      }
    </GridviewContext.Provider>
  </div>
}