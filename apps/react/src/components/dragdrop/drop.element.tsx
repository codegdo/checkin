import { useEffect, MouseEvent } from "react";
import parse from 'html-react-parser';

import { classNames } from "@/utils";
import { ContextValue, TextData, Field } from "./types";
import { useDragDrop, useItem } from "./hooks";
import DropMenu from "./drop.menu";
import { TextEditor } from '../text';

import { dndHelper } from "./helpers";
import { IButtonBlock, IButtonMark } from "../text/types";

interface IProps extends Field {
  context: ContextValue;
}

const markButtons = [
  { name: 'bold', icon: '' },
  { name: 'code', icon: '' },
  { name: 'italic', icon: '' },
  { name: 'underline', icon: '' },
  { name: 'strikethrough', icon: '' },
];

const textButtons = [
  { name: 'heading-one', icon: '' },
  { name: 'heading-two', icon: '' },
  { name: 'block-quote', icon: '' },
];

const listButtons = [
  { name: 'numbered-list', icon: '' },
  { name: 'bulleted-list', icon: '' },
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

  const data = (currentItem.data as unknown) as TextData[];
  const isTextEmpty = dndHelper.isTextEmpty(data);

  const className = classNames('drop-item', {
    'is-dragging': isDragging,
    'is-over': isOver,
    'is-text-empty': isTextEmpty
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
    const textValue = (currentItem.value || '').replace(/\n/g, '<br/>');

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
            markButtons: markButtons as IButtonMark[],
            textButtons: textButtons as IButtonBlock[],
            listButtons: listButtons as IButtonBlock[]
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
