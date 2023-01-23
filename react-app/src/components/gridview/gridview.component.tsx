import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Render } from './gridview.render';
import { GridViewContextProps, GridViewProps, SearchQuery } from './gridview.type';

export const defaultQuery: SearchQuery = {
  searchKeys: [],
  searchValue: '',
  sortColumn: '',
  sortDirection: 'desc',
  pageLimit: 0,
  pageOffset: 0
}

export const GridViewContext = React.createContext<GridViewContextProps<Object> | null>(null);

export const GridView = <T extends Object>({ className = 'gridview', children, onCallback, ...props }: PropsWithChildren<GridViewProps<T>>): JSX.Element => {

  const { search } = useLocation();
  const { current: searchQuery } = useRef(defaultQuery);
  //const [data, setData] = useState();

  useEffect(() => {
    console.log('SEARCH', search);
  }, [search]);

  const handleCallback = (payload: { key?: string, name?: string, value?: string }) => {
    console.log('CLICK', payload);
  }


  return <div className={className}>

    <GridViewContext.Provider value={{ ...props, searchQuery, onCallback: handleCallback }}>
      {
        children ? <Render<T>>{children}</Render> : <Render<T> />
      }
    </GridViewContext.Provider>

  </div>
}