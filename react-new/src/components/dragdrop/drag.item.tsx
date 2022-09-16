import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

export const DragItem: React.FC<any> = (props): JSX.Element => {
  const { current } = props;
  const [{ opacity, isDragging }, drag] = useDrag(
    () => ({
      type: 'block',
      item: { id: '1', role: 'field', current },
      collect: monitor => ({
        opacity: monitor.isDragging() ? .1 : 1,
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const didDrop = monitor.didDrop();
        const dropResult = monitor.getDropResult();

        console.log('FIELD DROP', item);
        console.log('DROP RESULT', dropResult);

        if (didDrop) {
          console.log('Did DROP');
        }

      }
    }),
    []
  );

  return <div ref={drag} style={{ opacity }}>Item</div>
}