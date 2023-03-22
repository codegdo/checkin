import React, { useEffect, useRef, useState } from 'react';
import { useDrag, useDragLayer, useDrop, XYCoord } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useOnClickOutside, useWrapperContext } from '../../hooks';
import { DragDropContext } from './dragdrop.context';

interface Offset {
  top: number;
  left: number;
}

function DragDropEditor(): JSX.Element | null {
  const refDiv = useRef<HTMLDivElement>(null);
  const refDrag = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const { state } = useWrapperContext(DragDropContext);
  const isEditMode = state?.item?.isEdit ?? false;

  const { itemType, initialSourceClientOffset, differenceFromInitialOffset } = useDragLayer((monitor) => ({
    initialSourceClientOffset: monitor.getInitialSourceClientOffset(),
    differenceFromInitialOffset: monitor.getDifferenceFromInitialOffset(),
    itemType: monitor.getItemType(),
  }));

  const [, drag] = useDrag(() => ({
    type: 'panel',
    item: { type: 'panel' },
  }));

  const [, drop] = useDrop(() => ({
    accept: 'panel',
  }));

  useEffect(() => {
    if (itemType === 'panel' && initialSourceClientOffset && differenceFromInitialOffset) {
      setOffset({
        top: Math.round(initialSourceClientOffset.y + differenceFromInitialOffset.y),
        left: Math.round(initialSourceClientOffset.x + differenceFromInitialOffset.x),
      });
    }
  }, [itemType, initialSourceClientOffset, differenceFromInitialOffset]);

  const handleClickOutside = () => console.log('clicked outside');
  useOnClickOutside(refDiv, handleClickOutside);

  useEffect(() => {
    if (isEditMode) {
      drag(drop(refDrag));
    }
  }, [isEditMode, drag, drop]);

  if (!isEditMode) {
    return null;
  }

  return (
    <div ref={refDiv}>
      <div ref={refDrag} style={{ position: 'fixed', ...offset }}>
        <div>head</div>
        <div>content</div>
      </div>
    </div>
  );
}


export default DragDropEditor;