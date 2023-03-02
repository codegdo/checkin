import React, { useCallback, useMemo, useRef } from 'react';
import { DropTargetMonitor, useDrag, useDragLayer, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DndItem } from '../components/dragdrop';
import { dndHelper } from '../helpers';

export const useDragDrop = <T extends DndItem>(
  { dndRef, ...dragItem }: T,
  acceptType: string | string[] = []
) => {
  const ref = useRef<HTMLDivElement>(null);
  const { id, dataType, parentId, position } = dragItem;

  const hover = useCallback((hoverItem: DndItem, monitor: DropTargetMonitor<DndItem, unknown>) => {
    if (!ref.current) return;

    // handle hover events here
    if (monitor.isOver({ shallow: true })) {

      if (hoverItem.id === id) {
        return;
      }

      if (dndRef?.id !== id) {
        dndRef = { id, dataType, parentId, position, x: 0, y: 0 };
        console.log(dndRef);
      }

      dndHelper.handleOver({ ref, monitor, dragItem, dropItem: dndRef });
    }
  }, [id, dataType, parentId, position, dndRef]);

  const [{ isOver }, drop] = useDrop(
    {
      accept: acceptType,
      hover,
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    },
    [acceptType, hover]
  );

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: dataType,
      item: { ...dragItem },
      canDrag: () => {
        preview(getEmptyImage(), { captureDraggingState: false });
        return true;
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const didDrop = monitor.didDrop();

        //  handle drop events here
        if (didDrop) {
          console.log(item, dndRef);
        }
      },
    }),
    [dataType, dragItem, dndRef]
  );

  const onMouseOver = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (ref.current) {
      ref.current.classList.add('is-hover');
    }
  }, [ref]);

  const onMouseOut = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (ref.current) {
      ref.current.classList.remove('is-hover');
    }
  }, [ref]);

  return { ref, drop, drag, isOver, isDragging, onMouseOver, onMouseOut };
}
