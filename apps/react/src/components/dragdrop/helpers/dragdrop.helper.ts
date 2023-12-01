import { DropTargetMonitor, XYCoord } from "react-dnd";
import { ContextValue, DataType, Field } from "../types";
import { countItems } from "@/utils";

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

interface Offset {
  vertical: string;
  horizontal: string;
}

interface Direction {
  vertical: string | undefined;
  horizontal: string | undefined;
}

class DragDropHelper {

  setDropItem(context: ContextValue, item: Field) {
    context.current.dropItem = item;
  }

  setCoordinate(context: ContextValue, monitor: DropTargetMonitor<Field>): boolean {
    const clientOffset = monitor.getClientOffset();

    if (!clientOffset) {
      return true;
    }

    const { x: currentX, y: currentY } = context.current.coordinate;
    const { x: clientX, y: clientY } = clientOffset;

    if (currentX === clientX && currentY === clientY) {
      return true;
    }

    context.current.coordinate.x = clientX;
    context.current.coordinate.y = clientY;

    return false;
  }

  setOffset(
    dropElement: HTMLDivElement,
    context: ContextValue,
    coordinates: Coordinate
  ) {
    const clientRect = dropElement.getBoundingClientRect();

    const currentOffset = this.calculateOffset(context.current.coordinate, clientRect);
    const currentDirection = this.calculateDirection(context.current.coordinate, coordinates);
    const current = this.calculateCurrentOffsetWithDirection(currentOffset, currentDirection);

    const { offset } = context.current;

    if (!dropElement.classList.contains(offset)) {
      this.setClass(dropElement, context);
    }

    if (offset === current.offset) {
      return true;
    }

    context.current.offset = current.offset || '';
    context.current.direction = current.direction || context.current.direction;

    this.removeClass(dropElement);
    console.log(context.current.offset, context.current.direction);

    return false;
  }

  setClass(dropElement: HTMLDivElement, context: ContextValue) {
    const [vertical, horizontal] = context.current.offset?.split(' ') ?? [];
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

  calculateCurrentOffsetWithDirection(currentOffset: Offset, currentDirection: Direction) {
    const { horizontal, vertical } = currentOffset;
    const { vertical: verticalDirection } = currentDirection;
    const offset = `on-${vertical} on-${horizontal}`;
    const direction = `${verticalDirection}`;

    return { offset, direction };
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

  calculateDirection(clientOffset: XYCoord, coordinates: Coordinate) {
    //const horizontalDirection = this.calculateHorizontalDirection(clientOffset.x, coordinates);
    const verticalDirection = this.calculateVerticalDirection(clientOffset.y, coordinates);

    return { vertical: verticalDirection, horizontal: '' }
  }

  calculateOffsetX(clientX: number, centerX: number, width = 0) {
    return clientX <= centerX - width ? 'left' : clientX >= centerX + width ? 'right' : 'middle';
  }

  calculateOffsetY(clientY: number, centerY: number, height = 0) {
    return clientY <= centerY - height ? 'top' : clientY >= centerY + height ? 'bottom' : 'middle';
  }

  calculateOffset(clientOffset: XYCoord, clientRect: DOMRect, clientInnerSize?: ElementInnerSize) {
    const centerY = (clientRect.bottom - clientRect.top) / 2;
    const centerX = (clientRect.right - clientRect.left) / 2;
    const clientY = clientOffset.y - clientRect.top;
    const clientX = clientOffset.x - clientRect.left;

    const { innerWidth, innerHeight } = clientInnerSize || { innerWidth: 0, innerHeight: 0 };

    const vertical = this.calculateOffsetY(clientY, centerY, innerHeight);
    const horizontal = this.calculateOffsetX(clientX, centerX, innerWidth);

    return { vertical, horizontal };
  }

  getIds(dragItem: Field, dropItem: Partial<Field> | null) {

    const hasChildrenDrag = dragItem.dataType === DataType.BLOCK || dragItem.dataType === DataType.SECTION;
    const condition = (item: Field) => item.dataType === DataType.BLOCK || item.dataType === DataType.SECTION;

    const dragIds = hasChildrenDrag ? countItems(dragItem, condition) : [`${dragItem.id}`];
    const dropIds = dropItem && hasChildrenDrag ? countItems(dropItem as Field, condition) : dropItem ? [`${dropItem.id}`] : [];

    return {
      dragIds,
      dropIds,
    };
  }
}

export const dndHelper = new DragDropHelper();
