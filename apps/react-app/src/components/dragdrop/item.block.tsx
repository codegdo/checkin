import React, { PropsWithChildren, useRef } from 'react';

import ItemMenu from './item.menu';
import ItemEditor from './item.editor';
import { Field } from '../types';
import { useItemSelect } from './hooks';
import { DndContextValue } from './types';

type ItemBlockProps = PropsWithChildren<Field & {
  ctx: DndContextValue;
}>;

function ItemBlock({ id, ctx, children }: ItemBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const {isSelect, isEdit, onClick} = useItemSelect(id, ctx);

  return (
    <div data-id={`${id}`} ref={ref}>
      {isSelect && <ItemMenu onCallback={onClick} />}
      {children}
      {isEdit && <ItemEditor onCallback={onClick} />}
    </div>
  )
}

export default ItemBlock;