import { DropTargetMonitor } from "react-dnd";
import { ContextValue, Field } from "../types";

class DragDropHelper {
  resetDropItem(context: ContextValue) {
    context.current.dropItem = null;
  }

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
}

export const dndHelper = new DragDropHelper();