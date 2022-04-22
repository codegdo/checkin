import React, { PropsWithChildren } from 'react';
import { Render } from './gridview.render';

import { GridViewContextProps, GridViewProps } from './gridview.type';

export const GridViewContext = (<T extends Object>() => React.createContext<GridViewContextProps<T>>(undefined))();

export const GridView = <T extends Object>(props: PropsWithChildren<GridViewProps<T>>): JSX.Element => {
  const { children } = props;

  return <div className="gridview">
    <GridViewContext.Provider value={{ ...props }}>
      {children ? children : <Render />}
    </GridViewContext.Provider>
  </div>
}



