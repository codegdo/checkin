import React, { useEffect, useRef, useState } from 'react';
import { useDrag, useDragLayer, useDrop, XYCoord } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useOnClickOutside, useWrapperContext } from '../../hooks';
import { Editor } from '../editor';
import { DragDropContext } from './dragdrop.context';

interface Offset {
  top: number;
  left: number;
}

function DragDropEditor(): JSX.Element | null {
  const refDiv = useRef<HTMLDivElement>(null);
  const refDrag = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<Offset>({ top: 0, left: 0 });

  const { state } = useWrapperContext(DragDropContext);
  const { onChange, onClick } = state?.item || {};
  const isEditMode = state?.item?.isEdit ?? false;

  const { itemType, initialSourceClientOffset, differenceFromInitialOffset } = useDragLayer((monitor) => ({
    initialSourceClientOffset: monitor.getInitialSourceClientOffset(),
    differenceFromInitialOffset: monitor.getDifferenceFromInitialOffset(),
    itemType: monitor.getItemType(),
  }));

  const [, drag, preview] = useDrag(() => ({
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

  const handleClick = () => {
    onClick && onClick();
  }

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
      <div ref={preview} style={{ position: 'fixed', ...offset }}>
        <Editor data={{ design: [] }}>
          <div ref={refDrag}>head <button type='button' onClick={handleClick}>close</button></div>
        </Editor>
      </div>
    </div>
  );
}


export default DragDropEditor;