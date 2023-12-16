import { classNames } from "@/utils";
import { ContextValue, Field } from "./types";
import { useDragDrop, useOnClick } from "./hooks";
import DropMenu from "./drop.menu";
import { Text } from '../text';

interface IProps extends Field {
  context: ContextValue;
}

function DropElement({ context, ...item }: IProps) {
  const { rElement, isDragging, isOver, drag, drop } = useDragDrop({ context, item });
  const { isSelecting, isEditing, handleClick } = useOnClick(context, item);
  const className = classNames('drop-item', {
    'is-dragging': isDragging,
    'is-over': isOver,
  });

  drag(drop(rElement));

  return (
    <div className={className} data-id={`${item.id}`} ref={rElement}>
      {(isSelecting && !isEditing) && <DropMenu onClick={handleClick} />}
      <Text value={item.name} readOnly={!isEditing} />
    </div>
  )
}

export default DropElement;