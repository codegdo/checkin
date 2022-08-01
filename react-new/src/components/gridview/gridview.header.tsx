import React from 'react';

interface HeaderProps {
  columns?: any;
}

export const Header: React.FC<HeaderProps> = (props): JSX.Element => {
  console.log(props);
  return <div>Control</div>
}