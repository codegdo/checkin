import utils from "../../utils";
import { useSortable } from "./hooks";
import { SortableContextValue } from "./sortable.provider";
import { SortableField, DndField } from "./types";

type SortableItemProps = SortableField & {
  ctx: SortableContextValue;
};

const renderItem = (item: DndField) => {
  switch (item.name) {
    default:
      return item.id == '2' ?
        <>{`item-${item.id}`}<br /> hello<br /> there</> :
        item.id == '3' ?
          <>{`item-${item.id}`}<br /> hello</> :
          <>{`item-${item.id}`}</>
  }
}

function SortableItem({ ctx, siblings, ...item }: SortableItemProps) {
  const { ref, isDragging, isOver, drag, drop } = useSortable({ ctx, item, siblings });
  const className = utils.classNames('sortable-item', {
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