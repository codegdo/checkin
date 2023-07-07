import { useCallback, useEffect, useRef } from "react";
import { SortableContextValue } from "../sortable.provider";
import { Field } from "../types";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { sortableHelper } from "../helpers";

interface Params {
  item: Field;
  ctx: SortableContextValue;
  siblings?: string[];
}

export interface XYDirection {
  x: number | null;
  currentX: number | null;
  y: number | null;
  currentY: number | null;
}

const defaultDirection = {
  x: null,
  currentX: null,
  y: null,
  currentY: null
};

export const useSortable = ({ item, ctx, siblings }: Params) => {
  const { ref } = ctx;
  const { id, group } = item;
  const dragRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef<XYDirection>(defaultDirection);

  const handleDragStart = useCallback(() => {
    if (id === 'sortable-area') return false;
    console.log('DRAG TYPE', dragRef.current, siblings);
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

      if (ref.drop?.id !== item.id && !ref.isTransitioning) {
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

        if (direction === undefined || direction === 'no-movement') {
          direction = position === 'on-top' ? 'down' : 'up';
        }

        const offset = `${position} ${direction}`;

        //if (ref.offset === offset) return;
        ref.offset = offset;

        // if (ref.isTransitioning) return;
        // ref.isTransitioning = true;

        // todo
        if (item.group == 'area' || item.group == 'block') return;

        const dragElement = ref.doms[`${dragItem.id}`];
        const dropElement = dragRef.current;
        const dragIndex = dragItem.position || 0;
        const dropIndex = item.position || 0;
        const index = dragIndex - dropIndex;

        if (dragElement && dropElement) {
          const boundingRect = dragElement.getBoundingClientRect();
          const elementHeight = Math.round(boundingRect.height);
          let translateDrag = index * elementHeight;
          let translateDrop = 0;

          if (index > 0) {
            translateDrag = -translateDrag;
            translateDrop = elementHeight;
            //ref.translate.y += elementHeight;
            //ref.touched.push(elementHeight);

            if (direction === 'down') {
              translateDrag += elementHeight;
              //ref.translate.y -= elementHeight;
              //ref.touched.push(-elementHeight);
              translateDrop = 0;
            }
          }

          if (index < 0) {
            translateDrag = -translateDrag;
            translateDrop = -elementHeight;
            //ref.translate.y -= elementHeight;
            //ref.touched.push(-elementHeight);

            if (direction === 'up') {
              translateDrag -= elementHeight;
              //ref.translate.y += elementHeight;
              //ref.touched.push(elementHeight);
              translateDrop = 0;
            }
          }

          console.log('INDEX', translateDrag);

          ref.translate.y = translateDrag;
          ref.touched[`${id}`] = translateDrop;
          //ref.touched.push(translateDrop);

          const sum = Object.values(ref.touched).reduce((acc, curr) => acc + curr, 0);

          if (ref.translate.y + sum == 0) {
            dragElement.style.transform = `translate(0px, ${translateDrag}px)`;
            dropElement.style.transform = `translate(0px, ${translateDrop}px)`;
          }

          //dropElement.setAttribute('data-translate', `${translateDrop}`);

          // const handleTransitionEnd = () => {
          //   console.log('TRANSITION END');
          //   ref.isTransitioning = false;
          //   dropElement.removeEventListener('transitionend', handleTransitionEnd);
          // };

          // dropElement.addEventListener('transitionend', handleTransitionEnd);
        }
      }
    }
  }, [item]);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: group,
    item,
    canDrag: handleDragStart,
    end: handleDragEnd,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
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

      directionRef.current = { ...defaultDirection };

      // const sum = Object.values(ref.touched).reduce((acc, curr) => acc + curr, 0);

      // if (ref.translate.y + sum !== 0) {
      //   //dragRef.current.removeAttribute('style');
      //   siblings?.forEach(function (id) {
      //     const element = ref.doms[id];

      //     if (element) {
      //       element.removeAttribute('style');
      //     }
      //   });
      // }



      // let translateY = 0;

      // siblings?.forEach(function (id) {
      //   const element = ref.doms[id];

      //   if (element) {
      //     const translateValue = element.getAttribute('data-translate');
      //     const numericValue = translateValue !== null ? parseFloat(translateValue) : 0;
      //     translateY += numericValue;
      //   }

      // });

      // if ((translateY + ref.translate.y) !== 0) {
      //   dragRef.current.removeAttribute('style');
      // }

      console.log('dragOut', ref.touched);

    }
  }, [isOver, dragRef]);

  useEffect(() => {
    ref.doms[`${id}`] = dragRef.current;
  }, []);

  return {
    ref: dragRef,
    drag,
    drop,
    isOver,
    isDragging
  }
}


