import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

export const DraggableBlock: React.FC<any> = (props): JSX.Element => {
  const { current, addItem, setFocus } = props;
  const [{ opacity, isDragging }, drag] = useDrag(
    () => ({
      type: 'block',
      item: { id: 100, name: 'new', role: 'parent', position: null, data: [], parentId: null, current },
      canDrag: () => {
        setFocus(null);
        return true;
      },
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