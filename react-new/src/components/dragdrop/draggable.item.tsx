import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

export const DraggableItem: React.FC<any> = (props): JSX.Element => {
  const { role, name, current, list, addItem, setItem } = props;
  const [{ opacity, isDragging }, drag, preview] = useDrag(
    () => ({
      type: role,
      item: { ...props },
      canDrag: () => {
        setItem && setItem(null);
        preview(getEmptyImage(), { captureDraggingState: false });
        return true;
      },
      collect: monitor => ({
        opacity: monitor.isDragging() ? .1 : 1,
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const didDrop = monitor.didDrop();

        console.log('ADD FIELD DROP', item);

        if (didDrop) {
          addItem(item);
        }

      }
    }),
    [list, addItem]
  );

  return <div ref={drag} style={{ opacity }}>{name}</div>
}