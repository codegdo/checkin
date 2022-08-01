import React, { useContext } from 'react';
import { Search } from '../search/search.component';
import { GridViewContext } from './gridview.context';

interface HeaderProps {
  columns?: any;
}

export const Header: React.FC<HeaderProps> = ({ columns }): JSX.Element => {
  const { columns: cols = [] } = useContext(GridViewContext);

  return <Search filters={columns} />
}