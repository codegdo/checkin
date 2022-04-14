import React, { useContext } from 'react';

import { GridViewContext } from './gridview.component';

export const PagingContext = React.createContext<any>(undefined);

export const Paging: React.FC = (): JSX.Element => {

  const context = useContext(GridViewContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  const { columns } = context;

  return <div className="paging">paging</div>
}