import React from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

export const DraggableItem: React.FC<any> = ({ state, dispatch, ...props }): JSX.Element => {
  const { dataType, name } = props;

  const [{ opacity }, drag, preview] = useDrag(
    () => ({
      type: dataType,
      item: { ...props },
      canDrag: () => {
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
          dispatch({
            type: 'ADD_ITEM',
            payload: item
          });
        }

      }
    }),
    [state]
  );

  return <div ref={drag} style={{ opacity }}>{name}</div>
}