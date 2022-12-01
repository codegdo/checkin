import React, { FC, PropsWithChildren, Children, useEffect, useRef, useState, isValidElement } from 'react';
import { isForwardRef } from 'react-is';
import { useDrag, useDragLayer, useDrop, XYCoord } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useWindowDimensions } from '../../hooks';


export const Box: FC<PropsWithChildren<{ className: string }>> = ({ className = '', children }): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const { height, width } = useWindowDimensions();
  const [offset, setOffset] = useState({ top: 0, left: 0 });

  const { isDragging, dragType, initialOffset, differentFromInitialOffset } = useDragLayer((monitor) => ({
    initialOffset: monitor.getInitialSourceClientOffset(),
    differentFromInitialOffset: monitor.getDifferenceFromInitialOffset() as XYCoord,
    dragType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
  }));

  const [_collectDrag, drag, preview] = useDrag(() => ({
    type: 'panel',
    canDrag: () => {
      preview(getEmptyImage(), { captureDraggingState: false });
      return true;
    }
  }), []);

  const [_collectDrop, drop] = useDrop(
    () => ({
      accept: ['panel']
    }), []);

  useEffect(() => {

    if (differentFromInitialOffset && initialOffset) {
      if (dragType == 'panel') {
        setOffset({
          ...offset,
          top: Math.round(initialOffset.y + differentFromInitialOffset.y),
          left: Math.round(initialOffset.x + differentFromInitialOffset.x)
        });
      }
    }

  }, [initialOffset, differentFromInitialOffset]);

  drag(drop(ref));

  return <div ref={preview} style={{ ...offset }} className={className}>
    {children && Children.toArray(children).map((child) => {

      if (isValidElement(child) && typeof child.type !== 'string' && isForwardRef(child)) {
        //return React.cloneElement(child, {ref});
        child = { ...child, ref } as any
      }

      return child;

    })}
  </div>
}