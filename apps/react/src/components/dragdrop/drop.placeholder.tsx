import { PropsWithChildren, useEffect } from "react";

import { classNames } from "@/utils";
import { ContextValue, Field } from "./types";
import { useDragDrop, useItem } from "./hooks";
import DropMenu from "./drop.menu";

type Props = PropsWithChildren<Field & {
  context: ContextValue;
}>;

function DropPlaceholder({ context, children, ...item }: Props) {
  const { rElement, isDragging, isOver, drag, drop } = useDragDrop({ context, item });
  const { isSelecting, isEditing, handleItemClick, handleMenuClick } = useItem(context, item);
  const className = classNames('drop-item', {
    'is-dragging': isDragging,
    'is-over': isOver,
    'is-empty': item.data?.length == 0
  });

  useEffect(() => {
    drag(drop(rElement));
  }, [rElement.current]);

  return (
    <div ref={rElement} data-id={`${item.id}`} className={className} onClick={handleItemClick}>
      {(isSelecting && !isEditing) && <DropMenu onClick={handleMenuClick} />}
      {children}
    </div>
  )
}

export default DropPlaceholder;