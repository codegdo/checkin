import { PropsWithChildren } from "react";

import { classNames } from "@/utils";
import { ContextValue, Field } from "./types";
import { useDragDrop } from "./hooks";

type Props = PropsWithChildren<Field & {
  context: ContextValue;
}>;

function DropArea({ context, children, ...item }: Props) {
  const { ref, isOver, drop } = useDragDrop({ context, item });
  const className = classNames('drop-item', {
    'is-over': isOver,
  });

  drop(ref);

  return (<div ref={ref} id={`${item.id}`} className={className}>
    {children}
  </div>)
}

export default DropArea;