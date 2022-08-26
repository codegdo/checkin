import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

export const DragDropField: React.FC<any> = (props): JSX.Element => {
  const { id } = props;
  const ref = useRef<HTMLDivElement>(null);

  const [{ }, drag] = useDrag(
    () => ({
      type: 'field',
      item: { ...props, ref },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult() as any;

        if (item && dropResult) {
          const { ref } = item;

          if (!ref.current) {
            return;
          }

          ref.current.style.removeProperty('color');
          console.log('END', item);
          console.log('DROP', dropResult);
        }

      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )

  const [{ canDrop }, drop] = useDrop(() => ({
    accept: ['block', 'field'],
    canDrop: () => false,
    hover: (item: any) => {
      const { ref } = item;

      if (!ref.current) {
        return;
      }

      if (item.id == id) {
        return;
      }

      ref.current.style.color = 'red';
      console.log('HOVERITEM', props);
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
    <div id={id} ref={ref}>Draggable</div>
  );
};
