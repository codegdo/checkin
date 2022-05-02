import React, { useContext } from 'react';

import { GridViewContext } from './gridview.component';

export const PagingContext = React.createContext<any>(undefined);

export const Paging: React.FC = (): JSX.Element => {

  const context = useContext(GridViewContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  const { config, onSearch } = context;

  const pageLimit = 2;
  const pageTotal = config?.paging?.total || 0;
  const current = 1;

  const boundary = 2;
  const sibling = 0;

  const getCount = (limit: number, total: number) => {
    return new Array(Math.floor(total / limit)).fill(limit).concat(total % limit).filter(i => i);
  }

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const count = getCount(pageLimit, pageTotal).length;

  const startPages = range(1, Math.min(boundary, count));
  const endPages = range(Math.max(count - boundary + 1, boundary), count);
  const middlePages = range(current - sibling, current + sibling)

  const pages = [...startPages, ...middlePages, ...endPages];

  console.log('START', startPages);
  console.log('END', endPages);
  console.log('MIDDLE', middlePages);
  console.log('PAGES', pages);

  return <div className="paging">

    paging

  </div>
}