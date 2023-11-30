import { PropsWithChildren } from "react";

import { classNames } from "@/utils";
import { ContextValue, Field } from "./types";
import { useSortable } from "./hooks";

type Props = PropsWithChildren<Field & {
  context: ContextValue;
}>;

function SortableArea({ context, children, ...item }: Props) {
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