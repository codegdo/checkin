import React from 'react';
import classNames from 'classnames';

import useDragDrop from './use-dragdrop.hook';
import DragDropMenu from './dragdrop.menu';
import { DndActionTypes } from './dragdrop.context';
import { DndActionClickType, DndItem, DndItemType } from './dragdrop.type';
import useItemClick from './use-itemclick.hook';

type DropFieldProps = DndItem;

const DropField: React.FC<DropFieldProps> = ({ state, dispatch, dndRef, ...item }): JSX.Element => {
  const { name, className = '' } = item;

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

  const itemClassNames = classNames(className, 'drop-item', 'drop-field', {
    'is-dragging': isDragging,
    'is-over': isOver,
    'is-lock': isLock,
    'is-selected': isSelected,
  });

  drag(drop(dragRef));

  return (
    <div
      ref={dragRef}
      className={itemClassNames}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={handleItemClick}
    >
      {isSelected && <DragDropMenu onClick={handleClick} />}
      {name}
    </div>
  );
};

export default DropField;