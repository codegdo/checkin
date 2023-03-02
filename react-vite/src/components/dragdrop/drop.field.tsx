import React from 'react';

import { useDragDrop } from '../../hooks';
import { DndItem } from './dragdrop.type';

const DropField: React.FC<DndItem> = (item): JSX.Element => {

  const { ref, drag, drop } = useDragDrop(item);
  drag(drop(ref));

  return (
    <div ref={ref}></div>
  );
};

export default DropField;