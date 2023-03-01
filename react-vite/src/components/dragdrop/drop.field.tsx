import React from 'react';

import { useDragDrop } from '../../hooks';
import { DndItem, DndItemType } from './dragdrop.type';

type DropFieldProps = DndItem;

const DropField: React.FC<DropFieldProps> = (item): JSX.Element => {

  const { ref, drag, drop } = useDragDrop(item, DndItemType);
  drag(drop(ref));

  return (
    <div ref={ref}></div>
  );
};

export default DropField;