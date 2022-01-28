import React from 'react';

import { FormRender as render } from './form.render';
import { BlockProps } from './form.type';

export const FormBlock: React.FC<BlockProps> = ({ children, block, ...props }): JSX.Element | null => {

  const data = block || props;
  const { type = 'div' } = data;

  //console.log('BLOCK', data);

  return React.createElement(`${type}`, null, (block ? render({ data }) : children));
}