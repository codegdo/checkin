import { useEffect, MouseEvent } from "react";
import { classNames } from "@/utils";
import { ContextValue, Field } from "./types";
import { useDragDrop, useItem } from "./hooks";
import DropMenu from "./drop.menu";
import { TextEditor } from '../text';
import { Descendant } from "slate";

interface IProps extends Field {
  context: ContextValue;
}

function DropElement({ context, ...item }: IProps) {
  const { currentItem, isSelecting, isEditing, handleItemClick, handleMenuClick, onChange } = useItem(context, item);
  const { rElement, isDragging, isOver, drag, drop } = useDragDrop({ context, item, draggable: !isEditing });

  const className = classNames('drop-item', {
    'is-dragging': isDragging,
    'is-over': isOver,
  });

  const handleOnDragStart = (event: MouseEvent<HTMLDivElement>) => {
    if (isEditing) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  useEffect(() => {
    drag(drop(rElement));
  }, [rElement.current]);

  return (
    <div
      ref={rElement}
      className={className}
      data-id={`${item.id}`}
      onClick={handleItemClick}
      onDragStart={handleOnDragStart}
    >
      {isSelecting && !isEditing && <DropMenu onClick={handleMenuClick} />}
      <TextEditor
        key={item.id}
        id={item.id}
        selectedId={currentItem.id}
        data={currentItem.data as Descendant[]}
        isEditing={isEditing}
        isSelected={context.current.selectedItem?.item?.id === currentItem.id}
        onChange={onChange}
      />
    </div>
  );
}

export default DropElement;
