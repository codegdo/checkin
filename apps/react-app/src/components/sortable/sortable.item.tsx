import { classNames } from "../../utils";
import { useSortable } from "./hooks";
import { SortableContextValue } from "./sortable.provider";
import { ExtendedField, Field } from "./types";

type SortableItemProps = ExtendedField & {
  ctx: SortableContextValue;
};

const renderItem = (item: Field) => {
  switch (item.group) {
    default:
      return <>{`item-${item.id}`}</>
  }
}

function SortableItem({ ctx, siblings, ...item }: SortableItemProps) {
  const { ref, isDragging, isOver, drag, drop } = useSortable({ ctx, item, siblings });
  const className = classNames('sortable-item', {
    'is-over': isOver,
    'is-dragging': isDragging
  });
  drag(drop(ref));

  return (
    <div ref={ref} id={`${item.id}`} className={className}>
      {renderItem(item)}
    </div>
  );
}

export default SortableItem;