import React from 'react';
import { DataType, useDragDrop } from '../../hooks';

const DragItem: React.FC = (): JSX.Element => {
  const { drag } = useDragDrop({ dataType: DataType.BLOCK });

  return (
    <div ref={drag}>Drag Item</div>
  );
};

export default DragItem;