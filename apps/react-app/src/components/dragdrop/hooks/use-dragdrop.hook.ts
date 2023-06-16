import { useCallback, useEffect, useRef } from "react";
import { DataType, Field, DndContextValue } from "../../types";
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from "react-dnd";

interface Params {
  item: Field;
  ctx: DndContextValue
}

export function useDragDrop({ item, ctx }: Params) {
  const { dataType } = item;
  const { dndRef } = ctx;
  const dragRef = useRef<HTMLDivElement>(null);

  const addClass = (classNames: string) => {
    if (dragRef.current && !dragRef.current.classList.contains(classNames)) {
      dragRef.current.classList.add(classNames);
    }
  }

  const removeClass = () => {
    const lastId = dndRef.touchItems.at(-1);
    const lastItem = dndRef.domList[`${lastId}`];

    if (lastItem) {
      lastItem.classList.remove('on-top');
    }
  }

  const nestedItems = () => false;

  const hoverItem = (monitor: DropTargetMonitor<Field>) => {
    const clientOffset = monitor.getClientOffset();
    const initialClientOffset = monitor.getInitialClientOffset();

    if (!clientOffset || !initialClientOffset) return;



    addClass('on-top');

    //console.log('currentDrag', dragRef.current);
  };

  const handleHover = useCallback(
    (dragItem: Field, monitor: DropTargetMonitor<Field>) => {
      if (monitor.isOver({ shallow: true })) {

        if (!dragRef.current) return;

        if (dragItem.id == item.id && !nestedItems()) {
          if (dndRef.drop) {

            dndRef.drop = null;
            removeClass();

            console.log('unsetItem');
          }
          return;
        }

        if (dndRef.drop?.id !== item.id) {

          removeClass();
          dndRef.drop = { ...item };
          dndRef.touchItems.push(item.id);

          console.log('setItem');
        }

        hoverItem(monitor);

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
      removeClass();
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
    removeClass();
  }

  drag(drop(dragRef));

  return {
    ref: dragRef
  };
}