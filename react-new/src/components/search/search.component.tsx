import React from 'react';

interface SearchProps {
  className?: string;
  filters?: any[];
  onClick?: () => void;
}

export const Search: React.FC<SearchProps> = ({ className = 'search', filters = [], onClick }): JSX.Element => {

  const handleClick = () => {
    onClick && onClick();
  }

  return <div className={className}>
    <input type="text" />
    <button type="button" name="search" onClick={handleClick}>Search</button>
    <button type="button" name="clear" onClick={handleClick}>Clear</button>
  </div>
}