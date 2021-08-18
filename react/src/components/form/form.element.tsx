import React from 'react';

type ElementProps = {
  type?: 'div'
}

export const Element: React.FC<ElementProps> = ({ type = 'div', children }): JSX.Element => {
  return React.createElement(`${type}`, null, children)
}