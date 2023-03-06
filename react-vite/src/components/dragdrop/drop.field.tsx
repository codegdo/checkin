import React from 'react';
import _classNames from 'classnames';

import { useDragDrop } from '../../hooks';
import { DndItem, DndItemType } from './dragdrop.type';

const DropField: React.FC<DndItem> = (item): JSX.Element => {
  const { className = '' } = item;
  const acceptTypes = Object.values(DndItemType);
  const { ref, drag, drop, isDragging, isOver, hasEmptyList, onMouseOver, onMouseOut } = useDragDrop(item, acceptTypes);

  const classNames = _classNames({
    'drop-item drop-field': true,
    [className]: true,
    'is-dragging': isDragging,
    'is-over': isOver,
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={classNames}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >field</div>
  );
};

export default DropField;