import { useCallback, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { SortableContextValue } from "../sortable.provider";
import { SortableField } from "../types";
import { DataType } from "@/components/types";

interface Props {
  context: SortableContextValue;
  item: SortableField;
}
export const useSortable = ({ context, item }: Props) => {
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