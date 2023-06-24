import { utils } from "@libs/shared-code";
import { DataType, DndContextValue, Field } from "../types";
import { useDragDrop } from './hooks';
import { dndHelper } from "./helpers";

type DragItemProps = Field & {
  ctx: DndContextValue;
};
function DragItem({ ctx, ...item }: DragItemProps) {
  const isDragEnabled = dndHelper.isDragEnabled(ctx.state.data, item, (item) => item.dataType === DataType.FIELD );
  const {ref, drag, isDragging } = useDragDrop({ item, ctx, draggable: isDragEnabled });

  const classNames = utils.classNames('drag-item', {
    'is-dragging': isDragging,
    'is-disabled': !isDragEnabled
  });

  drag(ref);
  
  return (
    <div ref={ref} className={classNames}>
      {`DRAG_ITEM ${item.dataType}`}
    </div>
  )
}

export default DragItem;