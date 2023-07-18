import { PropsWithChildren, useEffect } from "react";
import { SortableContextValue } from "./sortable.provider";
import { ExtendedField } from "./types";
import { useSortable } from "./hooks";
import { classNames } from "../../utils";
import SortableHolder from "./sortable.holder";

type SortableListProps = PropsWithChildren<ExtendedField & {
  ctx: SortableContextValue;
}>;

function SortableList(props: SortableListProps) {
  const { ctx, siblings, children, ...item } = props;
  const { ref, previewRef, isOver, drag, drop, preview } = useSortable({ ctx, item, siblings });
  const className = classNames('sortable-column', {
    'is-over': isOver
  });

  useEffect(() => {
    drag(ref);
    drop(preview(previewRef));
  }, []);

  return (<div ref={previewRef} className={className}>
    <div ref={ref} className="sortable-title">List</div>
    <SortableHolder {...props}>{children}</SortableHolder>
  </div>)
}

export default SortableList;