import { PropsWithChildren, useEffect } from "react";

import { classNames } from "@/utils";
import { ContextValue, Field } from "./types";
import { useDragDrop, useOnClick } from "./hooks";
import DropMenu from "./drop.menu";

type Props = PropsWithChildren<Field & {
  context: ContextValue;
}>;

function DropSection({ context, children, ...item }: Props) {
  const { rElement, isDragging, isOver, drag, drop } = useDragDrop({ context, item });
  const { isSelecting, isEditing, handleClick } = useOnClick(context, item);
  const className = classNames('drop-item', {
    'is-dragging': isDragging,
    'is-over': isOver,
    'is-empty': item.data?.length == 0
  });

  useEffect(() => {
    drag(drop(rElement));
  }, [rElement.current]);

  return (
    <div ref={rElement} data-id={`${item.id}`} className={className}>
      {(isSelecting && !isEditing) && <DropMenu onClick={handleClick} />}
      {children}
    </div>
  )
}

export default DropSection;