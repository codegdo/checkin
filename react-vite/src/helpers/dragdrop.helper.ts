import { DropTargetMonitor } from "react-dnd";

interface DndHoverParams {
  dragItem: any;
  dropItem: any;
  monitor: DropTargetMonitor<any, void>;
  ref: React.RefObject<HTMLDivElement>;
}

class DragDropHelper {
  /**
   * Handles the hover event during a Drag and Drop operation.
   */
  handleOver({ monitor, ref, dragItem, dropItem }: DndHoverParams) {
    const dropTarget = ref.current;

    if (!dropTarget) return;

    // determine rectangle on screen
    const hoverBoundingRect = dropTarget.getBoundingClientRect();
    // determine mouse position
    const clientOffset = monitor.getClientOffset();

    if (!clientOffset) return;

    // get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    // get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    // get horizontal middle
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
    // get pixels to the left
    const hoverClientX = clientOffset.x - hoverBoundingRect.left;

    if (dropItem.x == clientOffset.x && dropItem.y == clientOffset.y) return;

    dropItem.x = clientOffset.x;
    dropItem.y = clientOffset.y;

    console.log(dropItem.x, dropItem.y);
  }
}

export const dndHelper = new DragDropHelper();
export default DragDropHelper;
