import { PropsWithChildren } from "react";

import { classNames } from "@/utils";
import { ContextValue, Field } from "./types";
import { useDragDrop, useOnClick } from "./hooks";
import DropMenu from "./drop.menu";
import DropEditor from "./drop.editor";

type Props = PropsWithChildren<Field & {
  context: ContextValue;
}>;

function DropSection({ context, children, ...item }: Props) {
  const { ref, isDragging, isOver, drag, drop } = useDragDrop({ context, item });
  const { isSelecting, isEditing, handleClick } = useOnClick(context, item);
  const className = classNames('drop-item', {
    'is-dragging': isDragging,
    'is-over': isOver,
    'is-empty': item.data?.length == 0
  });

  drag(drop(ref));

  return (
    <div ref={ref} data-id={`${item.id}`} className={className}>
      {isSelecting && <DropMenu onClick={handleClick} />}
      {children}
      {isEditing && <DropEditor onClick={handleClick} />}
    </div>
  )
}

export default DropSection;