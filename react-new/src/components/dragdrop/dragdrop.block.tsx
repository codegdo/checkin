import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Render } from './dragdrop.render';

export const DragDropBlock: React.FC<any> = (props): JSX.Element => {
  const { id, data } = props;
  const ref = useRef<HTMLDivElement>(null);

  const [{ }, drag] = useDrag(
    () => ({
      type: 'block',
      item: { ...props, ref },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult() as any;

        if (item && dropResult) {
          const { ref } = item;

          if (!ref.current) {
            return;
          }

          console.log('END', item);
          console.log('DROP', dropResult);
        }
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  );

  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: ['block', 'field'],
      drop: () => ({ ...props }),
      hover: (item: any) => {
        if (!ref.current) {
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

        console.log('HOVERID', id);
        console.log('DRAGITEM', item);
      },
      collect: monitor => ({
        isOver: monitor.isOver(),
        isDraggingOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    }), []);

  drag(drop(ref));

  return (
    <div className='drop' id={id} ref={ref}>
      {
        <Render data={[...data]} />
      }
    </div>
  );
};
