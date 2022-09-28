import React, { useEffect, useRef, useState } from 'react';
import { useDrag, useDragLayer, XYCoord } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

export const Editor: React.FC = () => {

  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ top: 0, left: 0 });

  const { isDragging, initialOffset, differentFromInitialOffset} =
    useDragLayer((monitor) => ({
      initialOffset: monitor.getInitialSourceClientOffset(),
      differentFromInitialOffset: monitor.getDifferenceFromInitialOffset() as XYCoord,
      isDragging: monitor.isDragging(),
    }))

  const [_, drag, preview] = useDrag(() => ({
    type: 'editor',
  }));


  

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: false })
  }, []);


  useEffect(() => {

    if (differentFromInitialOffset && initialOffset) {
      setOffset({
        ...offset,
        top: Math.round(initialOffset.y + differentFromInitialOffset.y),
        left: Math.round(initialOffset.x + differentFromInitialOffset.x)
      });
    }

  }, [differentFromInitialOffset, initialOffset]);

  drag(ref);

  return <div ref={preview} style={{ position: 'fixed', top: offset.top, left: offset.left }}>
    <div style={{ border: '1px solid red', padding: '1rem', cursor: (isDragging ? 'grabbing' : 'grab') }} ref={ref}>
      header
    </div>
    <div>
      Editor
    </div>
  </div>
}