import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

export const DragItem = (): JSX.Element => {

  const [{ opacity, isDragging }, drag] = useDrag(
    () => ({
      type: 'block',
      item: {},
      collect: monitor => ({
        opacity: monitor.isDragging() ? .1 : 1,
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const didDrop = monitor.didDrop();

        if (!didDrop) {
          console.log('Did DROP');
        }

      }
    }),
    []
  );

  return <div ref={drag} style={{ opacity }}>Item</div>
}