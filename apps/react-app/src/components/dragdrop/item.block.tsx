import { PropsWithChildren } from 'react';

import ItemMenu from './item.menu';
import ItemEditor from './item.editor';
import { Field, DndContextValue } from '../types';
import { useDragDrop, useItemSelect } from './hooks';

type ItemBlockProps = PropsWithChildren<Field & {
  ctx: DndContextValue;
}>;

function ItemBlock({ ctx, children, ...item }: ItemBlockProps) {
  const { ref } = useDragDrop({ item, ctx });
  const { isSelect, isEdit, onClick } = useItemSelect(item.id, ctx);

  return (
    <div data-id={`${item.id}`} ref={ref}>
      {isSelect && <ItemMenu onCallback={onClick} />}
      {children}
      {isEdit && <ItemEditor onCallback={onClick} />}
    </div>
  )
}

export default ItemBlock;