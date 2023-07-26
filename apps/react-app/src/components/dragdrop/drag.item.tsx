import { utils } from "@libs/shared-code";
import { GroupType, DndContextValue, Field } from "../types";
import { useDragDrop } from './hooks';
import { dndHelper } from "./helpers";

type DragItemProps = Field & {
  ctx: DndContextValue;
};
function DragItem({ ctx, ...item }: DragItemProps) {
  const isDragEnabled = dndHelper.isDragEnabled(ctx.state.data, item, (item) => item.group === GroupType.FIELD);
  const { ref, drag, isDragging } = useDragDrop({ item, ctx, draggable: isDragEnabled });

  const classNames = utils.classNames('drag-item', {
    'is-dragging': isDragging,
    'is-disabled': !isDragEnabled
  });

  //drag(ref);

  return (
    <div ref={drag} className={classNames}>
      {`DRAG_ITEM ${item.group}`}
    </div>
  )
}

export default DragItem;