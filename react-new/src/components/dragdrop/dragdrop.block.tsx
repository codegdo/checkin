import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Render } from './dragdrop.render';

export const DragDropBlock: React.FC<any> = (props): JSX.Element => {
  const { id, data } = props;
  const ref = useRef<HTMLDivElement>(null);

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: 'block',
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
  );

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ['block', 'field'],
      drop: () => ({ ...props }),
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
          if (item.ref.current.offsetTop < ref.current.offsetTop) {
            ref.current.style.borderBottom = '1px solid';
          }
          if (item.ref.current.offsetTop > ref.current.offsetTop) {
            ref.current.style.borderTop = '1px solid';
          }
          return;
        }

        // same target
        if (item.id == id) {
          return;
        }
        // root parent
        if (id == 0) {
          return;
        }
        // parent
        if (item.ref.current.parentNode.id == id) {
          return;
        }



        console.log('hoverREF', ref);
        console.log('dragREF', item.ref);
        console.log('HOVERID', id);
        console.log('DRAGITEM', item);
      },
      collect: monitor => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    }), []);

  drag(drop(ref));

  const border = isOver ? {} : { border: 'none' };

  return (
    <div className='drop' id={id} ref={ref} style={{ ...border, opacity }}>
      {
        <Render data={[...data]} />
      }
    </div>
  );
};
