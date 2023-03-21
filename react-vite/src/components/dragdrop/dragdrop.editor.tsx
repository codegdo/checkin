import React, { useEffect, useRef, useState } from 'react';
import { useDrag, useDragLayer, useDrop, XYCoord } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useOnClickOutside, useWrapperContext } from '../../hooks';
import { DragDropContext } from './dragdrop.context';

interface Offset {
  top: number;
  left: number;
}

const DragDropEditor = (): JSX.Element | null => {
  const refDiv = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<Offset>({ top: 0, left: 0 });
  const { state } = useWrapperContext(DragDropContext);
  const { isActive } = state?.item || {};

  const { itemType, initialSourceClientOffset, differenceFromInitialOffset } = useDragLayer(monitor => ({
    initialSourceClientOffset: monitor.getInitialSourceClientOffset(),
    differenceFromInitialOffset: monitor.getDifferenceFromInitialOffset(),
    itemType: monitor.getItemType()
  }));

  const [, drag, dragPreview] = useDrag(() => ({
    type: 'panel',
    item: { type: 'panel'},
    canDrag: () => {
      dragPreview(getEmptyImage(), { captureDraggingState: false });
      return true;
    }
  }));

  useEffect(() => {
    if (initialSourceClientOffset && differenceFromInitialOffset && itemType === 'panel') {
      setOffset({
        top: Math.round(initialSourceClientOffset.y + differenceFromInitialOffset.y),
        left: Math.round(initialSourceClientOffset.x + differenceFromInitialOffset.x)
      });
    }
  }, [initialSourceClientOffset, differenceFromInitialOffset, itemType]);

  const handleClickOutside = () => console.log('clicked outside');
  useOnClickOutside(refDiv, handleClickOutside);

  return isActive ? (
    <div ref={refDiv}>
      <div ref={dragPreview} style={{ position: 'fixed', ...offset }} >
        <div ref={drag}>head</div>
        <div>content</div>
      </div>
    </div>
  ) : null;
};

export default DragDropEditor;