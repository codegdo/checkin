import React from 'react';
import { ElementProps } from './form.type';

export const Element: React.FC<ElementProps> = ({ type = 'span', children }): JSX.Element => {
  return React.createElement(`${type}`, null, children)
}