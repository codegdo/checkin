import React from 'react';
import { Control } from './gridview.control';
import { Render } from './gridview.render';
import { GridViewContextProps, GridViewProps } from './gridview.type';

export const GridViewContext = React.createContext<GridViewContextProps>(undefined);

export const GridView: React.FC<GridViewProps> = ({ data, columns, fields, children, onSearch, ...props }): JSX.Element => {


  return <div className="gridview">
    <GridViewContext.Provider value={{ data, columns, fields }}>
      {
        children ? children : <><Control /><Render /></>
      }
    </GridViewContext.Provider>
  </div>
}