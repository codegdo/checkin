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
  const previewRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef<XYDirection>(defaultDirection);

  const handleItemToList = (dragElement: HTMLElement, dragItem:Field, position: string) => {
    const currentParent = dragRef.current;
    if (!currentParent || !currentParent.classList.contains('sortable-holder')) return;
    const hasDragElement = Array.from(currentParent.children).some(element => element.id == dragItem.id);

    if (!hasDragElement) {
      if (position === 'on-top') {
        currentParent.prepend(dragElement);
      } else {
        currentParent.appendChild(dragElement);
      }

      animateTransition(dragElement, position === 'on-top' ? -100 : 100, 0);

      if (ref.parentNode) {
        Array.from(ref.parentNode.children).forEach(childElement => {
          childElement.removeAttribute('style');
        });
      }
    }

    ref.parentNode = currentParent;
  };

  const handleInsertDragElement = (dragElement: HTMLElement, dropElement: HTMLElement, parentElement: ParentNode, position: string) => {
    if (position === 'on-top') {
      parentElement.insertBefore(dragElement, dropElement);
    } else {
      parentElement.insertBefore(dragElement, dropElement.nextSibling);
    }

    animateTransition(dragElement, position === 'on-top' ? -100 : 100, 0);

    if (ref.parentNode) {
      Array.from(ref.parentNode.children).forEach(childElement => {
        childElement.removeAttribute('style');
      });
    }

    ref.parentNode = parentElement;
  };

  const handleTranslateDownFromTop = (elements: HTMLElement[], dragElement: HTMLElement, translateYDrop: number, translateYDrag: number) => {
    elements.forEach(element => {
      element.style.transform = `translateY(-${translateYDrop}px)`;
    });
    dragElement.style.transform = `translateY(${translateYDrag}px)`;
  };

  const handleTranslateUpFromTop = (elements: HTMLElement[], toIndex: number, dragElement: HTMLElement, translateYDrag: number) => {
    elements.slice(toIndex).filter(element => element.style.transform !== '').forEach(element => {
      const translateYDragValue = translateYDrag - element.offsetHeight;
      if (translateYDragValue === 0) {
        dragElement.removeAttribute('style');
      } else {
        dragElement.style.transform = `translateY(${translateYDragValue}px)`;
      }
      element.removeAttribute('style');
    });
  };

  const handleTranslateUpFromBottom = (elements: HTMLElement[], dragElement: HTMLElement, translateYDrop: number, translateYDrag: number) => {
    elements.forEach(element => {
      element.style.transform = `translateY(${translateYDrop}px)`;
    });
    dragElement.style.transform = `translateY(${translateYDrag}px)`;
  };

  const handleTranslateDownFromBottom = (elements: HTMLElement[], toIndex: number, dragElement: HTMLElement, translateYDrag: number) => {
    elements.slice(0, toIndex + 1).filter(element => element.style.transform !== '').forEach(element => {
      const translateYDragValue = translateYDrag + element.offsetHeight;
      if (translateYDragValue === 0) {
        dragElement.removeAttribute('style');
      } else {
        dragElement.style.transform = `translateY(${translateYDragValue}px)`;
      }
      element.removeAttribute('style');
    });
  };

  const animateTransition = (element: HTMLElement, translateYStart: number, translateYEnd: number) => {
    element.style.opacity = '0';
    element.style.transform = `translateY(${translateYStart}%)`;

    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = `translateY(${translateYEnd}%)`;
    }, 0);
  };


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

    const listToArea = `${dragItem.group}-${item.group}` === 'list-area';
    const listToList = `${dragItem.group}-${item.group}` === 'list-list';
    const itemToList = `${dragItem.group}-${item.group}` === 'item-list';
    const listToItem = `${dragItem.group}-${item.group}` === 'list-item';

    const dragElement = ref.doms[String(dragItem.id)];

    if (!dragElement) return;

    if (listToArea || listToList || listToItem) return;

    if (itemToList) {
      handleItemToList(dragElement, dragItem, position);
      return;
    }

    const dropElement = dragRef.current;
    const parentElement = dropElement.parentNode;

    if (!parentElement) return;

    const elements = Array.from(parentElement.children) as HTMLElement[];
    const hasDragElement = elements.some(element => element.id == dragItem.id);

    if (!hasDragElement) {
      handleInsertDragElement(dragElement, dropElement, parentElement, position);
      return;
    }

    const fromIndex = elements.indexOf(dragElement);
    const toIndex = elements.indexOf(dropElement);
    const translateYDrop = elements[fromIndex]?.offsetHeight || 0;
    let translateYDrag = 0;

    const translateElements = fromIndex < toIndex
      ? elements.slice(fromIndex + 1, toIndex + 1)
      : elements.slice(toIndex, fromIndex);

    translateElements.forEach(element => {
      fromIndex < toIndex
        ? translateYDrag += element.offsetHeight
        : translateYDrag -= element.offsetHeight;
    });

    if (fromIndex < toIndex) {
      if (direction === 'down') {
        handleTranslateDownFromTop(translateElements, dragElement, translateYDrop, translateYDrag);
      } else {
        handleTranslateUpFromTop(elements, toIndex, dragElement, translateYDrag);
      }
    } else {
      if (direction === 'up') {
        handleTranslateUpFromBottom(translateElements, dragElement, translateYDrop, translateYDrag);
      } else {
        handleTranslateDownFromBottom(elements, toIndex, dragElement, translateYDrag);
      }
    }
  }, [item]);

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: group,
    item,
    canDrag: handleDragStart,
    end: handleDragEnd,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }), [item]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['list', 'item'],
    canDrop: () => ref.canDrop,
    hover: handleDragOver,
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true })
    })
  }), [item]);

  useEffect(() => {
    if (!isOver) {
      directionRef.current = { ...defaultDirection };
    }
  }, [isOver, directionRef]);


  useEffect(() => {
    ref.doms[`${id}`] = dragRef.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ref: dragRef,
    previewRef,
    drag,
    drop,
    preview,
    isOver,
    isDragging
  }
}

