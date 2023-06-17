import { useCallback, useEffect, useRef } from "react";
import { DataType, Field, DndContextValue } from "../../types";
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from "react-dnd";

interface Params {
  item: Field;
  ctx: DndContextValue
}

interface XYDirection {
  x: number | null;
  currentX: number | null;
  y: number | null;
  currentY: number | null;
}

export function useDragDrop({ item, ctx }: Params) {
  const { dataType } = item;
  const { dndRef } = ctx;
  const dragRef = useRef<HTMLDivElement>(null);
  const {current: directionRef} = useRef<XYDirection>({
    x: null, 
    currentX: null, 
    y: null, 
    currentY: null
  });

  const getOffsetX = (
    clientX: number,
    centerX: number,
    elementWidth: number = 0
  ): 'left' | 'right' | 'middle' => {
    return clientX <= centerX - elementWidth
      ? 'left'
      : clientX >= centerX + elementWidth
        ? 'right'
        : 'middle';
  }

  const getOffsetY = (
    clientY: number,
    centerY: number,
    elementHeight: number = 0
  ): 'top' | 'bottom' | 'middle' => {
    return clientY <= centerY - elementHeight
      ? 'top'
      : clientY >= centerY + elementHeight
        ? 'bottom'
        : 'middle';
  }

  const getVerticleDirection = (clientY: number) => {
    if (directionRef.y === null) {
      directionRef.y = clientY;
    } else {
      directionRef.currentY = clientY;

      if (directionRef.currentY < directionRef.y) {
        directionRef.y = directionRef.currentY;
        return 'up';
      } else if (directionRef.currentY > directionRef.y) {
        window.scrollBy(0, 1);
        directionRef.y = directionRef.currentY;
        return 'down';
      } else {
        return 'no movement Y';
      }
    }
  };

  const getHorizontalDirection = (clientX: number) => {
    if (directionRef.x === null) {
      directionRef.x = clientX;
    } else {
      directionRef.currentX = clientX;

      if (directionRef.currentX < directionRef.x) {
        directionRef.x = directionRef.currentX;
        return 'left';
      } else if (directionRef.currentX > directionRef.x) {
        window.scrollBy(0, 1);
        directionRef.x = directionRef.currentX;
        return 'right';
      } else {
        return 'no movement X';
      }
    }
  };

  const addClass = (currentRef: HTMLDivElement, classNames: string) => {
      currentRef.classList.add(...classNames.split(' '));
  }

  const removeClass = (currentRef: HTMLDivElement, classNames: string) => {
    currentRef.classList.remove(...classNames.split(' '));
    // const lastId = dndRef.touchItems.at(-1);
    // const lastItem = dndRef.domList[`${lastId}`];

    // if (lastItem) {
    //   lastItem.classList.remove('on-top');
    // }
  }

  const nestedItems = () => false;

  const hoverItem = (currentRef: HTMLDivElement, monitor: DropTargetMonitor<Field>) => {
    const clientOffset = monitor.getClientOffset();
    const initialClientOffset = monitor.getInitialClientOffset();

    if (!clientOffset || !initialClientOffset) return;

    // 
    if (dndRef.clientX == clientOffset.x && dndRef.clientY == clientOffset.y) return;

    dndRef.clientX = clientOffset.x;
    dndRef.clientY = clientOffset.y;

    const clientRect = currentRef.getBoundingClientRect();
    const centerY = (clientRect.bottom - clientRect.top) / 2;
    const centerX = (clientRect.right - clientRect.left) / 2;
    const clientY = clientOffset.y - clientRect.top;
    const clientX = clientOffset.x - clientRect.left;

    const verticalOffset = getOffsetY(clientY, centerY);
    const horizontalOffset = getOffsetX(clientX, centerX);
    
    //const verticalDirection = getVerticleDirection(clientOffset.y);
    //const horizontalDirection = getHorizontalDirection(clientOffset.x);

    const offset = `on-${verticalOffset} on-${horizontalOffset}`;

    if(dndRef.offset == offset) return;

    dndRef.offset && removeClass(currentRef, dndRef.offset);

    dndRef.offset = offset;

    addClass(currentRef, offset);

    console.log('offset', offset);
    //console.log('direction', verticalDirection, horizontalDirection);
  };

  const handleHover = useCallback(
    (dragItem: Field, monitor: DropTargetMonitor<Field>) => {
      if (monitor.isOver({ shallow: true })) {

        if (!dragRef.current) return;

        if (dragItem.id == item.id && !nestedItems()) {
          if (dndRef.drop) {

            dndRef.drop = null;
            //removeClass();

            console.log('unsetItem');
          }
          return;
        }

        if (dndRef.drop?.id !== item.id) {

          //removeClass();
          dndRef.drop = { ...item };
          dndRef.touchItems.push(item.id);
          console.log('setItem');
        }

        hoverItem(dragRef.current, monitor);

        //console.log('dragItem', dragItem);
        //console.log('hoverItem', item);
      }
    },
    [],
  );

  const handleDragStart = useCallback(
    () => {
      console.log('startDrag');
      if (dndRef.drop) {
        dndRef.drop = null;
        dndRef.touchItems = [];
      }
      return true;
    },
    [],
  );

  const handleDragEnd = useCallback(
    (dragItem: Field, monitor: DragSourceMonitor<Field>) => {
      //removeClass();
      if (monitor.didDrop()) {
        console.log('dragItemDrop', dragItem);
        console.log('hoverItemDrop', item);
        console.log('dndRef', dndRef);
      }
    },
    [],
  );

  const [, drag] = useDrag(() => ({
    type: dataType,
    item,
    canDrag: handleDragStart,
    end: handleDragEnd,
    collect: (monitor) => ({}),
  }), []);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: Object.values(DataType),
    hover: handleHover,
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  }), []);

  useEffect(() => {
    const key = `${item.id}`;
    if (!dndRef.domList[key]) {
      dndRef.domList[key] = dragRef.current;
    }
  }, []);

  if (!isOver) {
    //removeClass();
  }

  drag(drop(dragRef));

  return {
    ref: dragRef
  };
}