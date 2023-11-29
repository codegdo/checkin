import { PropsWithChildren } from 'react';
import { utils } from '@libs/shared-code';

import DropMenu from './drop.menu';
import DropEditor from './drop.editor';
import { DndField, DndContextValue } from './types';
import { useDragDrop, useDragDropSelect } from './hooks';

type DropBlockProps = PropsWithChildren<DndField & {
  ctx: DndContextValue;
}>;

function DropBlock({ ctx, children, ...item }: DropBlockProps) {
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
      {isSelect && <DropMenu onCallback={onClick} />}
      {children}
      {isEdit && <DropEditor onCallback={onClick} />}
    </div>
  )
}

export default DropBlock;