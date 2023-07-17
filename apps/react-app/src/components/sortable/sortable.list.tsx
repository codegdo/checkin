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
  const className = classNames({
    'sortable-area': item.group == 'area',
    'sortable-list': item.group !== 'area',
    'is-over': isOver
  });

  //drag(ref);
  //drop(preview(previewRef));

  useEffect(() => {
    drag(ref);
    drop(preview(previewRef));
  }, []);

  //drag(drop(ref));
  //drag(ref);
  //drop(preview(previewRef));

  return (<div ref={previewRef} className={className}>
    {item.group !== 'area' && <div ref={ref}>List</div>}
    {item.group !== 'area'
      ? <SortableHolder {...props}>{children}</SortableHolder>
      : children
    }
  </div>)
}

export default SortableList;