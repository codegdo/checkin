import React from 'react';

import { useDragDrop } from './hooks/use-dragdrop.hook';
import { DragDropRender } from './dragdrop.render';
import { DndItem, DndItemType } from './dragdrop.type';
import { util } from '../../helpers';

type DropPlaceholderProps = DndItem;

export function DropPlaceholder({ state, dispatch, dndRef, ...item }: DropPlaceholderProps) {
  const { data = [] } = item;

  const {
    dragRef,
    isDragging,
    isOver,
    isLock,
    isSelected,
    isDropEmpty,
    drag,
    drop,
    onMouseOver,
    onMouseOut
  } = useDragDrop(item, dndRef, state, dispatch);

  const itemClassNames = util.classNames('drop-placeholder', {
    'is-over': isOver
  });

  drag(drop(dragRef));

  return <div ref={dragRef} className={itemClassNames}><DragDropRender data={data} /></div>
};


