import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

export const DragItem: React.FC<any> = (props): JSX.Element => {
  const { current, addItem } = props;
  const [{ opacity, isDragging }, drag] = useDrag(
    () => ({
      type: 'block',
      item: { id: 100, name: 'new', role: 'field', position: null, parentId: null, current },
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
          addItem(item);
        }

      }
    }),
    []
  );

  return <div ref={drag} style={{ opacity }}>Item</div>
}