/*

siblings?.forEach(function (id) {
        //console.log(id);
        //target.removeAttribute('style');
        const element = ref.doms[id];
        if (element) {
          const tranlateY = sortableHelper.getTranslateY(element);
          console.log('tranlateY', tranlateY);
        }

      });

      //console.log(ref.doms)

      // if (Array.isArray(ref.doms)) {
      //   console.log(ref.doms)
      //   ref.doms.forEach(function (element) {
      //     //target.removeAttribute('style');
      //     const tranlateY = sortableHelper.getTranslateY(element);
      //     console.log('tranlateY', tranlateY);
      //   });
      // }


      if (ref.translate.y) {
        //console.log('dragOut', sortableHelper.getTranslateY(dragRef.current));
        if (Array.isArray(ref.doms)) {
          ref.doms.forEach(function (element) {
            //target.removeAttribute('style');
            const tranlateY = sortableHelper.getTranslateY(element);
            console.log('tranlateY', tranlateY);
          });
        }

        // //dragRef.current.removeAttribute('style');
        // console.log('dragOut', dragRef.current);
      }
      // if (ref.isTransitioning) {
      //   console.log('dragOut', ref.isTransitioning);
      //   ref.isTransitioning = false;
      // }


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

        if (direction === undefined || direction === 'no-movement') {
          direction = position === 'on-top' ? 'down' : 'up';
        }

        const offset = `${position} ${direction}`;

        // todo
        if (item.group == 'area' || item.group == 'block') return;

        const dragElement = ref.doms[`${dragItem.id}`];
        const dropElement = dragRef.current;
        const dragIndex = dragItem.position || 0;
        const dropIndex = item.position || 0;
        const index = dragIndex - dropIndex;

        if (dragElement && dropElement) {
          const boundingRect = dragElement.getBoundingClientRect();
          const elementHeight = boundingRect.height;
          let translateDrag = index * elementHeight;
          let translateDrop = 0;

          if (index > 0) {
            translateDrag = -(translateDrag);
            translateDrop = elementHeight;

            if (direction === 'down') {
              translateDrag += elementHeight;
              translateDrop = 0;
            }
          }

          if (index < 0) {
            translateDrag = -(translateDrag);
            translateDrop = -(elementHeight);

            if (direction === 'up') {
              translateDrag -= elementHeight;
              translateDrop = 0;
            }
          }

          dragElement.style.transform = `translate(0px, ${translateDrag}px)`;
          dropElement.style.transform = `translate(0px, ${translateDrop}px)`;
        }

        // if (!dragRef.current.classList.contains('is-transitioning')) {

        //   dragRef.current.classList.add('is-transitioning');

        //   //console.log('DIRECTION', direction, clientOffset, directionRef);

        //   const handleTransitionEnd = () => {
        //     if (dragRef.current) {
        //       dragRef.current.classList.remove('is-transitioning');
        //       dragRef.current.removeEventListener('transitionend', handleTransitionEnd);
        //     }
        //   };

        //   dragRef.current.addEventListener('transitionend', handleTransitionEnd, { once: true });
        // }

        // set offset
        //if (ref.offset === offset) return;
        //ref.offset = offset;

        if (ref.offset?.includes(position)) return;
        ref.offset = offset;

        console.log('dragOver', offset);
      }
    }
  }, [item]);
*/