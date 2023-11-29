import { PropsWithChildren } from "react";
import { SortableContextValue } from "./sortable.provider";
import { SortableField } from "./types";
import { useSortable } from "./hooks";
import { classNames } from "../../utils";

type SortablePlaceholderProps = PropsWithChildren<SortableField & {
  ctx: SortableContextValue;
}>;

function SortablePlaceholder({ ctx, siblings, children, ...item }:SortablePlaceholderProps) {
  const { ref, isOver, drop } = useSortable({ ctx, item, siblings });
  const className = classNames('sortable-list', {
    'is-over': isOver
  });

  drop(ref);

  return (<div ref={ref} id={`${item.id}`} className={className}>
    {children}
  </div>)
}

export default SortablePlaceholder;