import React from 'react';

import { useDragDrop } from '../../hooks';
import { DndItem, DndItemType } from './dragdrop.type';

const DropField: React.FC<DndItem> = (item): JSX.Element => {
  const { className } = item;
  const acceptType = Object.values(DndItemType);
  const { ref, drag, drop, onMouseOver, onMouseOut } = useDragDrop(item, acceptType);

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={className}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    ></div>
  );
};

export default DropField;