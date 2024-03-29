import { useCallback, useEffect, useRef } from "react";
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { Field, DataType, ContextValue, ActionType } from "../types";
import { Coordinate, dndHelper } from "../helpers";

interface IProps {
  context: ContextValue;
  item: Field;
  draggable?: boolean;
}

const defaultCoordinate = {
  x: null,
  y: null,
  currentX: null,
  currentY: null
};

export const useDragDrop = ({ context, item, draggable = true }: IProps) => {
  const { current, state, dispatch } = context;
  const rElement = useRef<HTMLDivElement>(null);
  const rPreview = useRef<HTMLDivElement>(null);
  const rCoordinate = useRef<Coordinate>(defaultCoordinate);

  const updateItem = (selectedItem: Field) => {
    let updatedItem = { ...selectedItem };
    if (selectedItem?.dataType === 'section' || selectedItem?.dataType === 'block') {
      updatedItem = { ...updatedItem, data: [] };
    }
    return updatedItem;
  };

  const shouldUpdateItem = (updatedItem: Field) => {
    const oldItem = state.data.find((item) => item.id === updatedItem?.id);
    return JSON.stringify(oldItem) !== JSON.stringify(updatedItem);
  };

  const handleItemUpdate = () => {
    if (current.selectedItem?.item) {
      const selectedItem = current.selectedItem.item;
      const updatedItem = updateItem(selectedItem);

      if (shouldUpdateItem(updatedItem)) {
        dispatch({
          type: ActionType.UPDATE_ITEM,
          payload: { updatedItem },
        });
      }

      context.current.selectedItem = null;
    }
  }

  const handleDragStart = useCallback(() => {

    if (state.isSelecting) {
      handleItemUpdate();
      dispatch({ type: ActionType.UNSELECT_ITEM });
    }

    return draggable;
  }, [current.selectedItem, dispatch, draggable, state.isSelecting]);

  const handleDragEnd = useCallback((dragItem: Field, monitor: DragSourceMonitor<Field>) => {
    if (!monitor.didDrop()) return;

    const dragElement = rPreview.current || rElement.current;

    const payload = {
      dragItem,
      dropItem: current.dropItem,
      offset: current.dragging.offset,
    };

    if (!dragElement) {
      const canAddItem = dndHelper.canDragDrop(dragItem, context);

      if (canAddItem) {
        dispatch({ type: ActionType.ADD_ITEM, payload });
      }
      return;
    }

    const canDragDrop = dndHelper.canDragDrop(dragItem, context, dragElement);

    if (canDragDrop) {
      dispatch({ type: ActionType.MOVE_ITEM, payload });
    }
  }, [context, current.dragging.offset, current.dropItem, dispatch]);

  const handleDragOver = useCallback((dragItem: Field, monitor: DropTargetMonitor<Field>) => {
    if (!monitor.isOver({ shallow: true }) || !rElement.current) return;

    if (current.dropItem?.id !== item.id) {
      dndHelper.setDropItem(context, item);
    }

    // Set coordinate and return early if already set and match
    if (dndHelper.setCoordinate(context, monitor)) return;

    // Set offset and css, return early if already set and match
    if (dndHelper.setOffset(rPreview.current || rElement.current, context, rCoordinate.current)) return;

    //console.log('DRAG OVER');
  }, [context, current.dropItem?.id, item]);

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: `${item.dataType}`,
    item,
    canDrag: handleDragStart,
    end: handleDragEnd,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }), [item]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: Object.values(DataType),
    canDrop: () => context.current.canDrop,
    hover: handleDragOver,
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true })
    })
  }), [item]);

  // useEffect(() => {
  //   if (!isOver) {
  //     //coordinateRef.current = { ...defaultCoordinate };
  //     //console.log('DRAG OUT', item);
  //   }
  // }, [isOver]);

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: false });
    return () => { preview(null) };
  }, [preview, isDragging]);

  useEffect(() => {
    const { position, id } = item;
    //const elementExists = context.current.elementRef[`${id}`];
    const elementToAssign = rPreview.current || rElement.current;

    const shouldAssignElementRef = position !== null && id && elementToAssign;

    if (shouldAssignElementRef) {
      context.current.elementRef[`${id}`] = elementToAssign;
    }
  }, [item, context, rPreview, rElement]);

  return {
    rElement,
    rPreview,
    isOver,
    isDragging,
    drag,
    drop,
    preview,
  };
};
