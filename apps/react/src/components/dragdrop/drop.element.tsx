import { classNames } from "@/utils";
import { ContextValue, Field } from "./types";
import { useDragDrop, useOnClick } from "./hooks";
import DropMenu from "./drop.menu";
import DropEditor from "./drop.editor";

interface IProps extends Field {
  context: ContextValue;
}

function DropElement({ context, ...item }: IProps) {
  const { ref, isDragging, isOver, drag, drop } = useDragDrop({ context, item });
  const { isSelecting, isEditing, handleClick } = useOnClick(context, item);
  const className = classNames('drop-item', {
    'is-dragging': isDragging,
    'is-over': isOver,
  });

  drag(drop(ref));

  return (
    <div className={className} data-id={`${item.id}`} ref={ref}>
      {isSelecting && <DropMenu onClick={handleClick} />}
      <label>{`${item.name} ${item.id}`}</label>
      {isEditing && <DropEditor onClick={handleClick} />}
    </div>
  )
}

export default DropElement;