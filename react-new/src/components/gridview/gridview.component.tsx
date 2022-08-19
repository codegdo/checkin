import React, { PropsWithChildren, useRef, useState } from 'react';
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

type Unpacked<T> =
  T extends Array<infer U>
  ? U
  : T;

export const GridViewContext = React.createContext<GridViewContextProps<Object> | null>(null);

export const GridView = <T extends Object>({ className = 'gridview', children, onCallback, ...props }: PropsWithChildren<GridViewProps<T>>): JSX.Element => {

  const { current: searchQuery } = useRef(defaultQuery);
  //const [data, setData] = useState();

  const handleCallback = (payload: { key?: string, name?: string, value?: string }) => {
    console.log('CLICK', payload);
  }

  if (props.data) {
    //const {username} = props.data[0];
  }


  return <div className={className}>

    <GridViewContext.Provider value={{ ...props, searchQuery, onCallback: handleCallback }}>
      {
        children ? <Render<T>>{children}</Render> : <Render<T> />
      }
    </GridViewContext.Provider>

  </div>
}