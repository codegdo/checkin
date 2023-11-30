import { classNames } from "@/utils";
import { ContextValue, Field } from "./types";
import { useSortable } from "./hooks";

interface IProps extends Field {
  context: ContextValue;
}

function DropField({ context, ...item }: IProps) {
  const { ref, isDragging, isOver, drag, drop } = useSortable({ context, item });
  const className = classNames('sortable-item', {
    'is-dragging': isDragging,
    'is-over': isOver
  });

  drag(drop(ref));

  return (
    <div className={className} data-id={`${item.id}`} ref={ref}>
      <label>{`${item.name} ${item.id}`}</label>
    </div>
  )
}

export default DropField;