import React, { useContext } from 'react';
import { Pagination } from '../pagination/pagination.component';
import { GridViewContext } from './gridview.component';

export const Footer: React.FC = (): JSX.Element => {

  const ctx = useContext(GridViewContext);

  if (!ctx) {
    throw new Error();
  }

  const { total, onCallback } = ctx;

  return <Pagination count={total} onCallback={onCallback} />

}