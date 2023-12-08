import { classNames } from "@/utils";
import { ContextValue, Field } from "./types";
import { useDragDrop, useSelect } from "./hooks";
import DropMenu from "./drop.menu";
import DropEditor from "./drop.editor";

interface IProps extends Field {
  context: ContextValue;
}

function DropField({ context, ...item }: IProps) {
  const { ref, isDragging, isOver, drag, drop } = useDragDrop({ context, item });
  const { isSelecting, isEditing, onClick } = useSelect(context, item);
  const className = classNames('drop-item', {
    'is-dragging': isDragging,
    'is-over': isOver,
  });

  drag(drop(ref));

  return (
    <div data-id={`${item.id}`} ref={ref} className={className}>
      {isSelecting && <DropMenu onCallback={onClick} />}
      <label>{`${item.name} ${item.id}`}</label>
      {isEditing && <DropEditor onCallback={onClick} />}
    </div>
  )
}

export default DropField;