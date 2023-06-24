import { useCallback, useEffect, useRef } from "react";
import { utils } from '@libs/shared-code';

import { DataType, Field, DndContextValue, DndActionType } from "../../types";
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from "react-dnd";

interface Params {
  item: Field;
  ctx: DndContextValue,
  draggable?: boolean
}

interface XYDirection {
  x: number | null;
  currentX: number | null;
  y: number | null;
  currentY: number | null;
}

export function useDragDrop({ item, ctx, draggable = true }: Params) {
  const { id, dataType, data = [] } = item;
  const { dndRef, dispatch } = ctx;
  const dragRef = useRef<HTMLDivElement>(null);

  // const { current: directionRef } = useRef<XYDirection>({
  //   x: null,
  //   currentX: null,
  //   y: null,
  //   currentY: null
  // });

  const calculateElementSize = (currentRef: HTMLDivElement) => {
    let width = 0;
    let height = 0;

    if (currentRef.classList.contains('is-empty')) {
      const style = window.getComputedStyle(currentRef, ':after');
      width = (parseFloat(style.width) || 0) / 2;
      height = (parseFloat(style.height) || 0) / 2;
    }

    return { width, height };
  }

  const getOffsetX = (
    clientX: number,
    centerX: number,
    width = 0
  ): 'left' | 'right' | 'middle' => {
    return clientX <= centerX - width
      ? 'left'
      : clientX >= centerX + width
        ? 'right'
        : 'middle';
  }

  const getOffsetY = (
    clientY: number,
    centerY: number,
    height = 0
  ) => {
    return clientY <= centerY - height
      ? 'top'
      : clientY >= centerY + height
        ? 'bottom'
        : 'middle';
  }

  // const getVerticleDirection = (clientY: number) => {
  //   if (directionRef.y === null) {
  //     directionRef.y = clientY;
  //   } else {
  //     directionRef.currentY = clientY;

  //     if (directionRef.currentY < directionRef.y) {
  //       directionRef.y = directionRef.currentY;
  //       return 'up';
  //     } else if (directionRef.currentY > directionRef.y) {
  //       window.scrollBy(0, 1);
  //       directionRef.y = directionRef.currentY;
  //       return 'down';
  //     } else {
  //       return 'no movement Y';
  //     }
  //   }
  // };

  // const getHorizontalDirection = (clientX: number) => {
  //   if (directionRef.x === null) {
  //     directionRef.x = clientX;
  //   } else {
  //     directionRef.currentX = clientX;

  //     if (directionRef.currentX < directionRef.x) {
  //       directionRef.x = directionRef.currentX;
  //       return 'left';
  //     } else if (directionRef.currentX > directionRef.x) {
  //       window.scrollBy(0, 1);
  //       directionRef.x = directionRef.currentX;
  //       return 'right';
  //     } else {
  //       return 'no movement X';
  //     }
  //   }
  // };

  const addClass = (currentRef: HTMLDivElement, className: string) => {
    currentRef.classList.add(className);
  }

  const removeClass = (currentRef: HTMLDivElement) => {
    currentRef.classList.remove(
      'on-top',
      'on-bottom',
      'on-left',
      'on-right',
      'on-middle'
    );
  }

  const hasNestedItems = useCallback((dragItem: Field): boolean => {
    if (dragItem.dataType == DataType.FIELD) return false;

    const itemData = dragItem.data || [];
    const nestedIds = utils.countItems(itemData, (child: Field) => child.dataType == 'block');

    return nestedIds.includes(`${id}`);
  }, [id]);

  const hoverItem = useCallback((currentRef: HTMLDivElement, monitor: DropTargetMonitor<Field>) => {
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

    const { width, height } = calculateElementSize(currentRef);

    const verticalOffset = getOffsetY(clientY, centerY, height);
    const horizontalOffset = getOffsetX(clientX, centerX, width);

    //const verticalDirection = getVerticleDirection(clientOffset.y);
    //const horizontalDirection = getHorizontalDirection(clientOffset.x);

    const offset = `on-${verticalOffset}`;

    if (monitor.isOver({ shallow: true })) {
      if (!currentRef.classList.contains(offset)) {
        dndRef.canDrop && addClass(currentRef, offset);
        //console.log('IS DRAGOVER ADD CSS');
      }
    }

    if (dndRef.offset == offset) return;

    dndRef.offset && removeClass(currentRef);

    dndRef.offset = offset;

    dndRef.canDrop && addClass(currentRef, offset);

    //console.log('offset', offset);
  }, [dndRef]);

  const handleHover = useCallback(
    (dragItem: Field, monitor: DropTargetMonitor<Field>) => {
      if (monitor.isOver({ shallow: true })) {

        if (!dragRef.current) return;

        if (dragItem.id == item.id) {
          if (dndRef.drop) {
            dndRef.drop = null;
            //console.log('unsetItem');
          }
          if (dndRef.canDrop) {
            dndRef.canDrop = false;
            //console.log('resetCanDrop');
          }
          return;
        }

        if (dndRef.drop?.id !== item.id) {
          dndRef.drop = { ...item };
          dndRef.canDrop = !hasNestedItems(dragItem);
          dndRef.touchItems.push(item.id);
          //console.log('setItem');
          //console.log('setCanDrop', dndRef.canDrop);
        }

        hoverItem(dragRef.current, monitor);

        //console.log('dragItem', dragItem);
        //console.log('hoverItem', item);
      }
    },
    [dndRef, item, hoverItem, hasNestedItems],
  );

  const handleDragStart = useCallback(
    () => {
      //console.log('startDrag');
      if (dndRef.drop) {
        dndRef.drop = null;
        dndRef.touchItems = [];
      }

      return draggable;
    },
    [dndRef, draggable],
  );

  const handleDragEnd = useCallback(
    (dragItem: Field, monitor: DragSourceMonitor<Field>) => {

      if (monitor.didDrop() && dndRef.canDrop) {
        //console.log('dragItem', dragItem);
        //console.log('hoverItem', item);
        //console.log('dropItem', dndRef.drop);
        //console.log('currentRef', dragRef.current);
        const isMoveItem = dragRef.current?.getAttribute('data-id');

        dispatch({
          type: isMoveItem ? DndActionType.MOVE_ITEM : DndActionType.ADD_ITEM,
          payload: {
            dragItem,
            dropItem: dndRef.drop,
            offset: dndRef.offset
          }
        });
      }
    },
    [dispatch, dndRef.canDrop, dndRef.drop, dndRef.offset, dragRef.current],
  );

  const [{ isDragging }, drag] = useDrag(() => ({
    type: dataType,
    item,
    canDrag: handleDragStart,
    end: handleDragEnd,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
  }), [item]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: Object.values(DataType),
    hover: handleHover,
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop()
    }),
  }), [item]);

  useEffect(() => {
    const key = `${item.id}`;
    if (item.id && !dndRef.domList[key]) {
      dndRef.domList[key] = dragRef.current;
    }
  }, [dndRef, item]);

  useEffect(() => {
    if (!isOver) {
      const lastItemId = dndRef.touchItems.at(-1);
      const lastTargetItem = dndRef.domList[`${lastItemId}`];

      lastTargetItem && removeClass(lastTargetItem);

      //console.log('IS DRAGOUT REMOVE CSS', dndRef, item);
    }
  }, [dndRef, isOver]);

  //drag(drop(dragRef));

  return {
    drag,
    drop,
    ref: dragRef,
    isDragging,
    isOver
  };
}