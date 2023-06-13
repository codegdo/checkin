import React, { PropsWithChildren } from 'react';

import ItemMenu from './item.menu';
import ItemEditor from './item.editor';
import { Field } from '../types';

type ItemSectionProps = PropsWithChildren<Field & {
  ctx: string;
}>;

function ItemSection(props: ItemSectionProps) {

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

export default ItemSection;