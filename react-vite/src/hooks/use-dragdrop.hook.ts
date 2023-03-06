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
  acceptTypes: string | string[] = []
) => {
  const { id, dataType, parentId, childId, position, data } = item;
  const ref = useRef<HTMLDivElement>(null);
  const dropTargetRef = ref.current;
  const dropRef = dndRef?.dropRef;
  const hasEmptyList = data?.length === 0;

  const [offset, setOffset] = useState<string>();

  const updateDropTargetClassList = useCallback((offsetString: string) => {
    if (!dropTargetRef) return;

    dropTargetRef.classList.remove(
      'on-top',
      'on-right',
      'on-bottom',
      'on-top',
      'on-middle'
    );

    switch (offsetString.split(' ')[0]) {
      case 'top':
        dropTargetRef.classList.add('on-top');
        break;
      case 'right':
        dropTargetRef.classList.add('on-right');
        break;
      case 'bottom':
        dropTargetRef.classList.add('on-bottom');
        break;
      case 'left':
        dropTargetRef.classList.add('on-top');
        break;
      case 'middle':
        dropTargetRef.classList.add('on-middle');
        break;
      default:
        console.log('ELEMENT OFFSET: ', offsetString);
    }
  }, [dropTargetRef]);

  const updateDropRefPositionByClientOffset = useCallback((clientOffset: XYCoord) => {
    if (!dropTargetRef || !dropRef) return;

    // Only update the position if it has changed
    if (dropRef.x !== clientOffset.x || dropRef.y !== clientOffset.y) {

      dropRef.x = clientOffset.x;
      dropRef.y = clientOffset.y;

      // Determine the bounding rectangle of the drop target
      const boundingRect = dropTargetRef.getBoundingClientRect();
      // get vertical center
      const centerY = (boundingRect.bottom - boundingRect.top) / 2;
      // get pixels to the top
      const clientY = clientOffset.y - boundingRect.top;
      // get horizontal center
      const centerX = (boundingRect.right - boundingRect.left) / 2;
      // get pixels to the left
      const clientX = clientOffset.x - boundingRect.left;

      const { width: elementWidth, height: elementHeight } = dndHelper.getElementSize(
        dropTargetRef
      );

      const horizontalOffset = dndHelper.hoverOffsetX(clientX, centerY, elementWidth);
      const verticalOffset = dndHelper.hoverOffsetY(clientY, centerY, elementHeight);

      const displayStyle = dndHelper.getElementDisplay(dropTargetRef);
      const currentOffset = displayStyle === 'column' ? verticalOffset : horizontalOffset;

      setOffset(`${currentOffset} (${clientOffset.x},${clientOffset.y})`);
    }
  }, [dropTargetRef, dropRef, setOffset]);

  useEffect(() => {
    if (offset) {
      updateDropTargetClassList(offset);

      console.log(offset);

      if (dropRef) {
        dropRef.offset = offset.split(' ')[0];
      }
    }
  }, [offset, dropRef, updateDropTargetClassList]);

  const [{ isOver }, drop] = useDrop(
    {
      accept: acceptTypes,
      hover: useCallback((hoverItem: DndItem, monitor: DropTargetMonitor<DndItem, unknown>) => {
        if (!dropTargetRef || !dropRef) return;

        // handle hover events here
        if (monitor.isOver({ shallow: true })) {
          if (hoverItem.id === id) {
            return;
          }

          if (dropRef.id !== id) {
            dropRef.id = id;
            dropRef.dataType = dataType;
            dropRef.parentId = parentId;
            dropRef.childId = childId;
            dropRef.position = position;
            dropRef.data = data;
            dropRef.x = 0;
            dropRef.y = 0;
            dropRef.currentRef = dropTargetRef;
            console.log(dndRef);
          }

          // determine mouse position
          const clientOffset = monitor.getClientOffset();

          if (!clientOffset) return;

          updateDropRefPositionByClientOffset(clientOffset);
        }
      }, [id, dataType, parentId, childId, position, data, dropRef, dndRef, updateDropRefPositionByClientOffset]),
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    });

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: dataType,
      item: { ...item },
      canDrag: () => {
        preview(getEmptyImage(), { captureDraggingState: false });
        if (dataType == 'area' || dataType == 'placeholder') return false;
        if (dropRef) dropRef.id = undefined;
        return true;
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (dragItem, monitor) => {
        const didDrop = monitor.didDrop();

        //  handle drop events here
        if (didDrop) {
          if (dropTargetRef) {
            dispatch?.({
              type: DndActionTypes.MOVE_ITEM,
              payload: {
                dragItem,
                dropRef,
              },
            });
          } else {
            dispatch?.({
              type: DndActionTypes.ADD_ITEM,
              payload: {
                dragItem,
                dropRef,
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
      if (dropTargetRef) {
        dropTargetRef.classList.add('is-hover');
      }
    },
    [dropTargetRef]
  );

  const onMouseOut = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (dropTargetRef) {
        dropTargetRef.classList.remove('is-hover');
      }
    },
    [dropTargetRef]
  );

  return { ref, drop, drag, isOver, isDragging, hasEmptyList, onMouseOver, onMouseOut };
};
