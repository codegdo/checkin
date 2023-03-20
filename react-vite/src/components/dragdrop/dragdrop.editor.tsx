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
  const refDrag = useRef<HTMLDivElement>(null);
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
    item: { type: 'panel', ref: refDrag },
    canDrag: () => {
      dragPreview(getEmptyImage(), { captureDraggingState: false });
      return true;
    }
  }));

  const [, drop] = useDrop(() => ({
    accept: 'panel'
  }));

  useEffect(() => {
    if (initialSourceClientOffset && differenceFromInitialOffset && itemType === 'panel') {
      setOffset({
        top: Math.round(initialSourceClientOffset.y + differenceFromInitialOffset.y),
        left: Math.round(initialSourceClientOffset.x + differenceFromInitialOffset.x)
      });
    }
  }, [initialSourceClientOffset, differenceFromInitialOffset, itemType]);

  drag(drop(refDrag));

  const handleClickOutside = () => console.log('clicked outside');
  useOnClickOutside(refDiv, handleClickOutside);

  return isActive ? (
    <div ref={refDiv}>
      <div ref={dragPreview} style={{ position: 'fixed', ...offset }} >
        <div ref={refDrag}>head</div>
        <div>content</div>
      </div>
    </div>
  ) : null;
};

export default DragDropEditor;