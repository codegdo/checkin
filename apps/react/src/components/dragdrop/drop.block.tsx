import { PropsWithChildren } from "react";

import { classNames } from "@/utils";
import { DndField } from "./types";
import { useDragDrop } from "./hooks";
import { DndContextValue } from "./dragdrop.provider";

type DropBlockProps = PropsWithChildren<DndField & {
  context: DndContextValue;
}>;

function DropBlock({ context, children, ...item }: DropBlockProps) {
  const { ref, isOver, drag, drop } = useDragDrop({ context, item });
  const className = classNames('drop-item', {
    'is-over': isOver
  });

  drag(drop(ref));

  return (<div ref={ref} id={`${item.id}`} className={className}>
    {children}
  </div>)
}

export default DropBlock;