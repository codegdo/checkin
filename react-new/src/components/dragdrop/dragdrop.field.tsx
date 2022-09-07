import React, { useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { dragdropHelper } from '../../helpers';

export const DragDropField: React.FC<any> = (props): JSX.Element => {

  const { id, name, position, moveItem } = props;
  const ref = useRef<HTMLDivElement>(null);

  let _x = 0, _y = 0;

  const [{ opacity, isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'field',
      item: { ...props, ref },
      collect: monitor => ({
        opacity: monitor.isDragging() ? .1 : 1,
        isDragging: monitor.isDragging()
      }),
      end: (item, monitor) => {
        //const dragItem = item;
        //const hoverItem = props.hover.item;
        const didDrop = monitor.didDrop();

        if (didDrop) {
          console.log('DROP', item);
          moveItem(item);
        }
      }
    }),
    [id, moveItem]
  );

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['block', 'field'],
    canDrop: () => false,
    hover: (item: any, monitor) => {

      // if not hoverRef is undefine
      if (!ref.current) {
        return;
      }

      // if dragId is same as hoverRefId
      if (item.id == id) {
        return;
      }

      const { x, y } = monitor.getClientOffset() as {
        x: number
        y: number
      }

      // if hoverRefOver 
      if (monitor.isOver({ shallow: true })) {

        const display = dragdropHelper.parentNodeDisplay(ref.current.parentNode as HTMLElement);

        if (display == 'row') {
          if (_x == x) {
            return;
          }

          _x = x;
          props.drop.item = props;

          if (x < ref.current.offsetLeft + ref.current.offsetWidth / 2) {
            ref.current.classList.add('left');
            ref.current.classList.remove('right');
            props.drop.offset = 'left';
          } else {
            ref.current.classList.add('right');
            ref.current.classList.remove('left');
            props.drop.offset = 'right';
          }
        } else {
          if (_y == y) {
            return;
          }

          _y = y;
          props.drop.item = props;

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

        return;
      }

    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true })
    }),
  }), [id]);

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: false })
  }, [])

  drag(drop(ref));

  return (
    <div className={`drag ${isOver ? 'hover' : ''}`} id={id} ref={ref} tabIndex={position} style={{ opacity }}>
      <div className="content">{name}</div>
    </div>
  );
};
