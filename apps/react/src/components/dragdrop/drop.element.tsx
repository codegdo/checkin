import { useEffect, MouseEvent } from "react";
import parse from 'html-react-parser';

import { classNames } from "@/utils";
import { ContextValue, TextData, Field } from "./types";
import { useDragDrop, useItem } from "./hooks";
import DropMenu from "./drop.menu";
import { TextEditor } from '../text';

import { dndHelper } from "./helpers";
import { IBlockButton, IMarkButton } from "../text/types";

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

const formatingButtons = [
  { name: 'block', format: 'heading-one', icon: '' },
  { name: 'block', format: 'heading-two', icon: '' },
  { name: 'block', format: 'block-quote', icon: '' },
];

const listButtons = [
  { name: 'block', format: 'numbered-list', icon: '' },
  { name: 'block', format: 'bulleted-list', icon: '' },
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
            mark: markButtons as IMarkButton[],
            formating: formatingButtons as IBlockButton[],
            list: listButtons as IBlockButton[]
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
