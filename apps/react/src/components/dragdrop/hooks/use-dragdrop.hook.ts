import { useCallback, useEffect, useRef } from "react";
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from "react-dnd";

import { Field, DataType, ContextValue } from "../types";
import { Coordinate, dndHelper } from "../helpers";
import { ActionType } from "../reducers";

interface IProps {
  context: ContextValue;
  item: Field;
}

const defaultCoordinate = {
  x: null,
  y: null,
  currentX: null,
  currentY: null
};

export const useDragDrop = ({ context, item }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const coordinateRef = useRef<Coordinate>(defaultCoordinate);

  const handleDragStart = useCallback(() => {
    console.log('DRAG START');
    return true;
  }, []);

  const handleDragEnd = useCallback((dragItem: Field, monitor: DragSourceMonitor<Field>) => {
    if (monitor.didDrop()) {
      const payload = {
        dragItem,
        context: context.current
      };

      context.dispatch({
        type: ActionType.MOVE_ITEM,
        payload,
      });
    }
  }, [context]);

  const handleDragOver = useCallback((dragItem: Field, monitor: DropTargetMonitor<Field>) => {
    if (!monitor.isOver({ shallow: true }) || !ref.current) return;

    if (context.current.dropItem?.id !== item.id) {
      dndHelper.setDropItem(context, item);
    }

    // Set coordinate and return early if already set and match
    if (dndHelper.setCoordinate(context, monitor)) return;

    // Set offset and css, return early if already set and match
    if (dndHelper.setOffset(previewRef.current || ref.current, context, coordinateRef.current)) return;

    //console.log('DRAG OVER');
  }, [context, item]);

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: `${item.dataType}`,
    item,
    canDrag: handleDragStart,
    end: handleDragEnd,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }), [item]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: Object.values(DataType),
    canDrop: () => context.current.canDrop,
    hover: handleDragOver,
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true })
    })
  }), [item]);

  useEffect(() => {
    if (!isOver) {
      //coordinateRef.current = { ...defaultCoordinate };
      //console.log('DRAG OUT', item);
    }
  }, [isOver]);

  return {
    ref,
    previewRef,
    drag,
    drop,
    preview,
    isOver,
    isDragging
  };
};
