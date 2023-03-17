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
import { DndItem } from '../components/dragdrop';
import { DndActionTypes } from '../components/dragdrop/dragdrop.context';
import { dndHelper } from '../helpers';

export const useDragDrop = <T extends DndItem>(
  { dndRef, state, dispatch, ...item }: T,
  acceptTypes: string | string[] = []
) => {
  const { id, dataType, parentId, childId, position, data, settings } = item;
  const ref = useRef<HTMLDivElement>(null);
  const dropRef = dndRef?.dropRef;
  const elementRef = dndRef?.elementRef;
  const isDropEmpty = data?.length === 0;
  const isSelected = state?.item?.id == id;
  const isLock = settings?.canDrag === false;

  const [offset, setOffset] = useState<string>();

  // This function updates the CSS classes of the drop target element to indicate where a dragged element will be dropped.
  const updateDropTargetClassList = useCallback((offsetString: string) => {
    // If the dropTargetRef does not exist, return early
    if (!ref.current) return;

    // Remove all CSS classes related to drop target position
    ref.current.classList.remove(
      'on-top',
      'on-right',
      'on-bottom',
      'on-top',
      'on-middle'
    );

    // Determine which CSS class to add based on the first word of the offsetString parameter
    switch (offsetString.split(' ')[0]) {
      case 'top':
        ref.current.classList.add('on-top');
        // if (dropRef?.dataType === 'field') {
        //   ref.current.style.transform = 'translate(0px, 58px)';
        //   if (elementRef?.['3']) {
        //     elementRef['3'].style.transform = 'translate(0px, -58px)';
        //   }
        // }
        break;
      case 'right':
        ref.current.classList.add('on-right');
        break;
      case 'bottom':
        ref.current.classList.add('on-bottom');
        // if (dropRef?.dataType === 'field') {
        //   ref.current.style.transform = 'translate(0px, -58px)';
        //   if (elementRef?.['3']) {
        //     elementRef['3'].style.transform = 'translate(0px, 58px)';
        //   }
        // }
        break;
      case 'left':
        ref.current.classList.add('on-left');
        break;
      case 'middle':
        ref.current.classList.add('on-middle');
        break;
      default:
        // Log an error message to the console if the offsetString does not match any of the cases
        console.log('OFFSET DOES NOT MATCH: ', offsetString);
    }
  }, [ref]);

  // Memoized function that updates the dropRef position based on the client offset
  const updateDropRefPosition = useCallback((clientOffsetPosition: XYCoord) => {
    // Get references to the dropTarget and dropRef using useRef
    // and check if they exist; if not, return early
    if (!ref.current || !dropRef) return;

    // Only update the position if it has changed
    if (dropRef.x !== clientOffsetPosition.x || dropRef.y !== clientOffsetPosition.y) {

      // Update the x and y properties of the dropRef with the client offset position
      dropRef.x = clientOffsetPosition.x;
      dropRef.y = clientOffsetPosition.y;

      // Determine the bounding rectangle of the drop target
      const boundingRect = ref.current.getBoundingClientRect();

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
        ref.current
      );

      // Calculate the horizontal and vertical offset based on the clientX, centerY, and elementWidth/elementHeight
      const horizontalOffset = dndHelper.hoverOffsetX(clientX, centerY, elementWidth);
      const verticalOffset = dndHelper.hoverOffsetY(clientY, centerY, elementHeight);

      // Determine the display style of the drop target
      const displayStyle = dndHelper.getElementDisplay(ref.current);

      // Calculate the current offset based on the display style
      let currentOffset = displayStyle === 'column' ? verticalOffset : horizontalOffset;

      if (dropRef.dataType === 'placeholder') {
        currentOffset = 'middle';
      }

      // Set the offset state with the currentOffset and the clientOffsetPosition
      setOffset(`${currentOffset} (${clientOffsetPosition.x},${clientOffsetPosition.y})`);
    }
  }, [ref, dropRef, setOffset]);

  const removeCurrentRefClassName = useCallback((currentRef: HTMLElement | null | undefined) => {
    if (!currentRef) return;

    // If they match, remove the 'on-top', 'on-bottom', 'on-left', 'on-right', and 'on-middle' CSS classes
    const classList = currentRef.classList;
    if (classList.contains('on-top') || classList.contains('on-bottom') || classList.contains('on-left') || classList.contains('on-right') || classList.contains('on-middle')) {
      classList.remove('on-top', 'on-bottom', 'on-left', 'on-right', 'on-middle');
    }
  }, []);

  useEffect(() => {
    if (offset) {
      updateDropTargetClassList(offset);
      if (dropRef) {
        dropRef.offset = offset.split(' ')[0];
      }
    }
  }, [offset, dropRef, updateDropTargetClassList]);

  useEffect(() => {
    if(elementRef && ref.current) {
      elementRef[`${id}`] = ref.current
    }
  }, [elementRef, ref, id]);

  // Destructure the values returned by the useDrop hook
  const [{ isOver }, drop] = useDrop({
    // The type of the drop can accept
    accept: acceptTypes,
    // A function to determine dragged over
    hover: useCallback((dragItem: DndItem, monitor: DropTargetMonitor<DndItem, unknown>) => {
      // Get references ref.current and dropRef
      // and check if they exist; if not, return early
      if (!ref.current || !dropRef) return;

      // Check if the hovered item's id matches the current item's id
      if (monitor.isOver({ shallow: true })) {

        // Extract the item ID from the drag item's ID
        const [dragItemId] = `${dragItem.id}`.split('_');

        // If the dragged item is the same as the current drop target, do nothing
        if (`${id}` === dragItemId) {
          if (dropRef.canDrop) {
            // Set canDrop to false to prevent dropping on an occupied placeholder
            dropRef.canDrop = false;
            // Remove the current ref class name from the drop ref's element
            removeCurrentRefClassName(elementRef?.[`${dropRef.id}`]);
          }
          // Return early to prevent further execution of this function
          return;
        }

        // If they don't match, update the dropRef with the new item's properties
        if (`${dropRef.id}` !== `${id}`) {

          // Remove the current reference class name from the drop reference's currentRef
          removeCurrentRefClassName(elementRef?.[`${dropRef.id}`]);

          // Set the dropRef's properties based on the new item's properties
          dropRef.id = id;
          dropRef.dataType = dataType;
          dropRef.parentId = parentId;
          dropRef.childId = childId;
          dropRef.position = position;
          dropRef.data = data;
          dropRef.x = 0;
          dropRef.y = 0;

          console.log(dndRef);
        }

        // Set dropRef's canDrop property to true
        if (!dropRef.canDrop) dropRef.canDrop = true;

        // Determine the mouse position using getClientOffset
        const clientOffsetPosition = monitor.getClientOffset();

        // If the client offset doesn't exist, return early
        if (!clientOffsetPosition) return;

        // Update the drop ref's position
        updateDropRefPosition(clientOffsetPosition);
      }
      // List dependencies for this callback
    }, [id, dataType, parentId, childId, position, data, dropRef, ref, updateDropRefPosition]),
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

        // Check if dragging is dropped item then not allowed in the target drop area
        if (didDrop && ref.current !== null && dropRef?.dataType === 'area') return;

        // Check if the drop target allows the dropped item
        if (didDrop && dropRef?.canDrop) {
          // Dispatch an action to move or add the item to the drop target
          dispatch?.({
            type: ref.current ? DndActionTypes.MOVE_ITEM : DndActionTypes.ADD_ITEM,
            payload: {
              dragItem,
              dropRef,
            },
          });
        }
      },
    }),
    // An array of dependencies to trigger a re-render when they change
    [ref, dataType, item, dndRef, settings]
  );

  // Define a function that is called when the mouse pointer is moved over the component
  const onMouseOver = (event: React.MouseEvent) => {

    // Prevent the default behavior of the event, which can include actions such as following a link or submitting a form
    event.preventDefault();

    // Stop the event from propagating up the DOM tree, which can interfere with the behavior of the component
    event.stopPropagation();

    // Check if the ref object has a current property
    if (ref.current) {

      // Add the 'is-hover' class to the element
      // This class is used to indicate that the element is currently being hovered over by the mouse pointer
      ref.current.classList.add('is-hover');
    }
  };

  // Define a function that is called when the mouse pointer leaves the component
  const onMouseOut = (event: React.MouseEvent) => {

    // Prevent the default behavior of the event, which can include actions such as following a link or submitting a form
    event.preventDefault();

    // Stop the event from propagating up the DOM tree, which can interfere with the behavior of the component
    event.stopPropagation();

    // Check if the ref object has a current property
    if (ref.current) {

      // Remove the 'is-hover' class from the element
      // This class is used to indicate that the element is currently being hovered over by the mouse pointer
      ref.current.classList.remove('is-hover');
    }
  };

  return {
    ref,
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
