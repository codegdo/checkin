import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  DropTargetMonitor,
  useDrag,
  useDragLayer,
  useDrop,
  XYCoord,
} from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DndItem } from '../components/dragdrop';
import { DndActionTypes } from '../components/dragdrop/dragdrop.context';
import { dndHelper } from '../helpers';

export const useDragDrop = <T extends DndItem>(
  { dndRef, state, dispatch, ...item }: T,
  acceptType: string | string[] = []
) => {
  const ref = useRef<HTMLDivElement>(null);
  const { id, dataType, parentId, childId, position, data } = item;
  const [offset, setOffset] = useState<string>();

  useEffect(() => {
    if (offset) {
      ref.current?.classList.remove(
        'on-top',
        'on-right',
        'on-bottom',
        'on-top',
        'on-middle'
      );
      switch (offset) {
        case 'top':
          ref.current?.classList.add('on-top');
          break;
        case 'right':
          ref.current?.classList.add('on-right');
          break;
        case 'bottom':
          ref.current?.classList.add('on-bottom');
          break;
        case 'left':
          ref.current?.classList.add('on-top');
          break;
        case 'middle':
          ref.current?.classList.add('on-middle');
          break;
        default:
          console.log('ELEMENT OFFSET: ', offset);
      }
    }
  }, [offset]);

  const updateDndRefPosition = (clientOffset: XYCoord) => {
    if (!ref.current) return;

    // only run if position change
    if (dndRef.x !== clientOffset.x || dndRef.y !== clientOffset.y) {
      dndRef.x = clientOffset.x;
      dndRef.y = clientOffset.y;

      // determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // get vertical middle
      const middleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // get pixels to the top
      const clientY = clientOffset.y - hoverBoundingRect.top;
      // get horizontal middle
      const middleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      // get pixels to the left
      const clientX = clientOffset.x - hoverBoundingRect.left;

      const { elementWidth, elementHeight } = dndHelper.getElementSize(
        ref.current
      );

      const offsetX = dndHelper.hoverOffsetX(clientX, middleY, elementWidth);
      const offsetY = dndHelper.hoverOffsetY(clientY, middleY, elementHeight);

      const elementDisplay = dndHelper.getElementDisplay(ref.current);

      const currentOffset = elementDisplay === 'column' ? offsetY : offsetX;

      setOffset(currentOffset);
    }
  };

  const hover = useCallback(
    (hoverItem: DndItem, monitor: DropTargetMonitor<DndItem, unknown>) => {
      if (!ref.current) return;

      // handle hover events here
      if (monitor.isOver({ shallow: true })) {
        if (hoverItem.id === id) {
          return;
        }

        if (dndRef?.id !== id) {
          dndRef.id = id;
          dndRef.dataType = dataType;
          dndRef.parentId = parentId;
          dndRef.childId = childId;
          dndRef.position = position;
          dndRef.data = data;
          dndRef.x = 0;
          dndRef.y = 0;

          console.log(dndRef);
        }

        // determine mouse position
        const clientOffset = monitor.getClientOffset();

        if (!clientOffset) return;

        updateDndRefPosition(clientOffset);
      }
    },
    [id, setOffset]
  );

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
      item: { ...item },
      canDrag: () => {
        preview(getEmptyImage(), { captureDraggingState: false });
        if (dataType == 'area' || dataType == 'placeholder') {
          return false;
        }
        return true;
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (dragItem, monitor) => {
        const didDrop = monitor.didDrop();

        //  handle drop events here
        if (didDrop) {
          console.log('DROPPED', dragItem);
          if (ref.current) {
            dispatch?.({
              type: DndActionTypes.MOVE_ITEM,
              payload: {
                dragItem,
                dropItem: dndRef,
              },
            });
          } else {
            dispatch?.({
              type: DndActionTypes.ADD_ITEM,
              payload: {
                dragItem,
                dropItem: dndRef,
              },
            });
          }
        }
      },
    }),
    [dataType, item, dndRef]
  );

  const onMouseOver = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (ref.current) {
        ref.current.classList.add('is-hover');
      }
    },
    [ref]
  );

  const onMouseOut = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (ref.current) {
        ref.current.classList.remove('is-hover');
      }
    },
    [ref]
  );

  return { ref, drop, drag, isOver, isDragging, onMouseOver, onMouseOut };
};
