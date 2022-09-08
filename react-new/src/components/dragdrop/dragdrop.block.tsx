import React, { useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { dragdropHelper } from '../../helpers';
import { Render } from './dragdrop.render';

export const DragDropBlock: React.FC<any> = (props): JSX.Element => {
  const { id, position, data, list, moveItem, children } = props;
  const ref = useRef<HTMLDivElement>(null);
  let _x = 0, _y = 0;

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'block',
      item: { ...props, ref },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const didDrop = monitor.didDrop();

        if (didDrop) {
          console.log('BLOCK DROP', item);
          moveItem(item);
        }
      }
    }),
    [id, moveItem]
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ['block', 'field'],
      hover: (item: any, monitor) => {
        if (!ref.current) {
          return;
        }

        // don't replace items with root drop
        if (id == 0) {
          return;
        }

        const dragIndex = item.position;
        const hoverIndex = position;

        // don't replace items with themselves
        if (dragIndex === hoverIndex) {
          props.drop.item = null;
          return;
        }
        // determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect() as {
          top: number;
          right: number;
          bottom: number;
          left: number;
          width: number;
          height: number;
          x: number;
          y: number;
        };
        // determine mouse position
        const clientOffset = monitor.getClientOffset() as {
          x: number
          y: number
        }
        // get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // get horizontal middle
        const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
        // get pixels to the left
        const hoverClientX = clientOffset.x - hoverBoundingRect.left;

        // check hover ref isOver 
        if (monitor.isOver({ shallow: true })) {
          const display = dragdropHelper.parentNodeDisplay(ref.current.parentNode as HTMLElement);

          if (display == 'row') {
            if (_x == clientOffset.x) return;

            _x = clientOffset.x;
            props.drop.item = props;

            // dragging left
            if (hoverClientX < hoverMiddleX) {
              ref.current.classList.add('move-left');
              ref.current.classList.remove('move-right');
              props.drop.offset = 'left';
            } else {
              ref.current.classList.add('move-right');
              ref.current.classList.remove('move-left');
              props.drop.offset = 'right';
            }

          } else {
            if (_y == clientOffset.y) return;

            _y = clientOffset.y;
            props.drop.item = props;

            // dragging down
            if (hoverClientY < hoverMiddleY) {
              ref.current.classList.add('move-top');
              ref.current.classList.remove('move-bottom');
              props.drop.offset = 'top';
            } else {
              ref.current.classList.add('move-bottom');
              ref.current.classList.remove('move-top');
              props.drop.offset = 'bottom';
            }
          }
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
  }, []);

  const className = `dd-block${isDragging ? ' dragging' : ''}${isOver ? ' _over' : ''}${data?.length == 0 ? ' _empty' : ''}`;

  return (
    <div className={className} id={id} ref={ref} tabIndex={position}>
      <div className={`dd-content`}>
        {
          children ? children : <Render data={[...data]} />
        }
      </div>
    </div>

  );
};
