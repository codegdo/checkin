import { classNames } from "../../utils";
import { useSortable } from "./hooks";
import { SortableContextValue } from "./sortable.provider";
import { ExtendedField } from "./types";

type SortableItemProps = ExtendedField & {
  ctx: SortableContextValue;
};

function SortableItem({ ctx, siblings, ...item }: SortableItemProps) {
  const { ref, isDragging, isOver, drag, drop } = useSortable({ ctx, item, siblings });
  const className = classNames('sortable-item', {
    'is-over': isOver,
    'is-dragging': isDragging
  });
  drag(drop(ref));
  return (<div ref={ref} id={`${item.id}`} className={className}>{`item-${item.id}`}</div>)
}

export default SortableItem;