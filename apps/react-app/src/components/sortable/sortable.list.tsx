import { PropsWithChildren } from "react";
import { SortableContextValue } from "./sortable.provider";
import { Field } from "./types";
import { useSortable } from "./hooks";
import { classNames } from "../../utils";

type SortableListProps = PropsWithChildren<Field & {
  ctx: SortableContextValue;
}>;

function SortableList({ctx, children, ...item}: SortableListProps) {
  const {ref, isOver, drag, drop} = useSortable({ctx, item});
  const className = classNames('sortable-list', {
    'is-over': isOver
  });
  drag(drop(ref));
  return (<div ref={ref} id={`${item.id}`} className={className}>{children}</div>)
}

export default SortableList;