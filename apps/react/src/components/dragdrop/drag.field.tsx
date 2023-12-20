import { classNames } from "@/utils";
import { ContextValue, DataType, Field } from "./types";
import { useDragDrop } from "./hooks";
import { dndHelper } from "./helpers";

interface IProps extends Field {
  context: ContextValue;
}

function DragField({ context, ...item }: IProps) {

  const isDragEnabled = dndHelper.isDragEnabled(context.state.dataValue, item, (item) => item.dataType === DataType.FIELD);
  const { isDragging, drag } = useDragDrop({ context, item, draggable: isDragEnabled });

  const className = classNames('drag-item', {
    'is-dragging': isDragging,
    'is-disabled': !isDragEnabled
  });

  return (
    <div ref={drag} className={className}>
      {`${item.title}`}
    </div>
  )
}

export default DragField;