import { PropsWithChildren } from "react";
import { SortableContextValue } from "./sortable.provider";
import { SortableField } from "./types";
import { useSortable } from "./hooks";
import { classNames } from "../../utils";

type SortableAreaProps = PropsWithChildren<SortableField & {
  ctx: SortableContextValue;
}>;

function SortableArea({ ctx, siblings, children, ...item }: SortableAreaProps) {
  const { ref, isOver, drop } = useSortable({ ctx, item, siblings });
  const className = classNames('sortable-area', {
    'is-over': isOver
  });

  drop(ref);

  return (<div ref={ref} id={`${item.id}`} className={className}>
    {children}
  </div>)
}

export default SortableArea;