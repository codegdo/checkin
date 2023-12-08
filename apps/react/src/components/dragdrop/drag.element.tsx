import { classNames } from "@/utils";
import { ContextValue, Field } from "./types";
import { useDragDrop } from "./hooks";

interface IProps extends Field {
  context: ContextValue
}

function DragElement({ context, ...item }: IProps) {

  const { isDragging, drag } = useDragDrop({ context, item });
  //const isDragEnabled = dndHelper.isDragEnabled(ctx.state.data, item, (item) => item.dataType === DataType.FIELD);

  const className = classNames('drag-item', {
    'is-dragging': isDragging,
    //'is-disabled': !isDragEnabled
  });

  return (
    <div ref={drag} className={className}>
      {`${item.type}`}
    </div>
  )
}

export default DragElement;