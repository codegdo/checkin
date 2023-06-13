import React, { useRef } from 'react';

import ItemMenu from './item.menu';
import ItemEditor from './item.editor';
import { Field } from '../types';
import { useItemSelect } from './hooks';

type ItemFieldProps = Field & {
  ctx: string;
};

function ItemField({ id }: ItemFieldProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { isSelect, isEdit } = useItemSelect(ref);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    //e.stopPropagation();

    // use target.id instead of currentTarget.id
    const targetId = (e.target as HTMLDivElement).id;

    if (targetId === String(id)) {
      console.log('click field', targetId);
    }
  }

  return (
    <div id={`${id}`} ref={ref}>
      {isSelect && <ItemMenu />}
      <label>FIELD</label>
      {isEdit && <ItemEditor />}
    </div>
  )
}

export default ItemField;