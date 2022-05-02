import React, { useContext } from 'react';

import { GridViewContext } from './gridview.component';

export const PagingContext = React.createContext<any>(undefined);

export const Paging: React.FC = (): JSX.Element => {

  const context = useContext(GridViewContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  const { config, onSearch } = context;

  const pageLimit = 5;
  const pageTotal = config?.paging?.total || 0;

  const count = (limit: number, total: number) => {
    return new Array(Math.floor(total / limit)).fill(limit).concat(total % limit).filter(i => i).length;
  }
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  console.log(typeof config?.paging);
  console.log(count(pageLimit, pageTotal));

  return <div className="paging">

    paging

  </div>
}