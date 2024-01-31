import { PropsWithChildren, useEffect } from "react";
import { SortableContextValue } from "./sortable.provider";
import { SortableField } from "./types";
import { useSortable } from "./hooks";
import utils from "../../utils";
import SortablePlaceholder from "./sortable.placeholder";

type SortableListProps = PropsWithChildren<SortableField & {
  ctx: SortableContextValue;
}>;

function SortableList(props: SortableListProps) {
  const { ctx, siblings, children, ...item } = props;
  const { ref, previewRef, isDragging, isOver, drag, drop, preview } = useSortable({ ctx, item, siblings });
  const className = utils.classNames('sortable-column', {
    'is-dragging': isDragging,
    'is-over': isOver,
  });

  useEffect(() => {
    drag(ref);
    drop(preview(previewRef));
  }, [drag, drop, preview, previewRef, ref]);

  return (<div ref={previewRef} className={className}>
    <div ref={ref} className="sortable-title">List</div>
    <SortablePlaceholder {...props} dataType="holder">{children}</SortablePlaceholder>
  </div>)
}

export default SortableList;