import React from 'react';

import ItemMenu from './item.menu';
import ItemEditor from './item.editor';
import { Field } from '../types';

type ItemGridProps = Field & {
  ctx: string;
};

function ItemGrid(props: ItemGridProps) {

  return (
    <>
      <ItemMenu />
      <ItemEditor />
    </>
  )
}

export default ItemGrid;