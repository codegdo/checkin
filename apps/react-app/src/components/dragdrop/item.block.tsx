import React, { PropsWithChildren } from 'react';

import ItemMenu from './item.menu';
import ItemEditor from './item.editor';
import { Field } from '../types';

type DropBlockProps = PropsWithChildren<Field>;

function ItemBlock(props: DropBlockProps) {

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

export default ItemBlock;