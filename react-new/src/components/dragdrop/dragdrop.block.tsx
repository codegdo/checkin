import React, { useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { Render } from './dragdrop.render';

export const DragDropBlock: React.FC<any> = (props): JSX.Element => {
  const { id, index, list, data, children } = props;
  const ref = useRef<HTMLDivElement>(null);
  let _x = 0, _y = 0;

  const [{ opacity, isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'block',
      item: { ...props, ref },
      collect: monitor => ({
        opacity: monitor.isDragging() ? .1 : 1,
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
        const { x, y } = monitor.getClientOffset() as {
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

          const parentNode: any = ref.current.parentNode;

          if (parentNode) {
            if (parentNode.style.display == 'flex') {

              if (_x == x) {
                return;
              }
              _x = x;

              if (index == 0 || index == (list.length - 1)) {
                if (x < ref.current.offsetLeft + ref.current.offsetWidth / 2) {
                  ref.current.classList.add('left');
                  ref.current.classList.remove('right');
                } else {
                  ref.current.classList.add('right');
                  ref.current.classList.remove('left');
                }
              } else {
                ref.current.classList.add('right');
              }

            } else {
              if (_y == y) {
                return;
              }

              _y = y;

              if (index == 0 || index == (list.length - 1)) {
                if (y < ref.current.offsetTop + ref.current.offsetHeight / 2) {
                  ref.current.classList.add('top');
                  ref.current.classList.remove('bottom');
                } else {
                  ref.current.classList.add('bottom');
                  ref.current.classList.remove('top');
                }
              } else {
                ref.current.classList.add('bottom');
              }
            }
          }
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

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: false })
  }, [])

  return (

    <div className={`drop ${over}`} id={id} ref={ref} style={{ opacity }}>
      <div className="content">
        {
          children ? children : <Render data={[...data]} />
        }
      </div>
    </div>

  );
};
