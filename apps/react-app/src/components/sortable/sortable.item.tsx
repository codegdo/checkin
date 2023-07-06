import { classNames } from "../../utils";
import { useSortable } from "./hooks";
import { SortableContextValue } from "./sortable.provider";
import { Field } from "./types";

type SortableItemProps = Field & {
  ctx: SortableContextValue;
};

function SortableItem({ ctx, ...item }: SortableItemProps) {
  const { ref, isDragging, isOver, drag, drop } = useSortable({ ctx, item });
  const className = classNames('sortable-item', {
    'is-over': isOver,
    'is-dragging': isDragging
  });
  drag(drop(ref));
  return (<div ref={ref} id={`${item.id}`} className={className}>{`item-${item.id}`}</div>)
}

export default SortableItem;