import { useCallback, useEffect, useRef } from "react";
import { SortableContextValue } from "../sortable.provider";
import { Field } from "../types";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { sortableHelper } from "../helpers";
import { filterArrayRangeExclusingStart } from "../../../utils";

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

export const useSortable = ({ item, ctx, siblings = [] }: Params) => {
  const { ref } = ctx;
  const { id, group } = item;
  const dragRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef<XYDirection>(defaultDirection);

  const handleDragStart = useCallback(() => {
    if (id === 'sortable-area') return false;

    console.log('DRAG TYPE');

    return true;
  }, [id]);

  const handleDragEnd = useCallback(() => {
    console.log('dragEnd', ref);
  }, [ref]);

  const handleDragOver = useCallback((dragItem: Field, monitor: DropTargetMonitor<Field>) => {
    if (!monitor.isOver({ shallow: true })) return;

    if (!dragRef.current || dragItem.id === item.id) {
      sortableHelper.resetDrop(ref);
      return;
    }

    const { drop, cordinate } = ref;

    if (drop?.id !== item.id) {
      sortableHelper.setDrop(ref, item);
    }

    const clientOffset = monitor.getClientOffset();
    const sameCoordinates = cordinate.x === clientOffset?.x && cordinate.y === clientOffset?.y;

    if (!clientOffset || !ref.canDrop || sameCoordinates) return;

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

    if (!direction || direction === 'no-movement') {
      direction = position === 'on-top' ? 'down' : 'up';
    }

    if (ref.offset === position) return;
    ref.offset = position;

    const itemToList = (dragItem.group + '-' + item.group) == 'field-list';
    const listToField = (dragItem.group + '-' + item.group) == 'list-field';

    const dragElement = ref.doms[`${dragItem.id}`];
    const dropElement = dragRef.current;
    const parentElement = dropElement.parentNode;

    if (!parentElement || !dragElement || itemToList || listToField) return;

    if (parentElement.contains(dragElement)) {
      if (ref.parentNode !== parentElement) {
        ref.parentNode = parentElement;
      }

      if (dragElement && dropElement) {
        const elements = Array.from(parentElement.children) as HTMLElement[];
        const fromIndex = elements.indexOf(dragElement);
        const toIndex = elements.indexOf(dropElement);

        const translateY = elements[toIndex].offsetHeight;
        const translateIndices: number[] = [];

        if (fromIndex < toIndex) {
          for (let i = fromIndex + 1; i <= toIndex; i++) {
            translateIndices.push(i);
          }
        } else {
          for (let i = fromIndex - 1; i >= toIndex; i--) {
            translateIndices.push(i);
          }
        }


        elements.forEach((element, index) => {
          if (index === fromIndex) {
            const translateYValue = fromIndex < toIndex ? translateY : -translateY;
            if (direction === 'up') {
              element.style.transform = `translateY(-${translateYValue}px)`;
            } else {
              element.style.transform = `translateY(${translateYValue}px)`;
            }
            console.log('fromIndex', translateYValue);
          } else if (translateIndices.includes(index)) {
            const translateYValue = fromIndex < toIndex ? -elements[index - 1].offsetHeight : elements[index + 1].offsetHeight;
            if (direction === 'up') {
              element.style.transform = `translateY(-${translateYValue}px)`;
            } else {
              element.style.transform = `translateY(${translateYValue}px)`;
            }
            console.log('translateIndices', translateYValue);
          } else if (index === toIndex) {
            const translateYValue = direction === 'up' ? elements[index - 1].offsetHeight : -elements[index + 1].offsetHeight;
            element.style.transform = `translateY(${translateYValue}px)`;
            console.log('toIndex', translateYValue);
          } else {
            console.log('else');
            element.style.transform = `translateY(0)`;
          }
        });

        /*  elements.forEach((element, index) => {
           if (index === fromIndex) {
             const translateYValue = fromIndex < toIndex ? translateY : -translateY;
             if (direction === 'up') {
               element.style.transform = `translateY(-${translateYValue}px)`;
             } else {
               element.style.transform = `translateY(${translateYValue}px)`;
             }
           } else if (translateIndices.includes(index)) {
             const translateYValue = fromIndex < toIndex ? -elements[index - 1].offsetHeight : elements[index + 1].offsetHeight;
             if (direction === 'up') {
               element.style.transform = `translateY(-${translateYValue}px)`;
             } else {
               element.style.transform = `translateY(${translateYValue}px)`;
             }
           } else if (index === toIndex) {
             element.style.transform = `translateY(0)`;
           } else {
             element.style.transform = `translateY(0)`;
           }
         }); */

        /* const newElements = elements.map((element, index) => {
          if (index === fromIndex) {
            const translateYValue = fromIndex < toIndex ? translateY : -translateY;
            //element.style.transform = `translateY(${translateYValue}px)`;
            return { id: element.id, translateYValue }
          } else if (translateIndices.includes(index)) {
            const translateYValue = fromIndex < toIndex ? -elements[index - 1].offsetHeight : elements[index + 1].offsetHeight;
            return { id: element.id, translateYValue }
            //element.style.transform = `translateY(${translateYValue}px)`;
          } else {
            //element.style.transform = `translateY(0)`;
            return { id: element.id, translateYValue: 0 }
          }
          //return element;
          return { id: element.id, translateYValue: null }
        });

        console.log('CALCULATE', newElements); */
      }
    }

    /* if (parentElement.contains(dragElement)) {

      if (ref.parentNode !== parentElement) {
        ref.parentNode = parentElement;
      }

      if (dragElement && dropElement) {
        const dragIndex = Array.from(parentElement.children).indexOf(dragElement);
        const dropIndex = Array.from(parentElement.children).indexOf(dropElement);

        const dragRect = dragElement.getBoundingClientRect();
        const dragHeight = Math.round(dragRect.height);
        const dropRect = dropElement.getBoundingClientRect();
        const dropHeight = Math.round(dropRect.height);

        if (dragHeight > dropHeight) {
          //
        } else if (dragHeight < dropHeight) {
          //
        } else {
          //
        }

        const index = dragIndex - dropIndex;
        const tranlateY = index * dragHeight;

        let translateDrag = tranlateY;
        let translateDrop = 0;

        ref.translate.y = tranlateY;
        ref.direction = direction;

        if (index > 0) {
          translateDrag = direction === 'up' ? -tranlateY : -tranlateY + dragHeight;
          translateDrop = direction === 'up' ? dropHeight : 0;
        }

        if (index < 0) {
          translateDrag = direction === 'down' ? -tranlateY : -tranlateY - dragHeight;
          translateDrop = direction === 'down' ? -dropHeight : 0;
        }

        dragElement.style.transform = `translate(0px, ${translateDrag}px)`;
        dropElement.style.transform = `translate(0px, ${translateDrop}px)`;
      }
    } else {
      if (ref.parentNode) {
        Array.from(ref.parentNode.children).forEach(childElement => {
          childElement.removeAttribute('style');
        });
      }

      if (ref.parentNode !== parentElement) {
        ref.parentNode = parentElement;
      }

      ref.parentNode = dropElement.parentNode;

      if (dragElement && dropElement) {
        parentElement.insertBefore(dragElement, dropElement);
      }
    } */


  }, [item, ref]);


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
    accept: ['list', 'field'],
    canDrop: () => ref.canDrop,
    hover: handleDragOver,
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true })
    })
  }), [item]);

  useEffect(() => {
    if (!isOver && dragRef.current) {
      directionRef.current = { ...defaultDirection };
    }
  }, [isOver, dragRef, ref.hasChild]);


  useEffect(() => {
    ref.doms[`${id}`] = dragRef.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
export const useSortable = ({ item, ctx, siblings = [] }: Params) => {
  const { ref } = ctx;
  const { id, group } = item;
  const dragRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef<XYDirection>(defaultDirection);

  const handleDragStart = useCallback(() => {
    if (id === 'sortable-area') return false;

    // const dragElement = ref.doms[`${item.id}`];
    // if(dragElement) {
    //   const rangeIds = filterArrayRangeExclusingStart(siblings, `${item.id}`, `${siblings[siblings.length - 1]}`);
    //   const boundingRect = dragElement.getBoundingClientRect();
    //   const tranlateY = Math.round(boundingRect.height);
    //   sortableHelper.setTranslateY(ref?.doms, rangeIds, tranlateY);
    // }

    console.log('DRAG TYPE');

    return true;
  }, [id]);

  const handleDragEnd = useCallback(() => {
    console.log('dragEnd', ref);
  }, [ref]);

  const handleDragOver = useCallback((dragItem: Field, monitor: DropTargetMonitor<Field>) => {
    if (monitor.isOver({ shallow: true })) {

      if (!dragRef.current) return;

      if (dragItem.id == item.id) {
        if (ref.canDrop) {
          //ref.drop = null;
          ref.offset = null;
          ref.canDrop = false;
          console.log('reset-drop');
        }
        return;
      }

      // todo
      if (item.group == 'list') return;

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

        const offset = `${position}`;

        if (ref.offset === offset) return;
        ref.offset = offset;

        // if (ref.isTransitioning) return;
        // ref.isTransitioning = true;

        const dragElement = ref.doms[`${dragItem.id}`];
        const dropElement = dragRef.current;
        const parentElement = dropElement.parentNode;

        if (parentElement) {

          if (parentElement.contains(dragElement)) {
            ref.hasChild = true;

            if (ref.parentNode !== parentElement) {
              ref.parentNode = parentElement;
            }

            if (dragElement && dropElement) {
              const boundingRect = dragElement.getBoundingClientRect();
              const elementHeight = Math.round(boundingRect.height);

              //const dragIndex = dragItem.position || 0;
              //const dropIndex = item.position || 0;
              const dragIndex = Array.from(parentElement.children).indexOf(dragElement);
              const dropIndex = Array.from(parentElement.children).indexOf(dropElement);
              const index = dragIndex - dropIndex;

              const tranlateY = index * elementHeight;
              //const rangeIds = filterArrayRangeExclusingStart(siblings, `${dragItem.id}`, `${item.id}`);
              let translateDrag = tranlateY;
              let translateDrop = 0;

              //if(ref.translate.y === tranlateY && ref.direction) return;
              ref.translate.y = tranlateY;
              ref.direction = direction;

              if (index > 0) {
                translateDrag = direction === 'up' ? -tranlateY : -tranlateY + elementHeight;
                translateDrop = direction === 'up' ? elementHeight : 0;
              }

              if (index < 0) {
                translateDrag = direction === 'down' ? -tranlateY : -tranlateY - elementHeight;
                translateDrop = direction === 'down' ? -elementHeight : 0;
              }

              dragElement.style.transform = `translate(0px, ${translateDrag}px)`;
              dropElement.style.transform = `translate(0px, ${translateDrop}px)`;

              //sortableHelper.setTranslateY(ref.doms, rangeIds, translateDrop);

              // ref.touched[`${id}`] = translateDrop;

              // const sum = Object.values(ref.touched).reduce((acc, curr) => acc + curr, 0);

              // if (ref.translate.y === sum) {

              // } else {
              //   console.log('MESSUP', ref.touched, ref.translate, sum);
              //   sortableHelper.setTranslateY(ref.doms, rangeIds, translateDrop);
              // } 

            }
            console.log('Parent element has child element.');
          } else {

            if (ref.parentNode) {
              Array.from(ref.parentNode.children).forEach(childElement => {
                childElement.removeAttribute('style');
              });
            }

            if (ref.parentNode !== parentElement) {
              ref.parentNode = parentElement;
            }

            ref.hasChild = false;
            ref.parentNode = dropElement.parentNode;
            if (dragElement && dropElement) {
              parentElement.insertBefore(dragElement, dropElement);
            }
            console.log('Parent element does not have child element.');
          }
        }

        const dragElement = ref.doms[`${dragItem.id}`];
        const dropElement = dragRef.current;
        const dragIndex = dragItem.position || 0;
        const dropIndex = item.position || 0;
        const index = dragIndex - dropIndex;
        const rangeIds = filterArrayRangeExclusingStart(siblings, `${dragItem.id}`, `${item.id}`);

        if (dragElement && dropElement) {
          const boundingRect = dragElement.getBoundingClientRect();
          const elementHeight = Math.round(boundingRect.height);
          let translateDrag = index * elementHeight;
          let translateDrop = 0;

          if (index > 0) {
            translateDrag = -translateDrag;
            translateDrop = elementHeight;

            if (direction === 'down') {
              translateDrag += elementHeight;
              translateDrop = 0;
            }
          }

          if (index < 0) {
            translateDrag = -translateDrag;
            translateDrop = -elementHeight;

            if (direction === 'up') {
              translateDrag -= elementHeight;
              translateDrop = 0;
            }
          }

          if(ref.translate.y === translateDrag) return;

          console.log('INDEX', translateDrag, item.id);

          ref.translate.y = translateDrag;
          ref.touched[`${id}`] = translateDrop;

          const sum = Object.values(ref.touched).reduce((acc, curr) => acc + curr, 0);

          if (ref.translate.y + sum == 0) {
            dragElement.style.transform = `translate(0px, ${translateDrag}px)`;
            dropElement.style.transform = `translate(0px, ${translateDrop}px)`;
          } else {
            console.log('MESSUP');
            sortableHelper.setTranslateY(ref.doms, rangeIds, translateDrop);
          } 

          // const handleTransitionEnd = () => {
          //   console.log('TRANSITION END');
          //   ref.isTransitioning = false;
          //   dropElement.removeEventListener('transitionend', handleTransitionEnd);
          // };

          // dropElement.addEventListener('transitionend', handleTransitionEnd);
        }
      }
    }
  }, [item, ref]);

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
    accept: ['list', 'field'],
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

      //console.log('dragOut', ref.touched);

    }
  }, [isOver, dragRef, ref.hasChild]);


  useEffect(() => {
    ref.doms[`${id}`] = dragRef.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ref: dragRef,
    drag,
    drop,
    isOver,
    isDragging
  }
}
*/
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