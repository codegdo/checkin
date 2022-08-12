import React, { useContext } from 'react';
import { Pagination } from '../pagination/pagination.component';
import { GridViewContext } from './gridview.context';

export const Footer: React.FC = (): JSX.Element => {

  const ctx = useContext(GridViewContext);

  if (!ctx) {
    throw new Error();
  }

  const { total, onClick } = ctx;

  return <Pagination count={total} onClick={onClick} />

}