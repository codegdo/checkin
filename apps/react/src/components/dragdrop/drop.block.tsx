import { PropsWithChildren } from "react";

import { classNames } from "@/utils";
import { ContextValue, Field } from "./types";
import { useDragDrop } from "./hooks";

type Props = PropsWithChildren<Field & {
  context: ContextValue;
}>;

function DropBlock({ context, children, ...item }: Props) {
  const { ref, isDragging, isOver, drag, drop } = useDragDrop({ context, item });
  const className = classNames('drop-item', {
    'is-dragging': isDragging,
    'is-over': isOver,
    'is-empty': item.data?.length == 0
  });

  drag(drop(ref));

  return (<div ref={ref} data-id={`${item.id}`} className={className}>
    {children}
  </div>)
}

export default DropBlock;