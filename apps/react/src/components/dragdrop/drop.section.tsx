import { PropsWithChildren } from "react";

import { classNames } from "@/utils";
import { ContextValue, Field } from "./types";
import { useDragDrop } from "./hooks";

type Props = PropsWithChildren<Field & {
  context: ContextValue;
}>;

function DropSection({ context, children, ...item }: Props) {
  const { ref, isDragging, isOver, drag, drop } = useDragDrop({ context, item });
  const className = classNames('drop-item', {
    'is-dragging': isDragging,
    'is-over': isOver,
  });

  drag(drop(ref));

  return (<div ref={ref} id={`${item.id}`} className={className}>
    {children}
  </div>)
}

export default DropSection;