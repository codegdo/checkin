import { DropTargetMonitor, XYCoord } from "react-dnd";

import utils from "@/utils";
import { DataType, Field, ContextValue, TextData } from "../types";

export interface ElementInnerSize {
  innerWidth: number;
  innerHeight: number;
}

export interface Coordinate {
  x: number | null;
  y: number | null;
  currentX: number | null;
  currentY: number | null;
}

class DragDropHelper {

  canDragDrop(dragItem: Field, context: ContextValue, dragElement?: HTMLDivElement | null) {

    const { dropItem, dragging } = context.current;

    if (dropItem?.dataType === DataType.AREA && dropItem.data?.length !== 0) {
      return false;
    }

    console.log('canDragDrop', dropItem, dropItem?.data?.length, context);

    if (dragElement) {
      const prevElement = dragElement?.previousElementSibling;
      const nextElement = dragElement?.nextElementSibling;

      const prevElementId = prevElement?.getAttribute('data-id');
      const nextElementId = nextElement?.getAttribute('data-id');

      const isDropPrevItemOnBottomRight = prevElementId == dropItem?.id && (dragging.offset === 'on-bottom' || dragging.offset === 'on-right');
      const isDropNextItemOnTopLeft = nextElementId == dropItem?.id && (dragging.offset === 'on-top' || dragging.offset === 'on-left');

      if (isDropPrevItemOnBottomRight || isDropNextItemOnTopLeft) {
        return false;
      }
    }

    return true;
  }

  setDropItem(context: ContextValue, item: Field) {
    context.current.dropItem = { ...item };
  }

  setCoordinate(context: ContextValue, monitor: DropTargetMonitor<Field>): boolean {
    const clientOffset = monitor.getClientOffset();
    const { dragging } = context.current;

    if (!clientOffset) {
      return true;
    }

    const { x: currentX, y: currentY } = dragging.coordinate;
    const { x: clientX, y: clientY } = clientOffset;

    if (currentX === clientX && currentY === clientY) {
      return true;
    }

    dragging.coordinate.x = clientX;
    dragging.coordinate.y = clientY;

    return false;
  }

  setOffset(
    dropElement: HTMLDivElement,
    context: ContextValue,
    coordinates: Coordinate
  ) {
    const { dragging } = context.current;
    const clientRect = dropElement.getBoundingClientRect();
    const clientInnerSize = this.getEmptyElementPseudoContentSize(dropElement);
    const currentOffset = `on-${this.calculateOffset(dragging.coordinate, clientRect, clientInnerSize)}`;
    const currentDirection = this.calculateDirection(dragging.coordinate, coordinates, dropElement); // direction for transitioning


    if (!dropElement.classList.contains(dragging.offset)) {
      this.setClass(dropElement, context);
    }

    if (dragging.offset === currentOffset) {
      return true;
    }

    dragging.offset = currentOffset || '';
    dragging.direction = currentDirection || dragging.direction;

    this.removeClass(dropElement);
    console.log(dragging.offset, dragging.direction);

    return false;
  }

  setClass(dropElement: HTMLDivElement, context: ContextValue) {
    const { dragging } = context.current;
    const [vertical, horizontal] = dragging.offset?.split(' ') ?? [];
    const parentNode = dropElement.parentNode as HTMLDivElement;

    if (parentNode && parentNode.classList.contains('row')) {
      this.addClass(dropElement, horizontal);
    } else {
      this.addClass(dropElement, vertical);
    }
  }

  addClass(dropElement: HTMLDivElement, className: string) {
    if (className) {
      dropElement.classList.add(className);
    }
  }

  removeClass(dropElement: HTMLDivElement) {
    dropElement.classList.remove(
      'on-top',
      'on-bottom',
      'on-left',
      'on-right',
      'on-middle'
    );
  }

  calculateHorizontalDirection(clientX: number, coordinates: Coordinate) {
    if (coordinates.x === null) {
      coordinates.x = clientX;
    }

    coordinates.currentX = clientX;

    if (coordinates.currentX < coordinates.x) {
      coordinates.x = coordinates.currentX;
      return 'left';
    } else if (coordinates.currentX > coordinates.x) {
      coordinates.x = coordinates.currentX;
      return 'right';
    } else {
      return '';
    }

  }

