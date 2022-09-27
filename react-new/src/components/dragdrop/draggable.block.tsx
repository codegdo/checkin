import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

export const DraggableBlock: React.FC<any> = (props): JSX.Element => {
  const { name, current, list, addItem, setFocus } = props;
  const [{ opacity, isDragging }, drag] = useDrag(
    () => ({
      type: 'block',
      item: { ...props },
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

        console.log('FIELD DROP', item);

        if (didDrop) {

          if (list.length == 0) {
            item.current.drop = {
              id: 'dropholder',
              parentId: null
            }
          }

          addItem(item);
        }

      }
    }),
    [list, addItem]
  );

  return <div ref={drag} style={{ opacity }}>{name}</div>
}