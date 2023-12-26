import { classNames } from "@/utils";
import { ContextValue, Field } from "./types";
import { useDragDrop, useItem } from "./hooks";
import DropMenu from "./drop.menu";
import { Text } from '../text';
import { useEffect } from "react";

interface IProps extends Field {
  context: ContextValue;
}

function DropElement({ context, ...item }: IProps) {
  const { rElement, isDragging, isOver, drag, drop } = useDragDrop({ context, item });
  const { currentItem, isSelecting, isEditing, handleItemClick, handleMenuClick } = useItem(context, item);
  const className = classNames('drop-item', {
    'is-dragging': isDragging,
    'is-over': isOver,
  });

  useEffect(() => {
    drag(drop(rElement));
  }, [rElement.current]);

  return (
    <div ref={rElement} className={className} data-id={`${item.id}`} onClick={handleItemClick}>
      {(isSelecting && !isEditing) && <DropMenu onClick={handleMenuClick} />}
      <Text value={currentItem.value} readOnly={!isEditing} />
    </div>
  )
}

export default DropElement;