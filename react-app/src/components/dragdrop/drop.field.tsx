import React, { MouseEvent } from 'react';

import { util } from '../../helpers';
import { Input, Label } from '../input';

import { DragDropMenu } from './dragdrop.menu';
import { DndActionType, DndItem } from './dragdrop.type';
import { useDragDrop } from './hooks/use-dragdrop.hook';
import { useSelectable } from './hooks/use-selectable.hook';

type DropFieldProps = DndItem;

export function DropField({ state: dndState, dispatch, dndRef, ...item }: DropFieldProps) {
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
  } = useDragDrop({ item, dndRef, dndState, dispatch });

  const { selectedItem, onClick, onItemClick } = useSelectable({ item, dndRef, dndState, dragRef, dispatch });

  const { name, type, className, label } = selectedItem;

  const itemClassNames = util.classNames(className, 'drop-item', 'drop-field', {
    'is-dragging': isDragging,
    'is-over': isOver,
    'is-lock': isLock,
    'is-selected': isSelected,
  });

  const handleItemClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onItemClick(e);
  };

  const handleMenuClick = (actionType: string) => {
    onClick(actionType);
  };

  drag(drop(dragRef));

  return (
    <div ref={dragRef} className={itemClassNames} onClick={handleItemClick}>
      {
        isSelected && <DragDropMenu onClick={handleMenuClick} />
      }
      <Label label={label} />
      <Input name={name} type={type} />
    </div>
  )
};
