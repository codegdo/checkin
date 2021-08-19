import React from 'react';

import { Render as render } from './form.render';

export type BlockData = {
  id?: number;
  type?: 'div' | 'section';
  role?: 'block' | 'field';
  data?: any;
}

type BlockProps = {
  block?: BlockData;
} & BlockData

export const Block: React.FC<BlockProps> = (props): JSX.Element | null => {

  const { children, block, ..._props } = props;
  const _block = block ? block : _props;
  const { type = 'div', data } = _block;

  console.log('BLOCKS', data);

  return React.createElement(`${type}`, null, (block ? render({ data }) : children));
}