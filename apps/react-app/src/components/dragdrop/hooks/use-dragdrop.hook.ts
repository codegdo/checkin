import { useCallback, useEffect, useRef } from "react";
import { utils } from '@libs/shared-code';

import { DataType, Field, DndContextValue, DndActionType, RestrictedDataType } from "../../types";
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

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

  const checkCanDrop = useCallback((dragItem: Field): boolean => {
    const itemData = dragItem.data || [];
    const restrictedDataTypes = Object.values(RestrictedDataType);
    const condition = (field: Field) => (field.dataType === DataType.BLOCK || field.dataType === DataType.SECTION);
    const nestedItemIds = utils.countItems(itemData, condition);
    const keyDataType = `${dragItem.dataType}_${dataType}`;

    const hasNestedItems = nestedItemIds.includes(`${id}`);
    const isRestrictedDataTypes = restrictedDataTypes.includes(keyDataType as RestrictedDataType);

    return !hasNestedItems && !isRestrictedDataTypes;
  }, [id, dataType]);

  const hoverItem = useCallback((currentRef: HTMLDivElement, monitor: DropTargetMonitor<Field>) => {
    const clientOffset = monitor.getClientOffset();
    const initialClientOffset = monitor.getInitialClientOffset();

    if (!clientOffset || !initialClientOffset) return;

    if (dndRef.clientX === clientOffset.x && dndRef.clientY === clientOffset.y) return;

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

    const offset = `on-${verticalOffset}`;

    if (dndRef.canDrop) {

      if (offset === 'on-middle' && monitor.getItemType() === DataType.SECTION && dataType === DataType.SECTION) {
        return;
      }

      // stop calling addclass when transitioning then replace 'offset' with 'is-transitioning'
      if (!currentRef.classList.contains(offset)) {

        addClass(currentRef, offset);

        // addClass(currentRef, 'is-transitioning');

        // const handleTransitionEnd = () => {
        //   currentRef.classList.remove('is-transitioning');
        //   currentRef.removeEventListener('transitionend', handleTransitionEnd);
        // };

        // currentRef.addEventListener('transitionend', handleTransitionEnd, { once: true });
      }

      if (dndRef.offset === offset) return;
      dndRef.offset = offset;

      removeClass(currentRef);
    }

  }, [dataType, dndRef]);

  const handleDragOver = useCallback(
    (dragItem: Field, monitor: DropTargetMonitor<Field>) => {
      if (monitor.isOver({ shallow: true })) {

        if (!dragRef.current) return;

        if (dragItem.id == item.id) {
          if (dndRef.drop) {
            dndRef.drop = null;
            dndRef.canDrop = false;
          }
          return;
        }

        if (dndRef.drop?.id !== item.id) {
          dndRef.drop = { ...item };
          dndRef.canDrop = checkCanDrop(dragItem);
          dndRef.touchItems.push(item.id);
        }

        hoverItem(dragRef.current, monitor);

        //console.log('dragItem', dragItem);
        //console.log('hoverItem', item);
      }
    },
    [item, dndRef, hoverItem, checkCanDrop],
  );

  const handleDragStart = useCallback(
    () => {
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

        dispatch({
          type: dragRef.current ? DndActionType.MOVE_ITEM : DndActionType.ADD_ITEM,
          payload: {
            dragItem,
            dropItem: dndRef.drop,
            offset: dndRef.offset
          }
        });
      }
    },
    [dispatch, dndRef.drop, dndRef.canDrop, dndRef.offset],
  );

  const [{ isDragging }, drag, preview] = useDrag(() => ({
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
    canDrop: () => dndRef.canDrop,
    hover: handleDragOver,
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true })
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

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: false });
    return () => {
      preview(null);
    };
  }, [drag, preview]);

  //drag(drop(dragRef));

  return {
    drag,
    drop,
    ref: dragRef,
    isDragging,
    isOver
  };
}