import { useEffect } from "react";
import { classNames } from "@/utils";
import { ContextValue, Field } from "./types";
import { useDragDrop, useItem } from "./hooks";
import DropMenu from "./drop.menu";
import { OnChangeParams, TextEditor } from '../text';
import { Descendant } from "slate";

interface IProps extends Field {
  context: ContextValue;
}

function DropElement({ context, ...item }: IProps) {
  const { rElement, isDragging, isOver, drag, drop } = useDragDrop({ context, item });
  const { currentItem, isSelecting, isEditing, handleItemClick, handleMenuClick } = useItem(context, item);
  const className = classNames('drop-item', {
    'is-dragging': isDragging,
    'is-over': isOver,
  });

  const handleClick = () => { };

  const handleChange = ({ data, value }: OnChangeParams) => {
    console.log('ELEMENT CHANGE', data, value);
  };

  useEffect(() => {
    drag(drop(rElement));
  }, [rElement.current]);

  return (
    <div
      ref={rElement}
      className={className}
      data-id={`${item.id}`}
      onClick={handleItemClick}
    >
      {isSelecting && !isEditing && <DropMenu onClick={handleMenuClick} />}
      <TextEditor
        data={currentItem.data as Descendant[]}
        readOnly={!isEditing}
        onChange={handleChange}
        onClick={handleClick}
      />
    </div>
  );
}

export default DropElement;
