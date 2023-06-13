import React from 'react';

import ItemMenu from './item.menu';
import ItemEditor from './item.editor';
import { Field } from '../types';

type ItemGroupProps = Field & {
  ctx: string;
};

function ItemGroup(props: ItemGroupProps) {

  return (
    <>
      <ItemMenu />
      <ItemEditor />
    </>
  )
}

export default ItemGroup;