import { CSSProperties } from 'react';
import { useDragLayer } from 'react-dnd';
import { useMemo } from 'react';
import { dndHelper } from './helpers';

const layerStyles: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function DragPreview() {
  const {
    item,
    isDragging,
    initialOffset,
    clientOffset,
  } = useDragLayer((monitor) => ({
    initialOffset: monitor.getInitialSourceClientOffset(),
    clientOffset: monitor.getClientOffset(),
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
  }));

  const dragStyles = useMemo(() => {
    if (!isDragging || !initialOffset || !clientOffset) {
      return {};
    }
    return dndHelper.getDragStyles(initialOffset, clientOffset);
  }, [isDragging, initialOffset, clientOffset]);

  return (
    isDragging ? (
      <div style={layerStyles}>
        <div className='drag-preview' style={dragStyles}>
          {item?.title}
        </div>
      </div>
    ) : null
  );
}

export default DragPreview;
