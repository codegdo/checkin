import React, { useCallback, useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

export const DragDropField: React.FC<any> = (props): JSX.Element => {
  const { id } = props;
  const ref = useRef<HTMLDivElement>(null);

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: 'field',
      item: { ...props, ref },
      collect: monitor => ({
        opacity: monitor.isDragging() ? 0 : 1,
      }),
      end: (item, monitor) => {

        const didDrop = monitor.didDrop();

        if (!didDrop) {
          console.log('Did DROP');
        }

      }
    }),
    [id]
  )

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['block', 'field'],
    canDrop: () => false,
    hover: (item: any, monitor) => {
      // if not hover ref is undefine
      if (!ref.current) {
        return;
      }
      // if hover refId is same as dragId
      if (item.id == id) {
        return;
      }
      // if hover over 
      if (monitor.isOver({ shallow: true })) {
        // if (item.ref.current.offsetTop < ref.current.offsetTop) {
        //   ref.current.style.borderBottom = '1px solid';
        // }
        // if (item.ref.current.offsetTop > ref.current.offsetTop) {
        //   ref.current.style.borderTop = '1px solid';
        // }
        console.log(monitor.getClientOffset());
        return;
      }

      console.log('hoverREF', ref);
      console.log('dragREF', item.ref);
      console.log('HOVERITEM', props);
      console.log('DRAGITEM', item);
    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true })
    }),
  }), []);

  drag(drop(ref));

  const border = isOver ? {} : { border: 'none' };


  return (
    <div id={id} ref={ref} style={{ ...border, opacity }}>Draggable</div>
  );
};
