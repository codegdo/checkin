import React from 'react';

import ItemMenu from './item.menu';
import ItemEditor from './item.editor';
import { Field } from '../types';

type ItemFieldProps = Field & {
  ctx: string;
};

function ItemField(props: ItemFieldProps) {

  return (
    <div>
      <ItemMenu />
      <ItemEditor />
      <label>FIELD</label>
    </div>
  )
}

export default ItemField;