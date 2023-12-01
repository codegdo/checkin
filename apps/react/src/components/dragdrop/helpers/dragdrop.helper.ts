import { DropTargetMonitor, XYCoord } from "react-dnd";
import { ContextValue, Field } from "../types";

export interface ElementInnerSize {
  innerWidth: number;
  innerHeight: number;
}

export interface CurrentXY {
  x: number | null;
  currentX: number | null;
  y: number | null;
  currentY: number | null;
}

interface CurrentOffset {
  verticalOffset: string;
  horizontalOffset: string;
}

interface CurrentDirection {
  verticalDirection: string | undefined;
  horizontalDirection: string | undefined;
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
    context: ContextValue, 
    dropElement:HTMLDivElement,
    currentXY:CurrentXY
  ) {
    const clientRect = dropElement.getBoundingClientRect();

    const currentOffset = this.getOffset(context.current.coordinate, clientRect);
    const currentDirection = this.getDirection(context.current.coordinate, currentXY);
    const current = this.getCurrentOffsetWithDirection(currentOffset, currentDirection);

    const {offset, direction} = context.current;

    //console.log(current.offset, current.direction);

    if (offset === current.offset && direction === current.direction) {
      return true;
    }

    context.current.offset = current.offset || '';
    context.current.direction = current.direction || '';

    console.log(context.current.offset , context.current.direction);

    return false;
  }

  getCurrentOffsetWithDirection(currentOffset: CurrentOffset, currentDirection: CurrentDirection, currentDisplay: string = 'column') {
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

  getDirectionX(clientX: number, currentXY: CurrentXY) {

    if (currentXY.x === null) {
      currentXY.x = clientX;
    } else {
      currentXY.currentX = clientX;

      if (currentXY.currentX < currentXY.x) {
        currentXY.x = currentXY.currentX;
        return 'left';
      } else if (currentXY.currentX > currentXY.x) {
        //window.scrollBy(0, 1);
        currentXY.x = currentXY.currentX;
        return 'right';
      } else {
        return 'no-movement';
      }
    }
  }

  getDirectionY(clientY: number, currentXY: CurrentXY) {
    if (currentXY.y === null) {
      currentXY.y = clientY;
    } else {
      currentXY.currentY = clientY;

      if (currentXY.currentY < currentXY.y) {
        currentXY.y = currentXY.currentY;
        return 'up';
      } else if (currentXY.currentY > currentXY.y) {
        //window.scrollBy(0, 1);
        currentXY.y = currentXY.currentY;
        return 'down';
      } else {
        return 'no-movement';
      }
    }
  }

  getDirection(clientOffset: XYCoord, currentXY: CurrentXY) {

    const horizontalDirection = this.getDirectionX(clientOffset.x, currentXY);
    const verticalDirection = this.getDirectionY(clientOffset.y, currentXY);
    
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

  getOffset(clientOffset: XYCoord, clientRect: DOMRect, clientInnerSize?: ElementInnerSize) {

    const centerY = (clientRect.bottom - clientRect.top) / 2;
    const centerX = (clientRect.right - clientRect.left) / 2;
    const clientY = clientOffset.y - clientRect.top;
    const clientX = clientOffset.x - clientRect.left;

    const { innerWidth, innerHeight } = clientInnerSize || { innerWidth: 0, innerHeight: 0 };

    const verticalOffset = this.getOffsetY(clientY, centerY, innerHeight);
    const horizontalOffset = this.getOffsetX(clientX, centerX, innerWidth);

    return { verticalOffset, horizontalOffset };
  }
}

export const dndHelper = new DragDropHelper();