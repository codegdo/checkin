import React from 'react';
import { ActionClickType } from '../../constants';
import { util } from '../../helpers';

import { DragDropMenu } from './dragdrop.menu';
import { DndActionType, DndItem } from './dragdrop.type';
import { useDragDrop } from './hooks/use-dragdrop.hook';
import { useItemClick } from './hooks/use-itemclick.hook';

type DropFieldProps = DndItem;

export function DropField({ state, dispatch, dndRef, ...item }: DropFieldProps) {
  const { id, name, className = '' } = item;
  const {
    dragRef,
    isDragging,
    isOver,
    isLock,
    isSelected,
    drag,
    drop,
    onMouseOver,
    onMouseOut
  } = useDragDrop(item, dndRef, state, dispatch);

  const { handleItemClick, handleClick } = useItemClick(item, dndRef, state, dispatch);

  const itemClassNames = util.classNames(className, 'drop-item', 'drop-field', {
    'is-dragging': isDragging,
    'is-over': isOver,
    'is-lock': isLock,
    'is-selected': isSelected,
  });

  drag(drop(dragRef));

  return (
    <div ref={dragRef} className={itemClassNames} onClick={handleItemClick}>
      {
        isSelected && <DragDropMenu onClick={handleClick} />
      }
      {name}
    </div>
  )
};
