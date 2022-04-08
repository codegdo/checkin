import React from 'react';
import { GridviewDynamic } from './gridview.dynamic';
import { GridviewContextProps, GridviewProps } from './gridview.type';

export const GridviewContext = React.createContext<GridviewContextProps>(undefined);

export const Gridview: React.FC<GridviewProps> = ({ data, columns, fields, children }): JSX.Element => {
  return <div className="gridview">
    <GridviewContext.Provider value={{ data, columns, fields }}>
      {
        children ? children : <GridviewDynamic />
      }
    </GridviewContext.Provider>
  </div>
}