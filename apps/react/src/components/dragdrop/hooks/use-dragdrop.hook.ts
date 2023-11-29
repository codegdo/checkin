import { useCallback, useRef } from "react";
import { DndContextValue } from "../dragdrop.provider";
import { DndField } from "../types";
import { useDrag, useDrop } from "react-dnd";

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

  const handleDragOver = useCallback(() => {
    console.log('DRAG OVER');

    return true;
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
    accept: ['list', 'item'],
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