import React from 'react';

export const Block: React.FC = ({ children }): JSX.Element => {
  return React.createElement('div', null, children)
}