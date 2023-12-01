import { useCallback, useEffect, useRef } from "react";
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from "react-dnd";

import { Field, DataType, ContextValue } from "../types";
import { CurrentXY, dndHelper } from "../helpers";

interface IProps {
  context: ContextValue;
  item: Field;
}

const defaultXY = {
  x: null,
  currentX: null,
  y: null,
  currentY: null
};

export const useDragDrop = ({ context, item }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const xyRef = useRef<CurrentXY>(defaultXY);

  const handleDragStart = useCallback(() => {
    console.log('DRAG START');
    return true;
  }, []);

  const handleDragEnd = useCallback((dragItem: Field, monitor: DragSourceMonitor<Field>) => {
    if (monitor.didDrop()) {
      console.log('DRAG END', context);
    }
  }, [item]);

  const handleDragOver = useCallback((dragItem: Field, monitor: DropTargetMonitor<Field>) => {
    if (!monitor.isOver({ shallow: true }) || !ref.current) return;

    if (context.current.dropItem?.id !== item.id) {
      dndHelper.setDropItem(context, item);
      //console.log('SET DROP', context, dragItem, item);
    }

    // Set coordinates and return early if already set and match
    if (dndHelper.setCoordinate(context, monitor)) return;

    // Set offset
    if(dndHelper.setOffset(context, previewRef.current || ref.current, xyRef.current)) return;

    console.log('DRAG OVER');
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
      //xyRef.current = { ...defaultXY };
      console.log('DRAG OUT', item);
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
