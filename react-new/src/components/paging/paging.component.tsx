import React, { useEffect, useState } from 'react';
import { PagingProps } from './paging.type';
import { paging } from '../../helpers';


export const Paging: React.FC<PagingProps> = ({ className = 'pagination', current = 1, limit = 2, total = 20, onClick }): JSX.Element => {

  const count = paging.count(limit, total).length;
  const [option, setOption] = useState<{ count: number, current: number }>({ count, current });
  const [pages, setPages] = useState<(string | number)[]>(paging.get({ ...option }));

  useEffect(() => {
    setPages(paging.get({ ...option }));
  }, [option]);

  const handleClick = (payload: { key: string, value?: string }) => {

    switch (payload.key) {
      case 'first':
        setOption({ ...option, current: 1 });
        break;
      case 'previous':
        setOption({ ...option, current: option.current - 1 });
        break;
      case 'next':
        console.log(option);
        setOption({ ...option, current: option.current + 1 });
        break;
      case 'last':
        setOption({ ...option, current: count });
        break;
      default:
        if (payload.value) {
          setOption({ ...option, current: parseInt(payload.value) });
        }

    }

    onClick && onClick(payload);
  }

  return <div className={className}>
    <span>
      <button type="button" name="first" disabled={option.current == 1 ? true : false} onClick={() => handleClick({ key: 'first' })}>first</button>
      <button type="button" name="previous" disabled={option.current == 1 ? true : false} onClick={() => handleClick({ key: 'previous' })}>previous</button>
    </span>
    <span>
      {
        pages.map(page => {
          return <React.Fragment key={page}>
            {
              typeof page === 'string' ? <small>...</small> : <a aria-label={`page ${page}`} onClick={() => handleClick({ key: 'paging', value: `${page}` })}>{page}</a>
            }
          </React.Fragment>
        })
      }
    </span>
    <span>
      <button type="button" name="next" disabled={option.current == count ? true : false} onClick={() => handleClick({ key: 'next' })}>next</button>
      <button type="button" name="last" disabled={option.current == count ? true : false} onClick={() => handleClick({ key: 'last' })}>last</button>
    </span>
  </div>
}