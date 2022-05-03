import React, { PropsWithChildren, useEffect, useRef } from 'react';

import { stringifySearchQuery } from '../../helpers';
import { Render } from './gridview.render';

import { CurrentQuery, GridViewContextProps, GridViewProps } from './gridview.type';

const defaultQuery: CurrentQuery = {
  search: {
    keys: [],
    value: null
  },
  sort: {
    column: null,
    direction: null
  },
  paging: {
    limit: 10,
    offset: 0
  }
};

export const GridViewContext = (<T extends Object>() => React.createContext<GridViewContextProps<T> | undefined>(undefined))();

export const GridView = <T extends Object>(props: PropsWithChildren<GridViewProps<T>>): JSX.Element => {
  const { data, columns, config = {}, status, children, onCallback } = props;
  const { pagination } = config;

  const { current: currentQuery } = useRef<CurrentQuery>(defaultQuery);

  // load form
  useEffect(() => {
    // check if has paging
    onCallback && onCallback({
      name: 'load',
      dataQuery: currentQuery, search: stringifySearchQuery(currentQuery)
    });
  }, []);

  const onSearch = (name: string) => {

    if (onCallback) {
      onCallback({ name, dataQuery: currentQuery, search: stringifySearchQuery(currentQuery) });
    } else {
      console.log(name, currentQuery);
    }
  }

  if (!data) {
    return <div>loading...</div>;
  }

  return <div className="gridview">
    <GridViewContext.Provider value={{ data, columns, config, currentQuery, status, onSearch }}>
      {children ? children : <Render>{undefined}</Render>}
    </GridViewContext.Provider>
  </div>
}



