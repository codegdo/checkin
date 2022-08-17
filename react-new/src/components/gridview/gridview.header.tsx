import React, { useContext } from 'react';
import { Search } from '../search/search.component';
import { GridViewContext } from './gridview.component';
import { HeaderProps } from './gridview.type';

export const Header: React.FC<HeaderProps> = (props): JSX.Element => {

  const ctx = useContext(GridViewContext);

  if (!ctx) {
    throw new Error();
  }

  const { columns = [], onCallback } = ctx;

  return <Search filters={[...props.columns || [], ...columns]} onCallback={onCallback} />
}