import { XYCoord } from "react-dnd";
import { cloneObject, mapToParent } from "@/utils";
import { ElementInnerSize, SortableField } from "../types";
import { XYDirection } from "../hooks";
import { DndRef } from "../sortable.provider";

interface OffsetAndDirection {
  clientRect: DOMRect;
  clientOffset: XYCoord;
  clientInnerSize?: ElementInnerSize;
}

interface CurrentOffset {
  verticalOffset: string;
  horizontalOffset: string;
}

interface CurrentDirection {
  verticalDirection: string | undefined;
  horizontalDirection: string | undefined;
}

class SortableHelper {
  resetDrop(dnd: DndRef) {
    if (dnd.canDrop) {
      dnd.dropItem = null;
      dnd.offset = null;
      dnd.direction = null;
      dnd.canDrop = false;
      console.log('reset-drop');
    }
  }

  setDrop(dnd: DndRef, item: SortableField) {
    dnd.dropItem = item;
    dnd.canDrop = true;
    console.log('set-drop');
  }

  hasTranslate(element: HTMLElement): boolean {
    const computedStyle = getComputedStyle(element);
    const transform = computedStyle.transform;

    if (transform) {
      return true;
    }

    return false;
  }

  sameCoordinates(coord1: XYCoord | null, coord2: XYCoord | null) {
    return coord1 && coord2 && coord1.x === coord2.x && coord1.y === coord2.y;
  }

  translateContainedDragElement() { }

  translateNonContainedDragElement() { }

  getClientDisplay(element: HTMLElement) {
    const parentNode = element.parentNode;

    if (!parentNode || !(parentNode instanceof HTMLElement)) {
      return 'column';
    }

    const computedParentStyle = window.getComputedStyle(parentNode);
    const parentDisplayStyle = parentNode.style.display || computedParentStyle.display;
    const parentFlexDirection = parentNode.style.flexDirection || computedParentStyle.flexDirection;
    const parentGridTemplateColumns = parentNode.style.gridTemplateColumns || computedParentStyle.gridTemplateColumns;

    if (parentDisplayStyle !== 'flex' && parentDisplayStyle !== 'grid') {
      return 'column';
    }

    if (parentDisplayStyle === 'grid' && parentGridTemplateColumns && parentGridTemplateColumns !== 'none') {
      return 'row';
    }

    if (!parentFlexDirection || parentFlexDirection === 'column') {
      return 'column';
    }

    const { clientHeight, clientWidth } = parentNode;

    if (parentFlexDirection === 'row') {
      if (clientWidth >= clientHeight) {
        return 'row';
      } else {
        return 'column';
      }
    }

    return 'column';
  }

  getElementHeightWithMargin(element: HTMLElement): number {
    const computedStyle = window.getComputedStyle(element);
    const marginTop = parseInt(computedStyle.marginTop);
    const marginBottom = parseInt(computedStyle.marginBottom);
    return element.offsetHeight + marginTop + marginBottom;
  }

  getElementWidthWithMargin(element: HTMLElement): number {
    const computedStyle = window.getComputedStyle(element);
    const marginLeft = parseInt(computedStyle.marginLeft);
    const marginRight = parseInt(computedStyle.marginRight);
    return element.offsetWidth + marginLeft + marginRight;
  }

  getElementInnerSize(element: HTMLElement) {
    let innerWidth = 0;
    let innerHeight = 0;

    if (element.classList.contains('is-empty')) {
      const style = window.getComputedStyle(element, ':after');

      innerWidth = (parseFloat(style.width) || 0) / 2;
      innerHeight = (parseFloat(style.height) || 0) / 2;

    } else {
      const childNodes = Array.from(element.childNodes) as HTMLElement[];

      childNodes.forEach((child) => {
        if (child instanceof HTMLElement) {
          innerWidth += child.clientWidth / 2;
          innerHeight += child.clientHeight / 2;
        }
      });
    }

    return { innerWidth, innerHeight };
  }

  getTranslateY(element: HTMLElement) {

    const transform = new DOMMatrix(window.getComputedStyle(element).getPropertyValue('transform'));
    return transform.m42;

    // const transform = window.getComputedStyle(element).getPropertyValue('transform');
    // const matrix = transform.match(/matrix(?:3d)?\(([^)]+)\)/);

    // if (matrix) {
    //   const values = matrix[1].split(', ');
    //   if (values.length >= 14) {
    //     const translateY = parseFloat(values[13]);
    //     return translateY;
    //   }
    // }

    // return 0;
  }

