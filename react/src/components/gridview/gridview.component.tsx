import React from 'react';
import { Render } from './gridview.render';

import { GridViewContextProps, GridViewProps } from './gridview.type';

export const GridViewContext = React.createContext<GridViewContextProps>(undefined);

export const GridView: React.FC<GridViewProps> = ({ children, ...props }): JSX.Element => {
  return <div className="gridview">
    <GridViewContext.Provider value={{ ...props }}>
      {children ? children : <Render />}
    </GridViewContext.Provider>
  </div>
}