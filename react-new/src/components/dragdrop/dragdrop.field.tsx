import React, { useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { dragdropHelper } from '../../helpers';

export const DragDropField: React.FC<any> = (props): JSX.Element => {

  const { id, name, role, position, data, list, parentId, moveItem } = props;
  const ref = useRef<HTMLDivElement>(null);

  let _x = 0, _y = 0;

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'field',
      item: { ...props },
      collect: monitor => ({
        isDragging: monitor.isDragging()
      }),
      end: (item, monitor) => {
        const didDrop = monitor.didDrop();

        console.log('FIELD DROP', item);

        if (didDrop) {
          moveItem(item);
        }
      }
    }),
    [id, list, moveItem]
  );

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['block', 'field'],
    canDrop: () => false,
    hover: (item: any, monitor) => {

      if (!ref.current) {
        return;
      }

      const dragIndex = item.position;
      const hoverIndex = position;

      // don't replace items with themselves
      if (dragIndex === hoverIndex) {
        props.current.drop = null;
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

        if (props.current.drop == null) {
          props.current.drop = {
            id,
            data,
            position,
            role,
            parentId
          };
        } else if (props.current.drop.id !== props.id) {
          props.current.drop = {
            id,
            data,
            position,
            role,
            parentId
          };
        }

        if (display == 'row') {
          if (_x == clientOffset.x) return;

          _x = clientOffset.x;

          // dragging left
          if (hoverClientX < hoverMiddleX) {
            ref.current.classList.add('move-left');
            ref.current.classList.remove('move-right');
            props.current.drop.offset = 'left';
          } else {
            ref.current.classList.add('move-right');
            ref.current.classList.remove('move-left');
            props.current.drop.offset = 'right';
          }

        } else {
          if (_y == clientOffset.y) return;

          _y = clientOffset.y;

          // dragging down
          if (hoverClientY < hoverMiddleY) {
            ref.current.classList.add('move-top');
            ref.current.classList.remove('move-bottom');
            props.current.drop.offset = 'top';
          } else {
            ref.current.classList.add('move-bottom');
            ref.current.classList.remove('move-top');
            props.current.drop.offset = 'bottom';
          }
        }
      }

    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true })
    }),
  }), [id, list, moveItem]);

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: false })
  }, [])

  drag(drop(ref));

  const className = `dd-field${isOver ? ' over' : ''}${isDragging ? ' dragging' : ''}`;

  return (
    <div className={className} id={id} ref={ref} tabIndex={position}>
      <div className="dd-content">{name}</div>
    </div>
  );
};