/*
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

    const listToArea = `${dragItem.group}-${item.group}` === 'list-area';
    const listToList = `${dragItem.group}-${item.group}` === 'list-list';
    const itemToList = `${dragItem.group}-${item.group}` === 'item-list';
    const listToItem = `${dragItem.group}-${item.group}` === 'list-item';

    const dragElement = ref.doms[`${dragItem.id}`];

    if (!dragElement) return;

    if (listToArea) return;

    if (listToList) return;

    if (listToItem) return;

    if (itemToList) {
      const currentParent = dragRef.current;
      if (!currentParent.classList.contains('sortable-holder')) return;
      const hasDragElement = Array.from(currentParent.children).some(element => element.id == dragItem.id);

      if (!hasDragElement) {
        console.log('itemToList', currentParent);
        if (position === 'on-top') {
          currentParent.prepend(dragElement);
          // Animate the transition
          // dragElement.style.opacity = '0';
          // dragElement.style.transform = 'translateY(100%)';

          // setTimeout(() => {
          //   dragElement.style.opacity = '1';
          //   dragElement.style.transform = 'translateY(0)';
          // }, 0);
        } else {
          currentParent.appendChild(dragElement);

          // Animate the transition
          // dragElement.style.opacity = '0';
          // dragElement.style.transform = 'translateY(-100%)';

          // setTimeout(() => {
          //   dragElement.style.opacity = '1';
          //   dragElement.style.transform = 'translateY(0)';
          // }, 0);
        }

        if (ref.parentNode) {
          Array.from(ref.parentNode.children).forEach(childElement => {
            childElement.removeAttribute('style');
          });
        }
        dragElement.removeAttribute('style');
      }

      ref.parentNode = currentParent;
      return;
    }

    const dropElement = dragRef.current;
    const parentElement = (itemToList ? dropElement : dropElement.parentNode) as HTMLElement;

    if (!parentElement || !parentElement.classList.contains('sortable-holder')) return;

    const elements = Array.from(parentElement.children) as HTMLElement[];
    const hasDragElement = elements.some(element => element.id == dragItem.id);

    if (!hasDragElement) {
      if (position === 'on-top') {
        parentElement.insertBefore(dragElement, dropElement);
      } else {
        if (parentElement.lastChild === dropElement) {
          parentElement.appendChild(dragElement);
        } else {
          parentElement.insertBefore(dragElement, dropElement.nextSibling);
        }
      }

      if (ref.parentNode) {
        Array.from(ref.parentNode.children).forEach(childElement => {
          childElement.removeAttribute('style');
        });
      }

      dragElement.removeAttribute('style');
      ref.parentNode = parentElement;
      console.log('hasDragElement');
      return;
    }

    const fromIndex = elements.indexOf(dragElement);
    const toIndex = elements.indexOf(dropElement);
    const translateYDrop = elements[fromIndex]?.offsetHeight || 0;
    let translateYDrag = 0;

    const translateElements = fromIndex < toIndex
      ? elements.slice(fromIndex + 1, toIndex + 1)
      : elements.slice(toIndex, fromIndex);

    translateElements.forEach(element => {
      fromIndex < toIndex
        ? translateYDrag += element.offsetHeight
        : translateYDrag -= element.offsetHeight;
    });

    if (fromIndex < toIndex) {
      if (direction === 'down') {
        translateElements.forEach(element => {
          element.style.transform = `translateY(-${translateYDrop}px)`;
        });
        dragElement.style.transform = `translateY(${translateYDrag}px)`;
      } else {
        elements.slice(toIndex).filter(element => element.style.transform !== '').forEach(element => {
          const translateYDragValue = translateYDrag - element.offsetHeight;
          if (translateYDragValue === 0) {
            dragElement.removeAttribute('style');
          } else {
            dragElement.style.transform = `translateY(${translateYDragValue}px)`;
          }
          element.removeAttribute('style');
        });
      }
    } else {
      if (direction === 'up') {
        translateElements.forEach(element => {
          element.style.transform = `translateY(${translateYDrop}px)`;
        });
        dragElement.style.transform = `translateY(${translateYDrag}px)`;
      } else {
        elements.slice(0, toIndex + 1).filter(element => element.style.transform !== '').forEach(element => {
          const translateYDragValue = translateYDrag + element.offsetHeight;
          if (translateYDragValue === 0) {
            dragElement.removeAttribute('style');
          } else {
            dragElement.style.transform = `translateY(${translateYDragValue}px)`;
          }
          element.removeAttribute('style');
        });
      }
    }

  }, [item]);
*/

