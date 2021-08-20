import React from 'react';

import { FormRender as render } from './form.render';
import { BlockProps } from './form.type';

export const Block: React.FC<BlockProps> = ({ children, block, ...options }): JSX.Element | null => {

  const data = block || options;
  const { type = 'div' } = data;

  console.log('BLOCKS', data);

  return React.createElement(`${type}`, null, (block ? render({ data }) : children));
}