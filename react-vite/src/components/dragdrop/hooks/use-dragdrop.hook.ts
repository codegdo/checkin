import React, {
  useCallback,
  useEffect,
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
import { DndAction, DndRef, DndState } from '../dragdrop.context';
import { dndHelper } from '../helpers/dragdrop.helper';
import { DndActionType, DndItem, DndItemType } from '../dragdrop.type';

export type useDragDropProps = {
  item: DndItem;
  dndRef?: DndRef;
  dndState?: DndState;
  dispatch?: React.Dispatch<DndAction>;
};

export function useDragDrop({
  item,
  dndRef,
  dndState,
  dispatch = () => console.log("dispatch"),
}: useDragDropProps) {

  const { id, dataType, parentId, childId, position, data, settings } = item;
  const dragRef = useRef<HTMLDivElement>(null);
  const currentElement = dragRef.current;

  const dropRef = dndRef?.dropRef;
  const domRef = dndRef?.domRef;
  const isDropEmpty = data?.length === 0;
  const isSelected = dndState?.item?.id == id;
  const isLock = settings?.canDrag === false;
  const acceptTypes = Object.values(DndItemType);

  let { current: previousY } = useRef<number | null>(null);
  let { current: currentY } = useRef<number | null>(null);
  let { current: previousX } = useRef<number | null>(null);
  let { current: currentX } = useRef<number | null>(null);

  const [offset, setOffset] = useState<string>();

  const updateDropTargetTransform = useCallback((offsetString: string) => {
    // Ensure required elements are present before continuing
    if (!currentElement || !dropRef) return;

    // Get dimensions and positions
    const height = currentElement.clientHeight;
    const draggedElement = domRef?.[`${dropRef.dragId}`];
    const position = dropRef.position as number;
    const dragPosition = dropRef.dragPosition as number;
    const direction = dropRef.direction;

    // Determine which CSS class to add based on the first word of the offsetString parameter
    const [offsetDirection] = offsetString.split(' ');

    // Apply transformations based on the offset direction and drop direction
    switch (offsetDirection) {
      case 'top': {
        if (direction === 'up' && position < dragPosition) {
          console.log('FROM TOP up');
        } else if (direction === 'down') {
          if (position > dragPosition) {
            // Move the drop target down
            if (dropRef.translateY == null) {
              dropRef.translateY = height;
            } else {
              dropRef.translateY += height;
            }
            // Apply transformations to the elements being dragged and dropped
            if (draggedElement) {
              currentElement.style.transform = `translate(0px, -${height}px) scale(1, 1)`;
              draggedElement.style.transform = `translate(0px, ${dropRef.translateY}px) scale(1, 1)`;
            }
          } else {
            // Move the drop target up
            if (draggedElement && dropRef.translateY) {
              currentElement.style.transform = '';
              dropRef.translateY += height;
              draggedElement.style.transform = `translate(0px, ${dropRef.translateY}px) scale(1, 1)`;
            }
          }
          console.log('FROM TOP down');
        }
        break;
      }
      case 'bottom': {
        if (direction === 'up') {
          // Move the drop target up
          if (position < dragPosition) {
            if (dropRef.translateY == null) {
              dropRef.translateY = -height;
            } else {
              dropRef.translateY -= height;
            }
            if (draggedElement) {
              currentElement.style.transform = `translate(0px, ${height}px) scale(1, 1)`;
              draggedElement.style.transform = `translate(0px, ${dropRef.translateY}px) scale(1, 1)`;
            }
          } else {
            // Move the drop target down
            if (draggedElement && dropRef.translateY) {
              dropRef.translateY -= height;
              currentElement.style.transform = '';
              draggedElement.style.transform = `translate(0px, ${dropRef.translateY}px) scale(1, 1)`;
            }
          }
          console.log('FROM BOTTOM up');
        } else if (direction === 'down' && position > dragPosition) {
          console.log('FROM BOTTOM down');
        }
        break;
      }
      default:
        console.log('OFFSET DOES NOT MATCH: ', offsetString);
    }
  }, [currentElement, dropRef]);

  // This function updates the CSS classes of the drop target element to indicate where a dragged element will be dropped.
  const updateDropTargetClassList = useCallback((offsetString: string) => {

    if (!currentElement) return;

    // Remove all CSS classes related to drop target position
    currentElement.classList.remove(
      'on-top',
      'on-right',
      'on-bottom',
      'on-top',
      'on-middle'
    );

    // Determine which CSS class to add based on the first word of the offsetString parameter
    const [offsetDirection] = offsetString.split(' ');

    switch (offsetDirection) {
      case 'top':
        currentElement.classList.add('on-top');
        break;
      case 'bottom':
        currentElement.classList.add('on-bottom');
        break;
      case 'right':
        currentElement.classList.add('on-right');
        break;
      case 'left':
        currentElement.classList.add('on-left');
        break;
      case 'middle':
        currentElement.classList.add('on-middle');
        break;
      default:
        console.log('OFFSET DOES NOT MATCH: ', offsetString);
    }
  }, [currentElement]);

  const determineDirectionY = useCallback((clientY: number) => {
    if (previousY === null) {
      previousY = clientY;
    } else {
      currentY = clientY;

      if (currentY < previousY) {
        previousY = currentY;
        return 'up';
      } else if (currentY > previousY) {
        window.scrollBy(0, 1);
        previousY = currentY;
        return 'down';
      } else {
        return 'no movement';
      }
    }
  }, [previousY, currentY]);

  const determineDirectionX = useCallback((clientX: number) => {
    if (previousX === null) {
      previousX = clientX;
    } else {
      currentX = clientX;

      if (currentX < previousX) {
        previousX = currentX;
        return 'left';
      } else if (currentX > previousX) {
        window.scrollBy(0, 1);
        previousX = currentX;
        return 'right';
      } else {
        return 'no movement';
      }
    }
  }, [previousX, currentX]);

  // Memoized function that updates the dropRef position based on the client offset
  const updateDropRefPosition = useCallback((currentClientOffset: XYCoord, initialClientOffset: XYCoord) => {

    // Get references to the currentElement and dropRef using useRef
    // and check if they exist; if not, return early
    if (!currentElement || !dropRef) {
      console.log('Error: currentElement or dropRef not defined');
      return;
    }

    // Only update the position if it has changed
    if (dropRef.x !== currentClientOffset.x || dropRef.y !== currentClientOffset.y) {

      // Update the x and y properties of the dropRef with the client offset position
      dropRef.x = currentClientOffset.x;
      dropRef.y = currentClientOffset.y;

      // Determine the bounding rectangle of the drop target
      const boundingRect = currentElement.getBoundingClientRect();

      // Get the vertical center of the drop target
      const centerY = (boundingRect.bottom - boundingRect.top) / 2;

      // Get the number of pixels from the top of the drop target to the mouse pointer
      const clientY = currentClientOffset.y - boundingRect.top;

      // Get the horizontal center of the drop target
      const centerX = (boundingRect.right - boundingRect.left) / 2;

      // Get the number of pixels from the left of the drop target to the mouse pointer
      const clientX = currentClientOffset.x - boundingRect.left;

      // Get the width and height of the drop target element
      const { width: elementWidth, height: elementHeight } = dndHelper.getElementSize(
        currentElement
      );

      // BUG with elementWidth and elementHeight

      // Calculate the horizontal and vertical offset based on the clientX, centerY, and elementWidth/elementHeight
      const horizontalOffset = dndHelper.determineOffsetX(clientX, centerY, elementWidth);
      const verticalOffset = dndHelper.determineOffsetY(clientY, centerY, elementHeight);
      const verticalDirection = determineDirectionY(currentClientOffset.y);
      const horizontalDirection = initialClientOffset.y < currentClientOffset.y ? 'left' : 'right';

      // Determine the display style of the drop target
      const displayStyle = dndHelper.getElementDisplay(currentElement);

      // Calculate the current offset based on the display style
      let currentOffset = displayStyle === 'column' ? verticalOffset : horizontalOffset;
      let currentDirection = displayStyle === 'column' ? verticalDirection : horizontalDirection;

      console.log('PLACEHOLDER', dropRef.dataType);

      if (dropRef.dataType === 'placeholder') {
        console.log('PLACEHOLDER');
        currentOffset = 'middle';
      }

      console.log(currentOffset);

      if (dropRef) {
        dropRef.direction = verticalDirection;
      }

      // Set the offset state with the currentOffset and the currentDirection
      setOffset(`${currentOffset} ${currentDirection}`);
    }
  }, [currentElement, dropRef, setOffset]);

  const removeElementClassName = useCallback((element: HTMLElement | null | undefined) => {
    if (!element) return;

    // If they match, remove the 'on-top', 'on-bottom', 'on-left', 'on-right', and 'on-middle' CSS classes
    const classList = element.classList;
    if (classList.contains('on-top') || classList.contains('on-bottom') || classList.contains('on-left') || classList.contains('on-right') || classList.contains('on-middle')) {
      classList.remove('on-top', 'on-bottom', 'on-left', 'on-right', 'on-middle');
    }
  }, []);

  useEffect(() => {
    if (offset) {
      updateDropTargetClassList(offset);
      //updateDropTargetTransform(offset);
      if (dropRef) {
        const [currentOffset, currentDirection] = offset.split(' ');
        dropRef.offset = currentOffset;
        //dropRef.direction = currentDirection;
      }
    }
  }, [offset, dropRef, updateDropTargetClassList]);

  useEffect(() => {
    if (domRef && currentElement) {
      domRef[`${id}`] = currentElement;
    }
  }, [domRef, currentElement, id]);

  // Destructure the values returned by the useDrop hook
  const [{ isOver }, drop] = useDrop({
    // The type of the drop can accept
    accept: acceptTypes,
    // A function to determine dragged over
    hover: useCallback((dragItem: DndItem, monitor: DropTargetMonitor<DndItem, unknown>) => {
      // Get references to the current element and drop ref
      // If either is missing, return early
      if (!currentElement || !dropRef) return;
      console.log('BUG', id, dataType, acceptTypes);
      // Check if the hovered item's id matches the current item's id
      if (monitor.isOver({ shallow: true })) {
        // Extract the item ID from the drag item's ID
        const [dragItemId] = `${dragItem.id}`.split('_');

        // If the dragged item is the same as the current drop target, do nothing
        // Or the dragged item is on nested children of drop target
        if (dragItemId === `${id}`) {

          if (dropRef.canDrop) {
            // Set canDrop to false to prevent dropping on an occupied placeholder
            dropRef.canDrop = false;
            // Remove the current ref class name from the drop ref's element
            removeElementClassName(domRef?.[`${dropRef.id}`]);
          }
          // Return early to prevent further execution of this function
          return;
        }

        // If they don't match, update the dropRef with the new item's properties
        if (`${dropRef.id}` !== `${id}`) {
          // Remove the current reference class name from the drop reference's currentRef
          removeElementClassName(domRef?.[`${dropRef.id}`]);

          // Set the dropRef's properties based on the new item's properties
          dropRef.id = id;
          dropRef.dataType = dataType;
          dropRef.parentId = parentId;
          dropRef.childId = childId;
          dropRef.position = position;
          dropRef.data = data;

          dropRef.dragId = dragItem?.id;
          dropRef.dragPosition = dragItem?.position;

          dropRef.x = 0;
          dropRef.y = 0;

          console.log(dndRef);
        }

        // Check if the dragged item is dropped on nested children of the drop target
        const [_, dragItemIds] = dndHelper.countItems(dragItem);
        const dropItemId = dataType === 'placeholder' ? `${id}`.split('_')[0] : `${id}`;
        const isDropOnNestedChildren = dndHelper.checkDragItemDroppedOnNestedItem(dragItemIds, dropItemId);

        if (isDropOnNestedChildren) {
          // Set dropRef's canDrop property to false
          if (!dropRef.canDrop) dropRef.canDrop = false;
          return;
        }

        // Set dropRef's canDrop property to true
        if (!dropRef.canDrop) dropRef.canDrop = true;

        // Determine the mouse position using getClientOffset
        const clientOffsetPosition = monitor.getClientOffset();
        const initialClientOffset = monitor.getInitialClientOffset();

        // initial y > clientoffset y = move up
        // initial y < clientoffset y = move down

        // If the client offset doesn't exist, return early
        if (!clientOffsetPosition || !initialClientOffset) return;

        // Update the drop ref's position based on the mouse position
        updateDropRefPosition(clientOffsetPosition, initialClientOffset);
      }

      // List dependencies for this callback
    }, [id, dataType, parentId, childId, position, data, dropRef, currentElement, updateDropRefPosition]),
    // A function that returns an object with values to be collected during dropping
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  });

  // Destructure the values returned by the useDrag hook
  const [{ isDragging }, drag, preview] = useDrag(
    // Pass an object with various options to configure the drag behavior
    () => ({
      // The type of the draggable item
      type: dataType,
      // The item data to be passed to the drop target
      item: { ...item },
      // A function to determine whether the item can be dragged
      canDrag: () => {
        // Prevent dragging for certain types of items
        if (dataType === 'area' || dataType === 'placeholder') return false;
        if (settings?.canDrag === false) return false;

        // Prepare an empty image to use for dragging preview
        preview(getEmptyImage(), { captureDraggingState: false });

        // Reset the ID of the drop target.
        // will trigger useDrop hover function to set a new dropRef again
        if (dropRef) dropRef.id = undefined;
        // Allow dragging for all other items
        return true;
      },
      // A function that returns an object with values to be collected during dragging
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      }),
      // A function to handle the end of a drag operation
      end: (dragItem, monitor) => {
        // Check if the item was dropped onto a valid target
        const didDrop = monitor.didDrop();

        /* if (didDrop && domRef) {
          // Check if domRef is not null or undefined
          for (const element of Object.values(domRef)) {
            // Use Object.values() to iterate over the values of the object
            console.log(element);
            removeElementClassName(element);
          }
        } */

        // Check if dragging is dropped item then not allowed in the target drop area
        if (didDrop && currentElement !== null && dropRef?.dataType === 'area') return;

        // Check if the drop target allows the dropped item
        if (didDrop && dropRef?.canDrop) {
          // Dispatch an action to move or add the item to the drop target
          dispatch?.({
            type: currentElement ? DndActionType.MOVE_ITEM : DndActionType.ADD_ITEM,
            payload: {
              dragItem,
              dropRef,
            },
          });
        }


      },
    }),
    // An array of dependencies to trigger a re-render when they change
    [currentElement, dataType, item, dndRef, settings]
  );

  // Define a function that is called when the mouse pointer is moved over the component
  const onMouseOver = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    // Check if the ref object has a current property
    if (currentElement) {

      // Add the 'is-hover' class to the element
      // This class is used to indicate that the element is currently being hovered over by the mouse pointer
      currentElement.classList.add('is-hover');
    }
  };

  // Define a function that is called when the mouse pointer leaves the component
  const onMouseOut = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    // Check if the ref object has a current property
    if (currentElement) {

      // Remove the 'is-hover' class from the element
      // This class is used to indicate that the element is currently being hovered over by the mouse pointer
      currentElement.classList.remove('is-hover');
    }
  };

  return {
    dragRef,
    isOver,
    isDragging,
    isSelected,
    isLock,
    isDropEmpty,
    drag,
    drop,
    onMouseOver,
    onMouseOut
  };
};
