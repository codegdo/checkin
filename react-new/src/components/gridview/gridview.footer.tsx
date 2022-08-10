import React, { useContext } from 'react';
import { Paging } from '../paging/paging.component';
import { GridViewContext } from './gridview.context';

export const Footer: React.FC = (): JSX.Element => {

  const ctx = useContext(GridViewContext);

  if (!ctx) {
    throw new Error();
  }

  const { total, onClick } = ctx;

  return <Paging total={total} onClick={onClick} />

}