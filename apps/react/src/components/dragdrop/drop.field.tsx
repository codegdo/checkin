import { useState } from "react";
import { classNames } from "@/utils";
import { Input, Label } from "../input";
import { ContextValue, Field } from "./types";
import { useDragDrop, useOnClick } from "./hooks";
import DropMenu from "./drop.menu";
import DropEditor, { KeyValue } from "./drop.editor";

interface IProps extends Field {
  context: ContextValue;
}

function DropField({ context, ...item }: IProps) {
  const { ref, isDragging, isOver, drag, drop } = useDragDrop({ context, item });
  const { isSelecting, isEditing, handleClick } = useOnClick(context, item);
  const [field, setField] = useState(item);

  const className = classNames('drop-item', {
    'is-dragging': isDragging,
    'is-over': isOver,
  });

  const handleChange = ({ key, value }: KeyValue) => {
    setField(prevField => ({ ...prevField, [key]: value }));
  }

  drag(drop(ref));

  return (
    <div data-id={`${item.id}`} ref={ref} className={className}>
      {(isSelecting && !isEditing) && <DropMenu onClick={handleClick} />}

      <Label title={field.title} description={field.description} />
      <Input name={field.name} type={field.type} />

      {isEditing && <DropEditor field={field} onClick={handleClick} onChange={handleChange} />}
    </div>
  )
}

export default DropField;