import { classNames } from "@/utils";
import { ContextValue, Field } from "./types";
import { useDragDrop } from "./hooks";

interface IProps extends Field {
  context: ContextValue;
}

function DropField({ context, ...item }: IProps) {
  const { ref, isDragging, isOver, drag, drop } = useDragDrop({ context, item });
  const className = classNames('drop-item', {
    'is-dragging': isDragging,
    'is-over': isOver,
  });

  drag(drop(ref));

  return (
    <div id={`${item.id}`} ref={ref} className={className}>
      <label>{`${item.name} ${item.id}`}</label>
    </div>
  )
}

export default DropField;