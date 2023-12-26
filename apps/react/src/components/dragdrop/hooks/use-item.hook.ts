import { useEffect, useState } from "react";
import { ActionType, ContextValue, Field, KeyValue } from "../types";

export function useItem(context: ContextValue, item: Field) {
  const { current, state, dispatch } = context;
  const [currentItem, setItem] = useState(item);

  const match = current.selectedItem?.item?.id === item.id;
  const isSelecting = match ? state.isSelecting ?? false : false;
  const isEditing = match ? state.isEditing ?? false : false;

  const onChange = (keyvalue: KeyValue) => {
    setItem((prevItem) => {
      const updatedItem = { ...prevItem, ...keyvalue };

      if (current.selectedItem) {
        current.selectedItem.item = { ...updatedItem };
      }

      return updatedItem;
    });
  };

  const handleMenuClick = (name: keyof typeof ActionType) => {
    switch (name) {
      case ActionType.OPEN_EDITING:
        !isEditing && dispatch({ type: name });
        break;
      case ActionType.CLOSE_EDITING:
        dispatch({ type: name });
        break;
      case ActionType.REMOVE_ITEM:
        delete current.elementRef[`${item.id}`];
        dispatch({
          type: name,
          payload: {
            removeItem: current.selectedItem?.item,
          },
        });
        break;
      default:
        break;
    }
  };

  const handleItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    // update item
    if (current.selectedItem) {
      // check item change
      const oldItem = state.data.find(item => item.id == current.selectedItem?.item?.id);
      const hasChanged = JSON.stringify(oldItem) !== JSON.stringify(current.selectedItem?.item);

      if (hasChanged) {
        dispatch({
          type: ActionType.UPDATE_ITEM,
          payload: { updatedItem: { ...currentItem } },
        });
      }
    }

    if (match) {
      current.selectedItem = null;
      dispatch({ type: ActionType.UNSELECT_ITEM });
      return;
    }

    current.selectedItem = {
      item: { ...currentItem },
      target: event.currentTarget,
      callback: { onChange }
    };

    dispatch({ type: ActionType.SELECT_ITEM });
  };

  useEffect(() => {
    if (state.isUndoing) {
      if (JSON.stringify(item) !== JSON.stringify(currentItem)) {
        console.log('SYNC ITEM');
        setItem(item);
      }
    }
  }, [currentItem, item, state.isUndoing]);

  return {
    currentItem,
    isSelecting,
    isEditing,
    handleMenuClick,
    handleItemClick,
  };
}
