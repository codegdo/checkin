import { DndContextValue, Field } from "../types";
import { useDragDrop } from './hooks';

type DragItemProps = Field & {
  ctx: DndContextValue;
};
function DragItem({ ctx, ...item }: DragItemProps) {
  const { drag } = useDragDrop({ item, ctx });
  return (
    <div ref={drag}>
      DRAG_ITEM
    </div>
  )
}

export default DragItem;