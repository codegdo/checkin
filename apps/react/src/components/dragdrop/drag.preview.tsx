import { CSSProperties } from 'react';
import { useDragLayer } from 'react-dnd';

import { dndHelper } from './helpers';

const layerStyles: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}

//interface IProps { }

function DragPreview() {
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

  const dragStyles = dndHelper.getDragStyles(initialSourceClientOffset, clientOffset);

  return (
    <div style={layerStyles}>
      <div className='drag-preview' style={dragStyles}>{item?.name}</div>
    </div>
  );
}

export default DragPreview;
