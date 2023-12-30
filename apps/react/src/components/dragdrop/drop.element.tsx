import { useEffect, MouseEvent } from "react";
import parse from 'html-react-parser';

import { classNames } from "@/utils";
import { ContextValue, TextData, Field } from "./types";
import { useDragDrop, useItem } from "./hooks";
import DropMenu from "./drop.menu";
import { TextEditor } from '../text';

import { dndHelper } from "./helpers";
import { MarkButton } from "../text/types";

interface IProps extends Field {
  context: ContextValue;
}

const markButtons = [
  { name: 'mark', format: 'bold', icon: '' },
  { name: 'mark', format: 'code', icon: '' },
  { name: 'mark', format: 'italic', icon: '' },
  { name: 'mark', format: 'underline', icon: '' },
  { name: 'mark', format: 'strikethrough', icon: '' },
];

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
    const textPlaceholder = 'Enter some plain text...';
    const placeholder = `<span style="opacity: 0.3;">${textPlaceholder}</span>`;
    const data = (currentItem.data as unknown) as TextData[];
    const isTextEmpty = dndHelper.isTextEmpty(data);
    const textValue = ((isTextEmpty ? placeholder : currentItem.value) || placeholder).replace(/\n/g, '<br/>');

    const parsedValue = parse((textValue));

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
          id={item.id}
          data={data}
          placeholder={textPlaceholder}
          options={{
            markButtons: markButtons as MarkButton[]
          }}
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
