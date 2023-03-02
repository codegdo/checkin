import React, { useRef } from 'react';
import { useDrag, useDragLayer, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DndItem } from '../components/dragdrop';

export const useDragDrop = <T extends DndItem>(
  target: T,
  acceptType: string[] = []
) => {
  const ref = useRef<HTMLDivElement>(null);
  const { id, dataType, dndRef } = target;

  const [{ isOver }, drop] = useDrop(
    {
      accept: acceptType,
      hover: (item: any, monitor) => {
        if (!ref.current) return;

        // handle hover events here
        if (monitor.isOver({ shallow: true })) {
          if (!ref.current) {
            return;
          }
          if (item.id === id) {
            return;
          }
          if (dndRef && dndRef.id !== id) {
            dndRef.id = id;
            console.log(dndRef);
          }
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    },
    []
  );

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: dataType,
      item: { ...target },
      canDrag: () => {
        //preview(getEmptyImage(), { captureDraggingState: false });
        return true;
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const didDrop = monitor.didDrop();

        //  handle drop events here
        if (didDrop) {
          console.log(item);
        }
      },
    }),
    []
  );

  return { ref, drop, drag, preview, isOver, isDragging };
};