  calculateVerticalDirection(clientY: number, coordinates: Coordinate) {
    if (coordinates.y === null) {
      coordinates.y = clientY;
    }

    coordinates.currentY = clientY;

    if (coordinates.currentY < coordinates.y) {
      coordinates.y = coordinates.currentY;
      return 'up';
    } else if (coordinates.currentY > coordinates.y) {
      coordinates.y = coordinates.currentY;
      return 'down';
    } else {
      return '';
    }
  }

  calculateDirection(clientOffset: XYCoord, coordinates: Coordinate, dropElement: HTMLDivElement) {

    const parentDisplay = this.getParentDisplay(dropElement);

    if (parentDisplay === 'row') {
      return this.calculateHorizontalDirection(clientOffset.x, coordinates);
    }

    return this.calculateVerticalDirection(clientOffset.y, coordinates);
  }

  calculateOffsetX(clientX: number, centerX: number, width = 0) {
    if (clientX <= centerX - width) {
      return 'left';
    } else if (clientX >= centerX + width) {
      return 'right';
    } else {
      return 'middle';
    }
  }

  calculateOffsetY(clientY: number, centerY: number, height = 0) {
    if (clientY <= centerY - height) {
      return 'top';
    } else if (clientY >= centerY + height) {
      return 'bottom';
    } else {
      return 'middle';
    }
  }

  calculateOffset(clientOffset: XYCoord, clientRect: DOMRect, clientInnerSize: ElementInnerSize = { innerWidth: 0, innerHeight: 0 }) {
    const { left, top, right, bottom } = clientRect;
    const { innerWidth, innerHeight } = clientInnerSize;

    const distanceFromTop = clientOffset.y - top;
    const distanceFromBottom = bottom - clientOffset.y;
    const distanceFromLeft = clientOffset.x - left;
    const distanceFromRight = right - clientOffset.x;

    const minDistance = Math.min(distanceFromTop, distanceFromBottom, distanceFromLeft, distanceFromRight);

    const centerX = (right + left) / 2;
    const centerY = (bottom + top) / 2;

    if (innerWidth > 0 && innerHeight > 0) {
      const offsetX = this.calculateOffsetX(clientOffset.x, centerX, innerWidth);
      const offsetY = this.calculateOffsetY(clientOffset.y, centerY, innerHeight);

      if (offsetX === 'middle' && offsetY === 'middle') {
        return 'middle';
      } else if (offsetX === 'left' || offsetX === 'right') {
        return offsetX;
      } else if (offsetY === 'top' || offsetY === 'bottom') {
        return offsetY;
      }
    } else {
      if (minDistance === distanceFromTop) {
        return 'top';
      } else if (minDistance === distanceFromBottom) {
        return 'bottom';
      } else if (minDistance === distanceFromLeft) {
        return 'left';
      } else if (minDistance === distanceFromRight) {
        return 'right';
      }
    }

    return 'outside';
  }

  calculateDisplayOffset(selectedElement?: Element | null, containerWidth: number = 300, gap: number = 40) {
    if (!selectedElement) {
      return { x: 0, y: 0 };
    }
    const clientRect = selectedElement.getBoundingClientRect();
    const totalWidth = containerWidth + gap;
    const clientTop = clientRect?.top || 0;
    const clientRight = clientRect?.right || 0;
    const clientLeft = clientRect?.left || 0;

    let rightPosition = Math.round(window.innerWidth - totalWidth);
    const rightSpace = Math.round(window.innerWidth - clientRight);

    if (rightSpace && rightSpace > totalWidth) {
      rightPosition = clientRight + gap;
    } else if (window.innerWidth < totalWidth) {
      rightPosition = clientLeft;
    }

    return {
      x: rightPosition,
      y: clientTop
    };
  }

  getDisplayOffset(el: Element, size: { width: number; height: number }) {
    const rectElement = el.getBoundingClientRect();
    console.log(rectElement, size);
  }

