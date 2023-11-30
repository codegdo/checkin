import { useCallback, useRef } from "react";
import { DndContextValue } from "../dragdrop.provider";
import { DndField } from "../types";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { DataType } from "@/components/types";

interface Props {
  context: DndContextValue;
  item: DndField;
}
export const useDragDrop = ({ context, item }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleDragStart = useCallback(() => {
    console.log('DRAG START');

    return true;
  }, []);

  const handleDragEnd = useCallback(() => {
    console.log('DRAG END');

    return true;
  }, []);

  const handleDragOver = useCallback((dragItem: DndField, monitor: DropTargetMonitor<DndField>) => {
    if (!monitor.isOver({ shallow: true })) return;
    if (!ref.current || dragItem.id == item.id) {
      return;
    }
    if(context.current.drop?.id !== item.id) {
      console.log('SET DROP');
      context.current.drop = item;
    }
    console.log('DRAG OVER');
  }, []);

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

  return {
    ref,
    drag,
    drop,
    preview,
    isOver,
    isDragging
  }
}