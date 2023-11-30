import { PropsWithChildren } from "react";

import { classNames } from "@/utils";
import { SortableField } from "./types";
import { useSortable } from "./hooks";
import { SortableContextValue } from "./sortable.provider";

type SortableAreaProps = PropsWithChildren<SortableField & {
  context: SortableContextValue;
}>;

function SortableArea({ context, children, ...item }: SortableAreaProps) {
  const { ref, isOver, drop } = useSortable({ context, item });
  const className = classNames('sortable-area', {
    'is-over': isOver
  });

  drop(ref);

  return (<div ref={ref} id={`${item.id}`} className={className}>
    {children}
  </div>)
}

export default SortableArea;