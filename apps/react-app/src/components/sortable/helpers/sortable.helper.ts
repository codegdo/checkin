import { XYCoord } from "react-dnd";
import { cloneObject, mapToParent } from "../../../utils";
import { ElementInnerSize, Field } from "../types";
import { XYDirection } from "../hooks";


class SortableHelper {
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

  getClientInnerSize(element: HTMLElement) {
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

  getDirectionX(clientX: number, currentRef: XYDirection) {
    if (currentRef.x === null) {
      currentRef.x = clientX;
    } else {
      currentRef.currentX = clientX;

      if (currentRef.currentX < currentRef.x) {
        currentRef.x = currentRef.currentX;
        return 'left';
      } else if (currentRef.currentX > currentRef.x) {
        window.scrollBy(0, 1);
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
        window.scrollBy(0, 1);
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

  renderData(data: Field[]) {
    const cloneData = cloneObject(data);
    const list: Field[] = [];

    cloneData.forEach((item: Field) => {
      return mapToParent(list, item, (item: Field) => (item.group === 'block'));
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