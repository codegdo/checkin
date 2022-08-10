import React from 'react';
import { PagingProps } from './paging.type';
import { paging } from '../../helpers';

export const Paging: React.FC<PagingProps> = ({ className = 'search', total = 20, onClick }): JSX.Element => {

  const handleClick = (payload: { key: string, value?: string }) => {
    console.log(payload);

    console.log(paging.count(3, 20));
    onClick && onClick(payload);
  }

  return <div className={className}>
    <button type="button" name="paging" onClick={() => handleClick({ key: 'paging' })}>Paging</button>
  </div>
}