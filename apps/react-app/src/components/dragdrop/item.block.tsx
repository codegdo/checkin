import React, { PropsWithChildren, useRef } from 'react';

import ItemMenu from './item.menu';
import ItemEditor from './item.editor';
import { Field } from '../types';
import { useItemSelect } from './hooks';

type ItemBlockProps = PropsWithChildren<Field & {
  ctx: string;
}>;

function ItemBlock({ id, children }: ItemBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { isSelect, isEdit } = useItemSelect(ref);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    //e.stopPropagation();

    // use target.id instead of currentTarget.id
    const targetId = (e.target as HTMLDivElement).id;

    if (targetId === String(id)) {
      console.log('click block', targetId);
    }
  }

  return (
    <div id={`${id}`} ref={ref}>
      {isSelect && <ItemMenu />}
      {children}
      {isEdit && <ItemEditor />}
    </div>
  )
}

export default ItemBlock;