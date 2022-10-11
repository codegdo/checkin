import React, { CSSProperties, FC, useCallback, useEffect, useRef, useState } from 'react';
import { useDrag, useDragLayer, useDrop, XYCoord } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

const styles: CSSProperties = { position: 'fixed' };

export const Editor: FC<any> = ({ focus, onCallback }) => {

  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ top: 0, left: 0 });

  const { isDragging, dragType, initialOffset, differentFromInitialOffset } = useDragLayer((monitor) => ({
    initialOffset: monitor.getInitialSourceClientOffset(),
    differentFromInitialOffset: monitor.getDifferenceFromInitialOffset() as XYCoord,
    dragType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
  }));

  const [_collectDrag, drag, preview] = useDrag(() => ({
    type: 'editor',
    canDrag: () => {
      preview(getEmptyImage(), { captureDraggingState: false });
      return true;
    }
  }), []);


  const [_collectDrop, drop] = useDrop(
    () => ({
      accept: ['editor']
    }), []);

  useEffect(() => {

    if (differentFromInitialOffset && initialOffset) {
      if (dragType == 'editor') {
        setOffset({
          ...offset,
          top: Math.round(initialOffset.y + differentFromInitialOffset.y),
          left: Math.round(initialOffset.x + differentFromInitialOffset.x)
        });
      }
    }

  }, [initialOffset, differentFromInitialOffset]);

  drag(drop(ref));

  const handleClick = () => {
    onCallback();
  }

  const handleChange = useCallback(() => {
    focus.onChange();
  }, [focus])

  return <div ref={preview} style={{ ...styles, ...offset }} className={(isDragging && dragType !== 'editor') ? 'hidden' : ''}>
    <div ref={ref}>
      header
    </div>
    <div>
      Editor
      <input onChange={handleChange} />
      <button type="button" onClick={handleClick}>click</button>
    </div>
  </div>
}