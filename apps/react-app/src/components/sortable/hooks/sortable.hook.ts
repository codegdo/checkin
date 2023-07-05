import { useCallback, useEffect, useRef } from "react";
import { SortableContextValue } from "../sortable.provider";
import { Field } from "../types";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { sortableHelper } from "../helpers";

interface Params {
  item: Field;
  ctx: SortableContextValue;
}

export interface XYDirection {
  x: number | null;
  currentX: number | null;
  y: number | null;
  currentY: number | null;
}

export const useSortable = ({ item, ctx }: Params) => {
  const { ref } = ctx;
  const { id, group } = item;
  const dragRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef<XYDirection>({
    x: null,
    currentX: null,
    y: null,
    currentY: null
  });

  const handleDragStart = useCallback(() => {
    if (id === 'sortable-area') return false;
    return true;
  }, [item]);

  const handleDragEnd = useCallback(() => {
    console.log('dragEnd', ref);
  }, [item]);

  const handleDragOver = useCallback((dragItem: Field, monitor: DropTargetMonitor<Field>) => {
    if (monitor.isOver({ shallow: true })) {
      if (!dragRef.current) return;

      if (dragItem.id == item.id) {
        // if (ref.canDrop) {
        //   ref.drop = null;
        //   ref.offset = null;
        //   ref.canDrop = false;
        //   console.log('reset-drop');
        // }
        return;
      }

      if (ref.drop?.id !== item.id) {
        ref.drop = item;
        ref.canDrop = true;
        console.log('set-drop');
      }

      const clientOffset = monitor.getClientOffset();

      if (clientOffset && ref.canDrop) {
        const { cordinate } = ref;

        if (cordinate.x === clientOffset.x && cordinate.y === clientOffset.y) return;

        cordinate.x = clientOffset.x;
        cordinate.y = clientOffset.y;

        const clientRect = dragRef.current.getBoundingClientRect();
        const clientInnerSize = sortableHelper.getClientInnerSize(dragRef.current);
        const clientDisplay = sortableHelper.getClientDisplay(dragRef.current);

        const { verticalOffset, horizontalOffset } = sortableHelper.getOffset(clientRect, clientOffset, clientInnerSize);
        const { verticalDirection, horizontalDirection } = sortableHelper.getDirection(clientOffset, directionRef);

        let position = `on-${verticalOffset}`;
        let direction = verticalDirection;

        if (clientDisplay === 'row') {
          position = `on-${horizontalOffset}`;
          direction = horizontalDirection;
        }

        const offset = `${position} ${direction}`;

        if (item.id == dragItem.parentId) return;

        if (!dragRef.current.classList.contains('is-transitioning')) {

          dragRef.current.classList.add('is-transitioning');

          // const dragElement = ref.doms[`${dragItem.id}`];
          // const dropElement = dragRef.current;

          // if (dragElement && dropElement) {
          //   const boundingRect = dragElement.getBoundingClientRect();
          //   const height = boundingRect.height;

          //   if (direction === 'down') {
          //     ref.translate.y += height;

          //     console.log(ref.translate.y);

          //     dragElement.style.transform = `translate(0px, ${ref.translate.y}px)`;
          //     dropElement.style.transform = `translate(0px, -${height}px)`;

          //   } else if (direction === 'up') {
          //     ref.translate.y -= height;

          //     console.log(ref.translate.y);

          //     dragElement.style.transform = `translate(0px, ${ref.translate.y}px)`;
          //     dropElement.style.transform = `translate(0px, 0px)`;
          //   }
          // }

          const handleTransitionEnd = () => {
            if (dragRef.current) {
              dragRef.current.classList.remove('is-transitioning');
              dragRef.current.removeEventListener('transitionend', handleTransitionEnd);
            }
          };

          dragRef.current.addEventListener('transitionend', handleTransitionEnd, { once: true });
        }

        // set offset
        if (ref.offset === offset) return;
        ref.offset = offset;









        console.log('dragOver', offset);
      }
    }
  }, [item]);

  const [, drag] = useDrag(() => ({
    type: group,
    item,
    canDrag: handleDragStart,
    end: handleDragEnd,
  }), [item]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['block', 'field'],
    canDrop: () => ref.canDrop,
    hover: handleDragOver,
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true })
    })
  }), [item]);

  useEffect(() => {
    if (!isOver && dragRef.current) {
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