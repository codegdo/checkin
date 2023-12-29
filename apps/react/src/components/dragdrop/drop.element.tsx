import { useEffect, MouseEvent } from "react";
import { classNames } from "@/utils";
import { ContextValue, Field } from "./types";
import { useDragDrop, useItem } from "./hooks";
import DropMenu from "./drop.menu";
import { TextEditor } from '../text';
import { Descendant } from "slate";
import parse from 'html-react-parser';

interface IProps extends Field {
  context: ContextValue;
}

function DropElement({ context, ...item }: IProps) {
  const {
    currentItem,
    isSelecting,
    isEditing,
    handleItemClick,
    handleMenuClick,
    onChange
  } = useItem(context, item);

  const { rElement, isDragging, isOver, drag, drop } = useDragDrop({
    context,
    item,
    draggable: !isEditing
  });

  const className = classNames('drop-item', {
    'is-dragging': isDragging,
    'is-over': isOver,
  });

  const handleOnDragStart = (event: MouseEvent<HTMLDivElement>) => {
    if (isEditing) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  useEffect(() => {
    drag(drop(rElement));
  }, [rElement.current]);

  const renderContent = () => {
    const parsedValue = parse((currentItem.value || '').replace('\n', '<br/>'));

    if (isSelecting && !isEditing) {
      return (
        <>
          <DropMenu onClick={handleMenuClick} />
          {parsedValue}
        </>
      );
    } else if (isEditing) {
      return (
        <TextEditor
          key={item.id}
          id={item.id}
          selectedId={currentItem.id}
          data={currentItem.data as Descendant[]}
          isEditing={isEditing}
          isSelected={context.current.selectedItem?.item?.id === currentItem.id}
          onChange={onChange}
        />
      );
    }
    return parsedValue;
  };

  return (
    <div
      ref={rElement}
      className={className}
      data-id={`${item.id}`}
      onClick={handleItemClick}
      onDragStart={handleOnDragStart}
    >
      {renderContent()}
    </div>
  );
}

export default DropElement;
