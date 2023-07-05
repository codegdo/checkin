import { useCallback, useEffect, useRef } from "react";
import { SortableContextValue } from "../sortable.provider";
import { Field } from "../types";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";

interface Params {
  item: Field;
  ctx: SortableContextValue;
}

export const useSortable = ({item, ctx}: Params) => {
  const { ref } = ctx;
  const { id, group } = item;
  const dragRef = useRef<HTMLDivElement>(null);

  const handleDragStart = useCallback(() => {
    if(id === 'sortable-area') return false;
    return true;
  }, [item]);

  const handleDragEnd = useCallback(() => {
    console.log('dragEnd', ref);
  }, [item]);

  const handleDragOver = useCallback((dragItem: Field, monitor: DropTargetMonitor<Field>) => {
    if (monitor.isOver({ shallow: true })) {
      if (!dragRef.current) return;
      
      if (dragItem.id == item.id) {
        if(ref.canDrop) {
          ref.drop = null;
          ref.canDrop = false;
          console.log('reset-drop');
        }
        return;
      }

      if(ref.drop?.id !== item.id) {
        ref.drop = item;
        ref.canDrop = true;
        console.log('set-drop');
      }

      const clientOffset = monitor.getClientOffset();
      const initialClientOffset = monitor.getInitialClientOffset();

      if (clientOffset && initialClientOffset) {
        const { cordinate } = ref;

        if (cordinate.x === clientOffset.x && cordinate.y === clientOffset.y) return;

        cordinate.x = clientOffset.x;
        cordinate.y = clientOffset.y;

        const clientRect = dragRef.current.getBoundingClientRect();
        const centerY = (clientRect.bottom - clientRect.top) / 2;
        const centerX = (clientRect.right - clientRect.left) / 2;
        const clientY = clientOffset.y - clientRect.top;
        const clientX = clientOffset.x - clientRect.left;

        console.log('dragOver');
      }; 
    }
  }, [item]);

  const [, drag] = useDrag(() => ({
    type: group,
    item,
    canDrag: handleDragStart,
    end: handleDragEnd,
  }), [item]);

  const [{isOver}, drop] = useDrop(() => ({
    accept: ['block', 'field'],
    canDrop: () => ref.canDrop,
    hover: handleDragOver,
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true })
    })
  }), [item]);

  useEffect(() => {
    if(!isOver && dragRef.current) {
      console.log('dragOut');
    }
  }, [isOver, dragRef]);

  useEffect(() => {
    ref.doms[`${id}`] = dragRef.current;
  }, []);

  return {
    ref: dragRef,
    drag,
    drop,
    isOver
  }
}