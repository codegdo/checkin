import { PropsWithChildren } from "react";

import { classNames } from "@/utils";
import { DndField } from "./types";
import { useDragDrop } from "./hooks";
import { DndContextValue } from "./dragdrop.provider";

type DragDropAreaProps = PropsWithChildren<DndField & {
  context: DndContextValue;
}>;

function DropArea({ context, children, ...item }: DragDropAreaProps) {
  const { ref, isOver, drop } = useDragDrop({ context, item });
  const className = classNames('drop-area', {
    'is-over': isOver
  });

  drop(ref);

  return (<div ref={ref} id={`${item.id}`} className={className}>
    {children}
  </div>)
}

export default DropArea;