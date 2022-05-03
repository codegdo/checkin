import React, { useContext } from 'react';
import { pageCount, pageRange } from '../../helpers';

import { GridViewContext } from './gridview.component';

export const PagingContext = React.createContext<any>(undefined);

export const Paging: React.FC = (): JSX.Element => {

  const context = useContext(GridViewContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  const { config, currentQuery: { paging }, status, onSearch } = context;

  const pageLimit = paging.limit;
  const pageTotal = config?.pagination?.total || 0;
  const current = 1;

  const boundary = 1;
  const sibling = 1;

  const count = pageCount(pageLimit, pageTotal).length;

  const endStart = Math.min(boundary, count);
  const startEnd = Math.max(count - boundary + 1, boundary + 1);
  const startMiddle = Math.max(Math.min(current - sibling, count - boundary - sibling * 2 - 1), boundary + 2);
  const endMiddle = Math.min(Math.max(current + sibling, boundary + sibling * 2 + 2), count - boundary - 1);

  const startPages = pageRange(1, endStart);
  const endPages = pageRange(startEnd, count);
  const middlePages = pageRange(startMiddle, endMiddle);

  const pages = [...startPages, ...middlePages, ...endPages];

  console.log('START', startPages);
  console.log('END', endPages);
  console.log('MIDDLE', middlePages);
  console.log('PAGES', pages);

  const handleClick = (page: number) => {
    console.log(page);
    paging.offset = (page - 1) * paging.limit;
    onSearch && onSearch('search');
  }

  return <div className="paging">

    {
      pages.map(page => {
        return <span onClick={() => handleClick(page)} key={page}>{page}</span>
      })
    }

  </div>
}