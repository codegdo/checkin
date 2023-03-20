import { CSSProperties, useEffect, useState } from 'react';
import { useDragLayer } from 'react-dnd';

import { dndHelper } from './dragdrop.helper';

const layerStyles: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}

interface DragPreviewProps { }

const DragPreview: React.FC<DragPreviewProps> = () => {
  const { item, itemType, isDragging, initialSourceClientOffset, clientOffset } = useDragLayer((monitor) => ({
    initialSourceClientOffset: monitor.getInitialSourceClientOffset(),
    clientOffset: monitor.getClientOffset(),
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || itemType === 'panel') {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div className='drag-preview' style={dndHelper.getItemStyles(initialSourceClientOffset, clientOffset, false)}>{item?.name}</div>
    </div>
  );
};

export default DragPreview;
