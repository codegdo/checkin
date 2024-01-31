import { useRef } from "react";
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { ContextValue } from "../contexts";
import { DndField, DragType } from "../types";
import { dndHelper } from "../helpers";

interface IProps {
  dragType: keyof typeof DragType,
  context: ContextValue,
  item: DndField,
  draggable?: boolean,
}

export const useDragDrop = ({ dragType, context, item, draggable = true }: IProps) => {
  const { ref } = context;
  const dndRef = useRef<HTMLDivElement>(null);
  const dndPreview = useRef<HTMLDivElement>(null);

  const handleCanDrag = () => { return true };
  const handleDragEnd = (_: DndField, monitor: DragSourceMonitor<DndField>) => {
    if (!monitor.didDrop() || ref.dropItem?.id === item.id) return; // item is the over-item
    console.log('DROP', ref);
  };

  const handleCanDrop = () => { return true };
  const handleDragOver = (_: DndField, monitor: DropTargetMonitor<DndField>) => {
    if (!monitor.isOver({ shallow: true }) || !dndRef.current) return;
    if (ref.dropItem?.id !== item.id) ref.dropItem = item; // item is the over-item
    // Set coordinate and return early if coordinate match
    if (dndHelper.setCoordinate(ref, monitor)) return;
    console.log('HOVER', item);
  };

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: dragType,
    item,
    canDrag: handleCanDrag,
    end: handleDragEnd,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }), [item]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: Object.values(DragType),
    canDrop: handleCanDrop,
    hover: handleDragOver,
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true })
    })
  }), [item]);

  return {
    dndRef,
    dndPreview,
    isDragging,
    isOver,
    drag,
    drop,
    preview
  }
}