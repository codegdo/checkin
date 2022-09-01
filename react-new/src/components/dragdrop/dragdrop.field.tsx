import React, { useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { dragdropHelper } from '../../helpers';

export const DragDropField: React.FC<any> = (props): JSX.Element => {
  const { id, name, index, list } = props;
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

        const didDrop = monitor.didDrop();

        if (!didDrop) {
          console.log('Did DROP');
        }

      }
    }),
    [id]
  );

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['block', 'field'],
    canDrop: () => false,
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

      // if hoverRefOver 
      if (monitor.isOver({ shallow: true })) {

        const display = dragdropHelper.parentNodeDisplay(ref.current.parentNode as HTMLElement);

        if (display == 'row') {
          if (_x == x) {
            return;
          }

          _x = x;

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

      //console.log('hoverREF', ref);
      //console.log('dragREF', item.ref);
      //console.log('HOVERITEM', props);
      //console.log('DRAGITEM', item);
    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true })
    }),
  }), []);

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: false })
  }, [])

  drag(drop(ref));

  return (
    <div className={`drag ${isOver ? 'hover' : ''}`} id={id} ref={ref} style={{ opacity }}>
      <div className="content">{name}</div>
    </div>
  );
};
