import React, { PropsWithChildren } from 'react';

import ItemMenu from './item.menu';
import ItemEditor from './item.editor';
import { Field } from '../types';

type ItemAreaProps = PropsWithChildren<Field & {
  ctx: string;
}>;

function ItemArea(props: ItemAreaProps) {

  return (
    <div>
      <ItemMenu />
      <ItemEditor />
      {
        props.children
      }
    </div>
  )
}

export default ItemArea;