/*
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

    const offset = `${position} ${direction}`

    if (ref.offset === offset) return;
    ref.offset = offset;

    const itemToList = (dragItem.group + '-' + item.group) == 'field-list';
    const listToField = (dragItem.group + '-' + item.group) == 'list-field';

    const dropElement = dragRef.current;
    const parentElement = dropElement.parentNode;

    if (!parentElement || itemToList || listToField) return;

    const elements = Array.from(parentElement.children) as HTMLElement[];
    const dragElement = elements.find(element => element.id == dragItem.id);

    if (dragElement) {

      const fromIndex = elements.indexOf(dragElement);
      const toIndex = elements.indexOf(dropElement);
      const translateYDrop = elements[fromIndex].offsetHeight;
      let translateYDrag = 0;

      // const translateElements = elements.filter((element, index) => {
      //   if (fromIndex < toIndex) {
      //     if (index > fromIndex && index <= toIndex) {
      //       translateYDrag += element.offsetHeight;
      //       return true;
      //     }
      //   } else {
      //     if (index < fromIndex && index >= toIndex) {
      //       translateYDrag -= element.offsetHeight;
      //       return true;
      //     }
      //   }
      // });

      if (fromIndex < toIndex) {
        const translateElements = elements.slice(fromIndex + 1, toIndex + 1);
        
        translateElements.forEach(element => {
          translateYDrag += element.offsetHeight;
        });

        // const translateElements = elements.filter((element, index) => {
        //   if (index > fromIndex && index <= toIndex) {
        //     translateYDrag += element.offsetHeight;
        //     return true;
        //   }
        // });

        if (direction === 'down') {
          translateElements.forEach(element => {
            element.style.transform = `translateY(-${translateYDrop}px)`;
          });
          dragElement.style.transform = `translateY(${translateYDrag}px)`;

        } else {

          elements.slice(toIndex).filter(element => (element.style.transform !== '')).forEach((element) => {
            const translateYDragValue = translateYDrag - element.offsetHeight;
            if (translateYDragValue === 0) {
              dragElement.removeAttribute('style');
            } else {
              dragElement.style.transform = `translateY(${translateYDragValue}px)`;
            }
            element.removeAttribute('style');
          });

          // console.log(test, test1);

          // elements.forEach((element, index) => {
          //   if (index >= toIndex && element.style.transform !== '') {
          //     const translateYDragValue = translateYDrag - element.offsetHeight;
          //     if (translateYDragValue === 0) {
          //       dragElement.removeAttribute('style');
          //     } else {
          //       dragElement.style.transform = `translateY(${translateYDragValue}px)`;
          //     }
          //     element.removeAttribute('style');
          //     console.log(element);
          //   }
          // });
        }
      } else {
        const translateElements = elements.slice(toIndex, fromIndex);
        
        translateElements.forEach(element => {
          translateYDrag -= element.offsetHeight;
        });


        if (direction === 'up') {
          translateElements.forEach(element => {
            element.style.transform = `translateY(${translateYDrop}px)`;
          });
          dragElement.style.transform = `translateY(${translateYDrag}px)`;
        } else {

          elements.slice(0, toIndex + 1).filter(element => (element.style.transform !== '')).forEach((element) => {
            const translateYDragValue = translateYDrag + element.offsetHeight;
            if (translateYDragValue === 0) {
              dragElement.removeAttribute('style');
            } else {
              dragElement.style.transform = `translateY(${translateYDragValue}px)`;
            }
            element.removeAttribute('style');
          });
          // elements.forEach((element, index) => {
          //   if (index <= toIndex && element.style.transform !== '') {
          //     const translateYDragValue = translateYDrag + element.offsetHeight;
          //     if (translateYDragValue === 0) {
          //       dragElement.removeAttribute('style');
          //     } else {
          //       dragElement.style.transform = `translateY(${translateYDragValue}px)`;
          //     }
          //     element.removeAttribute('style');
          //   }
          // });
        }
      }

      if (ref.dropElement !== dropElement) {
        //ref.dropElement?.removeAttribute('style');
        // const handleTransitionEnd = () => {
        //   ref.dropElement?.removeAttribute('style');
        //   ref.dropElement?.removeEventListener('transitionend', handleTransitionEnd);
        // };

        // ref.dropElement?.addEventListener('transitionend', handleTransitionEnd, { once: true });
        ref.dropElement = dropElement;
      }

    }

  }, [item, ref]);
*/

