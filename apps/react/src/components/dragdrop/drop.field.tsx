import { useEffect } from "react";
import utils from "@/utils";
import { Input, Label } from "../input";
import { ContextValue, Field } from "./types";
import { useDragDrop, useItem } from "./hooks";
import DropMenu from "./drop.menu";

interface IProps extends Field {
  context: ContextValue;
}

function DropField({ context, ...item }: IProps) {
  const { currentItem, isSelecting, isEditing, handleItemClick, handleMenuClick } = useItem(context, item);
  const { rElement, isDragging, isOver, drag, drop } = useDragDrop({ context, item });

  const className = utils.classNames('drop-item', {
    'is-dragging': isDragging,
    'is-over': isOver,
  });

  // const onChange = ({ key, value }: any) => {
  //   setField(prevField => ({ ...prevField, [key]: value }));
  // }

  useEffect(() => {
    drag(drop(rElement));
  }, [rElement.current]);

  // useEffect(() => {
  //   const selectedRef = context.current.selectedRef || {};

  //   if(context.state.isSelecting && item.id == selectedRef.item?.id) {
  //     context.current.selectedRef = {...selectedRef, event: {onChange}};
  //   }
  // }, [item, context.state.isSelecting]);

  return (
    <div
      ref={rElement}
      className={className}
      data-id={`${item.id}`}
      onClick={handleItemClick}
    >
      {(isSelecting && !isEditing) && <DropMenu onClick={handleMenuClick} />}

      <Label title={currentItem.title} description={currentItem.description} />
      <Input name={currentItem.name} type={currentItem.type} />
    </div>
  )
}

export default DropField;