  getParentDisplay(dropElement: HTMLDivElement) {
    const parentNode = dropElement.parentNode as HTMLDivElement;

    if (parentNode && parentNode.classList.contains('row')) {
      return 'row';
    }

    return 'column';
  }

  getEmptyElementPseudoContentSize(dropElement: HTMLDivElement) {
    let innerWidth = 0;
    let innerHeight = 0;

    if (dropElement.classList.contains('is-empty')) {
      const style = window.getComputedStyle(dropElement, ':after');
      innerWidth = parseFloat(style.width) / 2 || 0;
      innerHeight = parseFloat(style.height) / 2 || 0;
    }

    return { innerWidth, innerHeight };
  }

  getIds(item: Field | Partial<Field> | null, filterId?: string | number | null) {
    const hasChildrenDrop = item?.dataType === DataType.BLOCK || item?.dataType === DataType.SECTION;

    const condition = (item: Field) => item.dataType === DataType.BLOCK || item.dataType === DataType.SECTION;

    const ids = item && hasChildrenDrop ? utils.countItems(item as Field, condition) : item ? [`${item.id}`] : [];

    if (filterId) {
      return ids.filter((id) => (id !== filterId?.toString()));
    }

    return ids;
  }

  findItemById(
    item: Field,
    fieldId: string | number | null,
    condition: (item: Field) => boolean,
  ): Field | null {
    function findRecursive(field: Field | null): Field | null {
      if (!field || field.id == fieldId) {
        return field;
      }

      if (field.data && condition(field)) {
        for (const child of field.data) {
          const found = findRecursive(child);
          if (found) {
            return found;
          }
        }
      }

      return null;
    }

    return findRecursive(item);
  }

  snapToGrid(x: number, y: number): [number, number] {
    const snappedX = Math.round(x / 32) * 32
    const snappedY = Math.round(y / 32) * 32
    return [snappedX, snappedY]
  }

  getDragStyles(
    initialOffset: XYCoord | null,
    currentOffset: XYCoord | null,
    isSnapToGrid: boolean = false,
  ) {
    if (!initialOffset || !currentOffset) {
      return {
        display: 'none',
      };
    }

    let { x, y } = currentOffset;

    if (isSnapToGrid) {
      x -= initialOffset.x;
      y -= initialOffset.y;
      [x, y] = this.snapToGrid(x, y);
      x += initialOffset.x;
      y += initialOffset.y;
    }

    const transform = `translate(${x}px, ${y}px)`;

    return {
      transform,
      WebkitTransform: transform,
    };
  }

  isDragEnabled(
    list: Field[],
    item: Field,
    condition: (item: Field) => boolean
  ): boolean {
    return !list.some((i) => condition(i) && i.id == item.id);
  }

  createDragElements(types: (string | Field)[]): Field[] {
    return types.map((type) => {
      if (typeof type === 'string') {
        const dataType = type === 'section' || type === 'block' ? type : 'element';
        let data: Field[] | null = type === 'section' || type === 'block' ? [] : null;
        let value: string | null = null;

        if (type === 'text') {
          value = '<p>Enter some plain text...</p>';
          data = [{
            type: 'paragraph',
            children: [{ text: 'Enter some plain text...' }],
          }] as unknown as Field[];
        }

        return {
          id: null,
          name: type,
          type,
          dataType,
          data,
          value,
          position: null,
          parentId: null,
        };
      } else {
        return type as Field; // Handling for cases where type is already a Field
      }
    });
  }

  compareItem(oldItem: Field, newItem: Field) {
    return utils.compareObject(oldItem, newItem);
  }

  generateNewId() {
    return utils.randomString();
  }

  isTextEmpty(data: TextData[]): boolean {
    if (data && Array.isArray(data)) {
      for (const item of data) {
        if ('children' in item) {
          const allEmpty = item.children.every(child => {
            if (child && typeof child === 'object' && 'text' in child) {
              return child.text.trim() === '';
            }
            return true;
          });

          if (!allEmpty) {
            return false;
          }
        }
      }
    }
    return true;
  }
}

export const dndHelper = new DragDropHelper();
