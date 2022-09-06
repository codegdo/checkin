import React, { useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { dragdropHelper } from '../../helpers';
import { Render } from './dragdrop.render';

export const DragDropBlock: React.FC<any> = (props): JSX.Element => {
  const { id, position, data, moveItem, children } = props;
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
        const dragIndex = item.position;
        const hover = props.hover;
        const didDrop = monitor.didDrop();

        if (didDrop) {
          moveItem();
          console.log('dragIndex', dragIndex);
          console.log('hover', hover);
        }

        console.log('dragIndex', dragIndex);
        console.log('hover', hover);

      }
    }),
    [id]
  );

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ['block', 'field'],
      hover: (item: any, monitor) => {

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

        const { x, y } = monitor.getClientOffset() as {
          x: number
          y: number
        }

        // parent
        //if (item.ref.current.parentNode.id == id) {
        //return;
        //}

        // if hoverRefOver 
        if (monitor.isOver({ shallow: true })) {

          const display = dragdropHelper.parentNodeDisplay(ref.current.parentNode as HTMLElement);

          if (display == 'row') {
            if (_x == x) {
              return;
            }

            _x = x;
            props.hover.item = props;

            if (x < ref.current.offsetLeft + ref.current.offsetWidth / 2) {
              ref.current.classList.add('left');
              ref.current.classList.remove('right');
            } else {
              ref.current.classList.add('right');
              ref.current.classList.remove('left');
            }
          } else {
            if (_y == y) {
              return;
            }

            _y = y;
            props.hover.item = props;

            if (y < ref.current.offsetTop + ref.current.offsetHeight / 2) {
              ref.current.classList.add('top');
              ref.current.classList.remove('bottom');
            } else {
              ref.current.classList.add('bottom');
              ref.current.classList.remove('top');
            }
          }

          console.log(y);
          console.log('hoverREF', ref);

          return;
        }

      },
      collect: monitor => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    }), []);

  drag(drop(ref));

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: false })
  }, [])

  return (

    <div className={`drop ${isOver ? 'hover' : ''}`} id={id} ref={ref} tabIndex={position} style={{ opacity }}>
      <div className="content">
        {
          children ? children : <Render data={[...data]} />
        }
      </div>
    </div>

  );
};
