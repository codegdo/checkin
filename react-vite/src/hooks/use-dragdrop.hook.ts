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

  // This function updates the CSS classes of the drop target element to indicate where a dragged element will be dropped.
  const updateDropTargetClassList = useCallback((offsetString: string) => {
    // If the dropTargetRef does not exist, return early
    if (!dropTargetRef) return;

    // Remove all CSS classes related to drop target position
    dropTargetRef.classList.remove(
      'on-top',
      'on-right',
      'on-bottom',
      'on-top',
      'on-middle'
    );

    // Determine which CSS class to add based on the first word of the offsetString parameter
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
        // Log an error message to the console if the offsetString does not match any of the cases
        console.log('ELEMENT OFFSET: ', offsetString);
    }
  }, [dropTargetRef]); 


  // Memoized function that updates the dropRef position based on the client offset
  const updateDropRefPositionByClientOffset = useCallback((clientOffsetPosition: XYCoord) => {
    // Get references to the dropTarget and dropRef using useRef
    // and check if they exist; if not, return early
    if (!dropTargetRef || !dropRef) return;

    // Only update the position if it has changed
    if (dropRef.x !== clientOffsetPosition.x || dropRef.y !== clientOffsetPosition.y) {

      // Update the x and y properties of the dropRef with the client offset position
      dropRef.x = clientOffsetPosition.x;
      dropRef.y = clientOffsetPosition.y;

      // Determine the bounding rectangle of the drop target
      const boundingRect = dropTargetRef.getBoundingClientRect();

      // Get the vertical center of the drop target
      const centerY = (boundingRect.bottom - boundingRect.top) / 2;

      // Get the number of pixels from the top of the drop target to the mouse pointer
      const clientY = clientOffsetPosition.y - boundingRect.top;

      // Get the horizontal center of the drop target
      const centerX = (boundingRect.right - boundingRect.left) / 2;

      // Get the number of pixels from the left of the drop target to the mouse pointer
      const clientX = clientOffsetPosition.x - boundingRect.left;

      // Get the width and height of the drop target element
      const { width: elementWidth, height: elementHeight } = dndHelper.getElementSize(
        dropTargetRef
      );

      // Calculate the horizontal and vertical offset based on the clientX, centerY, and elementWidth/elementHeight
      const horizontalOffset = dndHelper.hoverOffsetX(clientX, centerY, elementWidth);
      const verticalOffset = dndHelper.hoverOffsetY(clientY, centerY, elementHeight);

      // Determine the display style of the drop target
      const displayStyle = dndHelper.getElementDisplay(dropTargetRef);

      // Calculate the current offset based on the display style
      const currentOffset = displayStyle === 'column' ? verticalOffset : horizontalOffset;

      // Set the offset state with the currentOffset and the clientOffsetPosition
      setOffset(`${currentOffset} (${clientOffsetPosition.x},${clientOffsetPosition.y})`);
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
        // Get references to the dropTarget and dropRef using useRef
        // and check if they exist; if not, return early
        if (!dropTargetRef || !dropRef) return;

        // Check if the hovered item's id matches the current item's id
        if (monitor.isOver({ shallow: true })) {
          if (hoverItem.id === id) {
            // If they match, remove the 'on-top' and 'on-bottom' CSS classes
            // from the dropRef's currentRef element
            if(['on-top', 'on-bottom'].some(className => dropRef.currentRef?.classList.contains(className))) {
              dropRef.currentRef?.classList.remove('on-top', 'on-bottom');
            }
            return;
          }
          // If they don't match, update the dropRef with the new item's properties
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

          // Determine the mouse position using getClientOffset
          const clientOffsetPosition = monitor.getClientOffset();

          if (!clientOffsetPosition) return;

          // If the client offset exists, update the dropRef's position
          updateDropRefPositionByClientOffset(clientOffsetPosition);
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
