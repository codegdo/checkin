import { useCallback, useEffect, useRef } from "react";
import { SortableContextValue } from "../sortable.provider";
import { DndField, MoveDirection } from "../types";
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { sortableHelper } from "../helpers";
import { SortableActionType } from "../reducers";
//import { filterArrayRangeExclusingStart } from "../../../utils";

interface Params {
  item: DndField;
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

export const useSortable = ({ item, ctx }: Params) => {
  const { dnd, state, dispatch } = ctx;
  const { id, dataType } = item;
  const ref = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef<XYDirection>(defaultDirection);

  const appendToHolder = useCallback((dragElement: HTMLElement, parentElement: HTMLElement, offset: string) => {
    const hasDragElement = Array.from(parentElement.children).includes(dragElement);

    if (hasDragElement) return;

    if (offset === 'on-top') {
      parentElement.prepend(dragElement);
    } else {
      parentElement.appendChild(dragElement);
    }

    animateTransition(dragElement, offset === 'on-top' ? -100 : 100, 0);

    // cleanup old parent node
    if (dnd.parentNode) {
      Array.from(dnd.parentNode.children).forEach(childElement => {
        childElement.removeAttribute('style');
      });
    }

    // assign new parent node
    dnd.parentNode = parentElement;
  }, [dnd]);

  const insertItemToList = useCallback((dragElement: HTMLElement, dropElement: HTMLElement, parentElement: ParentNode, offset: string) => {
    const targetElement = offset === 'on-top' ? dropElement : dropElement.nextSibling;

    parentElement.insertBefore(dragElement, targetElement);

    animateTransition(dragElement, offset === 'on-top' ? -100 : 100, 0);

    // cleanup old parent node
    if (dnd.parentNode) {
      Array.from(dnd.parentNode.children).forEach(childElement => {
        childElement.removeAttribute('style');
      });
    }

    // assign new parent node
    dnd.parentNode = parentElement;
  }, [dnd]);

  const animateTransition = (element: HTMLElement, translateYStart: number, translateYEnd: number) => {
    element.style.opacity = '0';
    element.style.transform = `translateY(${translateYStart}%)`;

    setTimeout(() => {
      element.style.opacity = '.5';
      element.style.transform = `translateY(${translateYEnd}%)`;
    }, 0);
  };

  const translateHorizontal = (
    dragElement: HTMLElement,
    dropElement: HTMLElement,
    parentElement: ParentNode,
    elements: HTMLElement[],
    fromIndex: number,
    toIndex: number,
    direction: string
  ) => {
    const computedStyle = window.getComputedStyle(parentElement as HTMLElement);
    const gap = parseInt(computedStyle.gap) || 0;
    const translateX = sortableHelper.getElementWidthWithMargin(dragElement) + gap || 0;

    let translateDragging = 0;
    let translatingElements;

    if (fromIndex < toIndex) {
      translatingElements = elements.slice(fromIndex + 1, toIndex + 1);
      translatingElements.forEach(element => {
        const translateXElement = sortableHelper.getElementWidthWithMargin(element) + gap || 0;
        translateDragging += translateXElement;
      });
    } else {
      translatingElements = elements.slice(toIndex, fromIndex);
      translatingElements.forEach(element => {
        const translateXElement = sortableHelper.getElementWidthWithMargin(element) + gap || 0;
        translateDragging -= translateXElement;
      });
    }

    switch (direction) {
      case MoveDirection.LEFT_TO_RIGHT: {
        if (!dropElement.hasAttribute('style')) {
          translatingElements.forEach(element => {
            element.style.transform = `translateX(-${translateX}px)`;
          });
          dragElement.style.transform = `translateX(${translateDragging}px)`;
        }
        break;
      }
      case MoveDirection.BACK_TO_LEFT: {
        translatingElements.find(element => {
          if (element === dropElement) {
            const translateXElement = translateDragging - sortableHelper.getElementWidthWithMargin(element) - gap;
            if (translateXElement === 0) {
              if (parentElement) {
                Array.from(parentElement.children).forEach(childElement => {
                  if (childElement.hasAttribute('style')) {
                    childElement.removeAttribute('style');
                  }
                });
              }
              dragElement.removeAttribute('style');
            } else {
              if (element.hasAttribute('style')) {
                dragElement.style.transform = `translateX(${translateXElement}px)`;
              }
            }
            element.removeAttribute('style');
          }
        });
        break;
      }
      case MoveDirection.RIGHT_TO_LEFT: {
        if (!dropElement.hasAttribute('style')) {
          translatingElements.forEach(element => {
            element.style.transform = `translateX(${translateX}px)`;
          });
          dragElement.style.transform = `translateX(${translateDragging}px)`;
        }
        break;
      }
      case MoveDirection.BACK_TO_RIGHT: {
        translatingElements.find(element => {
          if (element === dropElement) {
            const translateXElement = translateDragging + sortableHelper.getElementWidthWithMargin(element) + gap;
            if (translateXElement === 0) {
              if (parentElement) {
                Array.from(parentElement.children).forEach(childElement => {
                  if (childElement.hasAttribute('style')) {
                    childElement.removeAttribute('style');
                  }
                });
              }
              dragElement.removeAttribute('style');
            } else {
              if (element.hasAttribute('style')) {
                dragElement.style.transform = `translateX(${translateXElement}px)`;
              }
            }
            element.removeAttribute('style');
          }
        });
        break;
      }
      default:
        console.log('no-translation');
    }
  }

  const translateVertical = (
    dragElement: HTMLElement,
    dropElement: HTMLElement,
    parentElement: ParentNode,
    elements: HTMLElement[],
    fromIndex: number,
    toIndex: number,
    direction: string
  ) => {
    const computedStyle = window.getComputedStyle(parentElement as HTMLElement);
    const gap = parseInt(computedStyle.gap) || 0;
    const translateY = sortableHelper.getElementHeightWithMargin(dragElement) + gap || 0;

    let translateDragging = 0;
    let translatingElements;

    if (fromIndex < toIndex) {
      translatingElements = elements.slice(fromIndex + 1, toIndex + 1);
      translatingElements.forEach(element => {
        const translateXElement = sortableHelper.getElementHeightWithMargin(element) + gap || 0;
        translateDragging += translateXElement;
      });
    } else {
      translatingElements = elements.slice(toIndex, fromIndex);
      translatingElements.forEach(element => {
        const translateXElement = sortableHelper.getElementHeightWithMargin(element) + gap || 0;
        translateDragging -= translateXElement;
      });
    }

    switch (direction) {
      case MoveDirection.TOP_TO_BOTTOM: {
        if (!dropElement.hasAttribute('style')) {
          translatingElements.forEach(element => {
            element.style.transform = `translateY(-${translateY}px)`;
          });
          dragElement.style.transform = `translateY(${translateDragging}px)`;
        }
        break;
      }
      case MoveDirection.BACK_TO_TOP: {
        translatingElements.find(element => {
          if (element === dropElement) {
            const translateYElement = translateDragging - sortableHelper.getElementHeightWithMargin(element) - gap;

            if (translateYElement === 0) {
              if (parentElement) {
                Array.from(parentElement.children).forEach(childElement => {
                  if (childElement.hasAttribute('style')) {
                    childElement.removeAttribute('style');
                  }
                });
              }
              dragElement.removeAttribute('style');
            } else {
              if (element.hasAttribute('style')) {
                dragElement.style.transform = `translateY(${translateYElement}px)`;
              }
            }

            element.removeAttribute('style');
          }
        });
        break;
      }
      case MoveDirection.BOTTOM_TO_TOP: {
        if (!dropElement.hasAttribute('style')) {
          translatingElements.forEach(element => {
            element.style.transform = `translateY(${translateY}px)`;
          });
          dragElement.style.transform = `translateY(${translateDragging}px)`;
        }
        break;
      }
      case MoveDirection.BACK_TO_BOTTOM: {
        translatingElements.find(element => {
          if (element === dropElement) {
            const translateYElement = translateDragging + sortableHelper.getElementHeightWithMargin(element) + gap;

            if (translateYElement === 0) {
              if (parentElement) {
                Array.from(parentElement.children).forEach(childElement => {
                  if (childElement.hasAttribute('style')) {
                    childElement.removeAttribute('style');
                  }
                });
              }
              dragElement.removeAttribute('style');
            } else {
              if (element.hasAttribute('style')) {
                dragElement.style.transform = `translateY(${translateYElement}px)`;
              }
            }

            element.removeAttribute('style');
          }
        });
        break;
      }
      default:
        console.log('no-translation');
    }
  }

  const handleDragStart = useCallback(() => {
    console.log('DRAG TYPE');

    return true;
  }, []);

  const handleDragEnd = useCallback((dragItem: DndField, monitor: DragSourceMonitor<DndField>) => {

    if (monitor.didDrop()) {
      const { dropItem, offset } = dnd;

      dispatch({
        type: SortableActionType.MOVE_ITEM,
        payload: {
          dragItem: dragItem,
          dropItem,
          offset
        }
      });

    }

    if (ref.current) {
      ref.current.style.opacity = '';
    }

    console.log('dragEnd', dnd, ref.current);
  }, [dnd, dispatch]);

  const handleDragOver = useCallback((dragItem: DndField, monitor: DropTargetMonitor<DndField>) => {
    if (!monitor.isOver({ shallow: true })) return;

    if (!ref.current || dragItem.id == item.id) {
      sortableHelper.resetDrop(dnd);
      return;
    }

    const dragElement = dnd.elements[String(dragItem.id)];
    let dropElement = previewRef.current || ref.current;
    let parentElement = dropElement?.parentNode;

    if (!dragElement || !dropElement || !parentElement) return;

    const dragDataType = dragItem.dataType;
    const dropDataType = item.dataType;

    if (dragDataType === 'list' && dropDataType === 'area') return;
    if (dragDataType === 'list' && dropDataType === 'item') return;
    if (dragDataType === 'item' && dropDataType === 'area') return;
    if (dragDataType === 'item' && dropDataType === 'list') return;

    if (dragDataType === 'item' && dropDataType === 'holder') {
      const hasDragElement = Array.from(dropElement.children).includes(dragElement);

      if (hasDragElement) return;
    }

    const { dropItem, cordinate } = dnd;

    if (dropItem?.id !== item.id) {
      sortableHelper.setDrop(dnd, item);
    }

    const clientOffset = monitor.getClientOffset();
    const sameCoordinates = cordinate.x === clientOffset?.x && cordinate.y === clientOffset?.y;

    if (!clientOffset || sameCoordinates) return;

    cordinate.x = clientOffset.x;
    cordinate.y = clientOffset.y;

    const clientRect = dropElement.getBoundingClientRect();
    //const clientInnerSize = item.group === 'list' ? undefined : sortableHelper.getClientInnerSize(dropElement);
    //const clientDisplay = sortableHelper.getClientDisplay(dropElement);
    const currentDisplay = (dragDataType === 'list' && dropDataType === 'list') || (dragDataType === 'list' && dropDataType === 'holder') ? 'row' : 'column';
    const currentOffset = sortableHelper.getOffset(clientRect, clientOffset);
    const currentDirection = sortableHelper.getDirection(clientOffset, directionRef);
    const { offset, direction } = sortableHelper.getCurrentOffsetWithDirection(currentOffset, currentDirection, currentDisplay);

    if (dnd.offset === offset && dnd.direction === direction) return;
    dnd.offset = offset;
    dnd.direction = direction || '';

    if ((dragDataType === 'list' && dropDataType === 'list') || (dragDataType === 'list' && dropDataType === 'holder')) {

      if ((dragDataType === 'list' && dropDataType === 'holder')) {
        dropElement = dropElement.parentNode as HTMLDivElement;
        parentElement = dropElement?.parentNode;

        if (!parentElement) return;
      }

      const elements = Array.from(parentElement.children) as HTMLElement[];
      const fromIndex = elements.indexOf(dragElement);
      const toIndex = elements.indexOf(dropElement);

      if (fromIndex < toIndex && direction === 'right') {
        translateHorizontal(dragElement, dropElement, parentElement, elements, fromIndex, toIndex, MoveDirection.LEFT_TO_RIGHT);
        console.log(direction, MoveDirection.LEFT_TO_RIGHT)
      } else if (fromIndex < toIndex && direction === 'left') {
        translateHorizontal(dragElement, dropElement, parentElement, elements, fromIndex, toIndex, MoveDirection.BACK_TO_LEFT);
        console.log(direction, MoveDirection.BACK_TO_LEFT)
      } else if (fromIndex > toIndex && direction === 'left') {
        translateHorizontal(dragElement, dropElement, parentElement, elements, fromIndex, toIndex, MoveDirection.RIGHT_TO_LEFT);
        console.log(direction, MoveDirection.RIGHT_TO_LEFT)
      } else if (fromIndex > toIndex && direction === 'right') {
        translateHorizontal(dragElement, dropElement, parentElement, elements, fromIndex, toIndex, MoveDirection.BACK_TO_RIGHT);
        console.log(direction, MoveDirection.BACK_TO_RIGHT)
      } else {
        console.log(direction)
      }

      console.log('listToList');
      return;
    }

    if ((dragDataType === 'item' && dropDataType === 'holder')) {
      appendToHolder(dragElement, dropElement, offset);
      console.log('itemToHolder');
      return;
    }

    if ((dragDataType === 'item' && dropDataType === 'item')) {
      const elements = Array.from(parentElement.children) as HTMLElement[];
      const fromIndex = elements.indexOf(dragElement);
      const toIndex = elements.indexOf(dropElement);

      const hasDragElement = elements.includes(dragElement);

      if (!hasDragElement) {
        dnd.parentNode = dragElement.parentNode;
        insertItemToList(dragElement, dropElement, parentElement, offset);
        return;
      }

      if (fromIndex < toIndex && direction === 'down') {
        translateVertical(dragElement, dropElement, parentElement, elements, fromIndex, toIndex, MoveDirection.TOP_TO_BOTTOM);
      } else if (fromIndex < toIndex && direction === 'up') {
        translateVertical(dragElement, dropElement, parentElement, elements, fromIndex, toIndex, MoveDirection.BACK_TO_TOP);
      } else if (fromIndex > toIndex && direction === 'up') {
        translateVertical(dragElement, dropElement, parentElement, elements, fromIndex, toIndex, MoveDirection.BOTTOM_TO_TOP);
      } else if (fromIndex > toIndex && direction === 'down') {
        translateVertical(dragElement, dropElement, parentElement, elements, fromIndex, toIndex, MoveDirection.BACK_TO_BOTTOM);
      }

      console.log('itemToItem');
      return;
    }
  }, [item, dnd, appendToHolder, insertItemToList]);

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: `${dataType}`,
    item,
    canDrag: handleDragStart,
    end: handleDragEnd,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }), [item]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['list', 'item'],
    canDrop: () => dnd.canDrop,
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
    if (ref.current && ref.current.hasAttribute('style')) {
      ref.current.removeAttribute('style');
    }
  }, [state]);

  useEffect(() => {
    dnd.elements[`${id}`] = previewRef.current || ref.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ref,
    previewRef,
    drag,
    drop,
    preview,
    isOver,
    isDragging
  }
}

