import React, { useMemo, useState } from 'react';
import { PaginationProps } from './pagination.type';
import { pagingHelper } from '../../helpers';


export const Pagination: React.FC<PaginationProps> = ({ className = 'pagination', count = 10, current = 1, sibling = 1, boundary = 1, onCallback }): JSX.Element => {

  const [option, setOption] = useState<{ count: number, current: number, sibling: number, boundary: number }>({ count, current, sibling, boundary });

  const pages = useMemo(() => {
    return pagingHelper.get({ ...option });
  }, [option]);

  const handleClick = (payload: { key: string, value?: string }) => {

    if (payload.value) {
      setOption({ ...option, current: parseInt(payload.value) });
    }

    onCallback && onCallback(payload);
  }

  return <div className={className}>
    <span>
      <button type="button" name="first" disabled={option.current == 1 || count <= 1 ? true : false} onClick={() => handleClick({ key: 'paging', value: '1' })}>first</button>
      <button type="button" name="previous" disabled={option.current == 1 || count <= 1 ? true : false} onClick={() => handleClick({ key: 'paging', value: `${option.current - 1}` })}>previous</button>
    </span>
    <span>
      {
        pages.map(page => {
          return <React.Fragment key={page}>
            {
              typeof page === 'string'
                ? <small onClick={() => handleClick({ key: 'paging', value: `${page == 'start-ellipsis' ? option.current - (sibling * 2 + 1) : option.current + (sibling * 2 + 1)}` })}>...</small>
                : <a
                  aria-label={`page ${page}`}
                  aria-current={option.current == page ? true : false}
                  onClick={() => handleClick({ key: 'paging', value: `${page}` })}
                >{page}</a>
            }
          </React.Fragment>
        })
      }
    </span>
    <span>
      <button type="button" name="next" disabled={option.current == count || count <= 1 ? true : false} onClick={() => handleClick({ key: 'paging', value: `${option.current + 1}` })}>next</button>
      <button type="button" name="last" disabled={option.current == count || count <= 1 ? true : false} onClick={() => handleClick({ key: 'paging', value: `${count}` })}>last</button>
    </span>
  </div>
}