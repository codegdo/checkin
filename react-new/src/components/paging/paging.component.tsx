import React from 'react';

interface PagingProps {
  className?: string;
  filters?: any[];
  onClick?: () => void;
}

export const Paging: React.FC<PagingProps> = ({ className = 'search', filters = [], onClick }): JSX.Element => {

  const handleClick = () => {
    onClick && onClick();
  }

  return <div className={className}>
    <input type="text" />
    <button type="button" name="search" onClick={handleClick}>Search</button>
    <button type="button" name="clear" onClick={handleClick}>Clear</button>
  </div>
}