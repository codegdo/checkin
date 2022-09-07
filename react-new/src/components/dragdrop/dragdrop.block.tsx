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
        const didDrop = monitor.didDrop();

        if (didDrop) {
          moveItem(item);
        }
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
            props.drop.item = props;

            if (data.length == 0) {
              if (x < ref.current.offsetLeft + ref.current.offsetWidth / 2 - 16) {
                ref.current.classList.add('left');
                ref.current.classList.remove('right');
                props.drop.offset = 'center';
              }
            } else {
              if (x < ref.current.offsetLeft + ref.current.offsetWidth / 2) {
                ref.current.classList.add('left');
                ref.current.classList.remove('right');
                props.drop.offset = 'left';
              } else {
                ref.current.classList.add('right');
                ref.current.classList.remove('left');
                props.drop.offset = 'right';
              }
            }



          } else {
            if (_y == y) {
              return;
            }

            _y = y;
            props.drop.item = props;

            if (data.length == 0) {
              console.log(ref.current.offsetTop);
              console.log(ref.current.offsetHeight / 2);

              if (y < ref.current.offsetTop + 16) {
                ref.current.classList.add('top');
                ref.current.classList.remove('bottom');
                ref.current.classList.remove('center');
                props.drop.offset = 'top';
              } else if (y > ref.current.offsetTop + 16 && y < ref.current.offsetTop + 16 + 50) {
                ref.current.classList.add('center');
                ref.current.classList.remove('top');
                ref.current.classList.remove('bottom');
                props.drop.offset = 'center';
              } else {
                ref.current.classList.add('bottom');
                ref.current.classList.remove('top');
                ref.current.classList.remove('center');
                props.drop.offset = 'button';
              }
            } else {
              if (y < ref.current.offsetTop + ref.current.offsetHeight / 2) {
                ref.current.classList.add('top');
                ref.current.classList.remove('bottom');
                props.drop.offset = 'top';
              } else {
                ref.current.classList.add('bottom');
                ref.current.classList.remove('top');
                props.drop.offset = 'button';
              }
            }
          }

          return;
        }

      },
      collect: monitor => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    }), [id, moveItem]);

  drag(drop(ref));

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: false })
  }, [])

  return (

    <div className={`drop ${isOver ? 'hover' : ''}`} id={id} ref={ref} tabIndex={position} style={{ opacity }}>
      <div className={`content ${data?.length == 0 ? 'empty' : ''}`}>
        {
          children ? children : <Render data={[...data]} />
        }
      </div>
    </div>

  );
};
