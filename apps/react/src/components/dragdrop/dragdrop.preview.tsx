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

function DragDropPreview() {
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
        <div className='dragdrop-preview' style={dragStyles}>
          {item?.title || item?.name}
        </div>
      </div>
    ) : null
  );
}

export default DragDropPreview;