  getTranslateX(element: HTMLElement) {

    const transform = new DOMMatrix(window.getComputedStyle(element).getPropertyValue('transform'));
    return transform.m41;

    // const transform = window.getComputedStyle(element).getPropertyValue('transform');
    // const matrix = transform.match(/matrix(?:3d)?\(([^)]+)\)/);

    // if (matrix) {
    //   const values = matrix[1].split(', ');
    //   const translateX = parseFloat(values[12]);
    //   return translateX;
    // }

    // return 0;
  }

  getDirectionX(clientX: number, currentRef: XYDirection) {

    if (currentRef.x === null) {
      currentRef.x = clientX;
    } else {
      currentRef.currentX = clientX;

      if (currentRef.currentX < currentRef.x) {
        currentRef.x = currentRef.currentX;
        return 'left';
      } else if (currentRef.currentX > currentRef.x) {
        //window.scrollBy(0, 1);
        currentRef.x = currentRef.currentX;
        return 'right';
      } else {
        return 'no-movement';
      }
    }
  }

  getDirectionY(clientY: number, currentRef: XYDirection) {
    if (currentRef.y === null) {
      currentRef.y = clientY;
    } else {
      currentRef.currentY = clientY;

      if (currentRef.currentY < currentRef.y) {
        currentRef.y = currentRef.currentY;
        return 'up';
      } else if (currentRef.currentY > currentRef.y) {
        //window.scrollBy(0, 1);
        currentRef.y = currentRef.currentY;
        return 'down';
      } else {
        return 'no-movement';
      }
    }
  }

  getDirection(clientOffset: XYCoord, directionRef: React.MutableRefObject<XYDirection>) {

    const verticalDirection = this.getDirectionY(clientOffset.y, directionRef.current);
    const horizontalDirection = this.getDirectionX(clientOffset.x, directionRef.current);

    return { verticalDirection, horizontalDirection }
  }

  getOffsetX(clientX: number, centerX: number, width = 0) {
    return clientX <= centerX - width
      ? 'left'
      : clientX >= centerX + width
        ? 'right'
        : 'middle';
  }

  getOffsetY(clientY: number, centerY: number, height = 0) {
    return clientY <= centerY - height
      ? 'top'
      : clientY >= centerY + height
        ? 'bottom'
        : 'middle';
  }

  getOffset(clientRect: DOMRect, clientOffset: XYCoord, clientInnerSize?: ElementInnerSize) {

    const centerY = (clientRect.bottom - clientRect.top) / 2;
    const centerX = (clientRect.right - clientRect.left) / 2;
    const clientY = clientOffset.y - clientRect.top;
    const clientX = clientOffset.x - clientRect.left;

    const { innerWidth, innerHeight } = clientInnerSize || { innerWidth: 0, innerHeight: 0 };

    const verticalOffset = this.getOffsetY(clientY, centerY, innerHeight);
    const horizontalOffset = this.getOffsetX(clientX, centerX, innerWidth);

    return { verticalOffset, horizontalOffset };
  }

  getCurrentOffsetWithDirection(currentOffset: CurrentOffset, currentDirection: CurrentDirection, currentDisplay: string) {
    const { horizontalOffset, verticalOffset } = currentOffset;
    const { horizontalDirection, verticalDirection } = currentDirection;
    let offset = `on-${verticalOffset}`;
    let direction = verticalDirection;

    if (currentDisplay === 'row') {
      offset = `on-${horizontalOffset}`;
      direction = horizontalDirection;
    }

    return {
      offset,
      direction
    }
  }

  setTranslateX(doms: Record<string, HTMLDivElement>, ids: string[], translateX: number) {
    ids.forEach(id => {
      const dom = doms[id];
      if (dom) {
        dom.style.transform = `translateX(${translateX}px)`;
      }
    });
  }

  setTranslateY(doms: Record<string, HTMLDivElement>, ids: string[], translateY: number) {
    ids.forEach(id => {
      const dom = doms[id];
      if (dom) {
        dom.style.transform = `translateY(${translateY}px) scale(1,1)`;
      }
    });
  }

  renderData(data: SortableField[]) {
    const cloneData = cloneObject(data);
    const list: SortableField[] = [];

    cloneData.forEach((item: SortableField) => {
      return mapToParent(list, item, (item: SortableField) => (item.group === 'list'));
    });

    return [{
      id: 'sortable-area',
      name: 'area',
      type: 'div',
      group: 'area',
      parentId: null,
      data: [...list]
    }];
  }
}

export const sortableHelper = new SortableHelper();