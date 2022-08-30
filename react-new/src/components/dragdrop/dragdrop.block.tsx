import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Render } from './dragdrop.render';

export const DragDropBlock: React.FC<any> = (props): JSX.Element => {
  const { id, index, list, data, children } = props;
  const ref = useRef<HTMLDivElement>(null);
  let _y = 0;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'block',
      item: { ...props, ref },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
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
        const { y } = monitor.getClientOffset() as {
          x: number
          y: number
        }

        // if not hoverRef is undefine
        if (!ref.current) {
          return;
        }

        // if dragId is same as hoverRefId
        if (item.id == id) {
          return;
        }


        // root parent
        if (id == 0) {
          return;
        }
        // parent
        if (item.ref.current.parentNode.id == id) {
          //return;
        }

        // if hoverRefOver 
        if (monitor.isOver({ shallow: true })) {

          if (_y == y) {
            return;
          }

          _y = y;

          if (index == 0 || index == (list.length - 1)) {
            if (y < ref.current.offsetTop + ref.current.offsetHeight / 2) {
              // ref.current.style.borderTop = '1px solid';
              // ref.current.style.borderBottom = '0px solid';
              ref.current.classList.add('top');
              ref.current.classList.remove('bottom');
            } else {
              // ref.current.style.borderTop = '0px solid';
              // ref.current.style.borderBottom = '1px solid';
              ref.current.classList.add('bottom');
              ref.current.classList.remove('top');
            }
          } else {
            //ref.current.style.borderBottom = '1px solid';
            ref.current.classList.add('bottom');

          }


          console.log(y);
          console.log('hoverREF', ref);

          return;
        }

        //console.log('hoverREF', ref);
        //console.log('dragREF', item.ref);
        //console.log('HOVERID', id);
        //console.log('DRAGITEM', item);
      },
      collect: monitor => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    }), []);

  drag(drop(ref));

  let display = {};
  let over = '';

  if (isOver) {
    over = 'over';
  }

  if (isDragging) {
    display = { display: 'none' }
  }

  return (
    <div className={`drop ${over}`} id={id} ref={ref} style={{ ...display }}>
      {
        children ? children : <Render data={[...data]} />
      }
    </div>
  );
};
