import React, { PropsWithChildren, useRef } from 'react';
import { GridViewProvider } from './gridview.context';
import { Render } from './gridview.render';
import { GridViewProps, SearchQuery } from './gridview.type';

const defaultQuery: SearchQuery = {
  searchKeys: [],
  searchValue: '',
  sortColumn: '',
  sortDirection: 'desc',
  pageLimit: 0,
  pageOffset: 0
}

export const GridView = <T extends Object>({ className = 'gridview', children, onClick, ...props }: PropsWithChildren<GridViewProps<T>>): JSX.Element => {

  const { current: searchQuery } = useRef(defaultQuery);

  const handleClick = (payload: { key?: string, value?: string }) => {
    console.log('CLICK', payload);
  }

  return <div className={className}>
    <GridViewProvider<T> {...props} searchQuery={searchQuery} onClick={handleClick}>
      {
        children ? <Render>{children}</Render> : <Render />
      }
    </GridViewProvider>
  </div>
}