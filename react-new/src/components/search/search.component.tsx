import React from 'react';
import { SearchProps } from './search.type';

export const Search: React.FC<SearchProps> = ({ className = 'search', filters = [], onCallback }): JSX.Element => {

  const handleClick = (payload: { key: string, value?: string }) => {

    console.log(payload);
    onCallback && onCallback(payload);
  }

  return <div className={className}>
    <span>
      <input type="text" />
      <button type="button" name="search" onClick={() => handleClick({ key: 'search' })}>Search</button>
      <button type="button" name="clear" onClick={() => handleClick({ key: 'clear' })}>Clear</button>
    </span>
  </div>
}