/*
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

  const offset = `${position} ${direction}`;

  if (ref.offset === offset) return;
  ref.offset = offset;

  const itemToList = `${dragItem.group}-${item.group}` === 'field-list';
  const listToField = `${dragItem.group}-${item.group}` === 'list-field';

  const dropElement = dragRef.current;
  const parentElement = dropElement.parentNode;

  if (!parentElement || itemToList || listToField) return;

  const elements = Array.from(parentElement.children) as HTMLElement[];
  const dragElement = elements.find(element => element.id === dragItem.id);

  if (!dragElement) return;

  const fromIndex = elements.indexOf(dragElement);
  const toIndex = elements.indexOf(dropElement);
  const translateYDrop = elements[fromIndex].offsetHeight;

  let translateYDrag = 0;
  let translateElements: HTMLElement[] = [];

  if (fromIndex < toIndex) {
    translateElements = elements.slice(fromIndex + 1, toIndex + 1);
    if (direction === 'down') {
      translateElements.forEach(element => {
        translateYDrag += element.offsetHeight;
        element.style.transform = `translateY(-${translateYDrop}px)`;
      });
    } else {
      elements.slice(toIndex).forEach(element => {
        if (element.style.transform && element.style.transform.includes('translate')) {
          translateYDrag -= element.offsetHeight;
          element.style.transform = '';
        }
      });
      if (translateYDrag !== 0) {
        dragElement.style.transform = `translateY(${translateYDrag}px)`;
      } else {
        dragElement.removeAttribute('style');
      }
    }
  } else {
    translateElements = elements.slice(toIndex, fromIndex);
    if (direction === 'up') {
      translateElements.forEach(element => {
        translateYDrag -= element.offsetHeight;
        element.style.transform = `translateY(${translateYDrop}px)`;
      });
    } else {
      elements.slice(0, toIndex + 1).forEach(element => {
        if (element.style.transform && element.style.transform.includes('translate')) {
          translateYDrag += element.offsetHeight;
          element.style.transform = '';
        }
      });
      if (translateYDrag !== 0) {
        dragElement.style.transform = `translateY(${translateYDrag}px)`;
      } else {
        dragElement.removeAttribute('style');
      }
    }
  }

  if (ref.dropElement !== dropElement) {
    if (ref.dropElement) {
      ref.dropElement.removeAttribute('style');
    }
    ref.dropElement = dropElement;
  }
}, [item, ref]);

*/

/*if (dragElement && dropElement) {
        const fromIndex = elements.indexOf(dragElement);
        const toIndex = elements.indexOf(dropElement);

        const translateElements = elements.filter((_, index) => {
          if (fromIndex < toIndex) {
            return index > fromIndex && index <= toIndex;
          } else {
            return index < fromIndex && index >= toIndex;
          }
        });

        console.log(translateElements);

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
          } else {
            console.log('else');
            element.style.transform = `translateY(0)`;
          }
        }); */

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

console.log('CALCULATE', newElements); 
}*/
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