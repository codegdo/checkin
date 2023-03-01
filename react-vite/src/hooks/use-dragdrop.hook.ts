import React, { useRef } from 'react';
import { useDrag, useDragLayer, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DndItem, DndItemType } from '../components/dragdrop';

export const useDragDrop = <T extends DndItem>({ dataType }: T, acceptType?: typeof DndItemType) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop({
    accept: acceptType ? Object.values(acceptType) : [],
    hover: (item: any, monitor) => {
      if (!ref.current) return;

      // handle hover events here
      if (monitor.isOver({ shallow: true })) {
        if (
          !ref.current
        ) {
          return;
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  }, []);

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: dataType,
      item: {},
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
        if (didDrop) { }
      },
    }),
    []
  );

  return { ref, drop, drag, preview, isOver, isDragging };
}
