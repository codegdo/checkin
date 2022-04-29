import React, { PropsWithChildren, useRef } from 'react';
import { stringifySearchQuery } from '../../helpers';
import { Render } from './gridview.render';

import { CurrentQuery, GridViewContextProps, GridViewProps } from './gridview.type';

export const GridViewContext = (<T extends Object>() => React.createContext<GridViewContextProps<T> | undefined>(undefined))();

export const GridView = <T extends Object>(props: PropsWithChildren<GridViewProps<T>>): JSX.Element => {
  const { data, columns, config, status, children, onCallback } = props;
  const { current: currentQuery } = useRef<CurrentQuery>({
    search: {
      keys: [],
      value: null
    },
    sort: {
      column: null,
      direction: null
    }
  });

  const onSearch = (name: string) => {

    if (onCallback) {
      onCallback({ name, dataQuery: currentQuery, search: stringifySearchQuery(currentQuery) });
    } else {
      console.log(name, currentQuery);
    }
  }

  return <div className="gridview">
    <GridViewContext.Provider value={{ data, columns, config, currentQuery, status, onSearch }}>
      {children ? children : <Render>{undefined}</Render>}
    </GridViewContext.Provider>
  </div>
}



