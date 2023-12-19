
import { useState } from "react";
import { ActionType, ContextValue, Field } from "../types";


export function useItem(context: ContextValue, item: Field) {
  const [currentItem, setCurrentItem] = useState({ ...item });
  const { current, state, dispatch } = context;
  const { item: selectedItem } = current.selectedItem || {};
  const { isSelecting, isEditing } = state;

  const match = selectedItem?.id == item.id;
  const onSelecting = match ? isSelecting ?? false : false;
  const onEditing = match ? isEditing ?? false : false;

  const onChange = (keyvalue: any) => {
    console.log(keyvalue);
    //setCurrentItem(prevItem => ({ ...prevItem, [key]: value }));
  }

  const onClick = () => {
    console.log('click');
  }

  const handleMenuClick = (name: keyof typeof ActionType) => {
    switch (name) {
      case ActionType.OPEN_EDITING:
        !isEditing && dispatch({ type: name });
        break;
      case ActionType.CLOSE_EDITING:
        dispatch({ type: name });
        break;
      case ActionType.REMOVE_ITEM:
        delete context.current.elementRef[`${item.id}`];

        dispatch({
          type: name,
          payload: {
            removeItem: selectedItem
          }
        });
        break;
      default:
    }
  }

  const handleItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (match) {
      context.current.selectedItem = null;
      context.dispatch({ type: ActionType.UNSELECT_ITEM, });
      return;
    }

    context.current.selectedItem = { item, target: event.currentTarget, callback: { onChange, onClick } };
    context.dispatch({ type: ActionType.SELECT_ITEM });
  }

  return {
    currentItem,
    isSelecting: onSelecting,
    isEditing: onEditing,
    handleMenuClick,
    handleItemClick
  }
}