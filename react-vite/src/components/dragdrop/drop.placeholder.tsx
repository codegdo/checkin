import React from 'react';

import { useDragDrop } from './hooks/use-dragdrop.hook';
import { DragDropRender } from './dragdrop.render';
import { DndItem } from './dragdrop.type';
import { util } from '../../helpers';

type DropPlaceholderProps = DndItem;

export function DropPlaceholder({ dndRef, state:dndState, dispatch, ...item }: DropPlaceholderProps) {
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
  } = useDragDrop({ item, dndRef, dndState, dispatch });

  const itemClassNames = util.classNames('drop-placeholder', {
    'is-over': isOver,
    'is-empty': isDropEmpty
  });

  drag(drop(dragRef));

  return <div ref={dragRef} className={itemClassNames}><DragDropRender data={data} /></div>
};


