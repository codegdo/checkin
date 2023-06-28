import { PropsWithChildren, useEffect } from 'react';
import { utils } from '@libs/shared-code';

import ItemMenu from './item.menu';
import ItemEditor from './item.editor';
import { Field, DndContextValue } from '../types';
import { useDragDrop, useDragDropSelect } from './hooks';

type ItemBlockProps = PropsWithChildren<Field & {
  ctx: DndContextValue;
}>;

function ItemList({ ctx, children, ...item }: ItemBlockProps) {
  const { ref, drag, drop, isDragging, isOver } = useDragDrop({ item, ctx });
  const { isSelect, isEdit, onClick } = useDragDropSelect(item.id, ctx);

  const classNames = utils.classNames('drop-item', {
    'is-dragging': isDragging,
    'is-over': isOver,
    'is-empty': item.data?.length == 0
  });

  drag(drop(ref));

  return (
    <div className={classNames} data-id={`${item.id}`} ref={ref}>
      {isSelect && <ItemMenu onCallback={onClick} />}
      {children}
      {isEdit && <ItemEditor onCallback={onClick} />}
    </div>
  )
}

export default ItemList;