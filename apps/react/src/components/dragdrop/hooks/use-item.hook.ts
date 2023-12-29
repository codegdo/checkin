import { useEffect, useState } from "react";
import { ActionType, ContextValue, Field, KeyValue } from "../types";

export function useItem(context: ContextValue, item: Field) {
  const { current, state, dispatch } = context;
  const [currentItem, setItem] = useState(item);

  const isItemSelected = current.selectedItem?.item?.id === item.id;
  const isSelecting = isItemSelected ? state.isSelecting ?? false : false;
  const isEditing = isItemSelected ? state.isEditing ?? false : false;

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
        dispatch({
          type: name,
          payload: {
            removeItem: current.selectedItem?.item,
          },
        });
        current.selectedItem = null;
        delete current.elementRef[`${item.id}`];
        break;
    }
  };

  const shouldIgnoreButtonClick = (event: React.MouseEvent<Element>): boolean => {
    const target = event.target as Element;
    return target.getAttribute('type') === 'button';
  };

  const updateItem = (selectedItem: Field) => {
    let updatedItem = { ...selectedItem };
    if (selectedItem?.dataType === 'section' || selectedItem?.dataType === 'block') {
      updatedItem = { ...updatedItem, data: [] };
    }
    return updatedItem;
  };

  const shouldUpdateItem = (updatedItem: Field) => {
    const oldItem = state.data.find((item) => item.id === updatedItem?.id);
    return JSON.stringify(oldItem) !== JSON.stringify(updatedItem);
  };

  const handleItemUpdate = () => {
    if (current.selectedItem?.item) {
      const selectedItem = current.selectedItem.item;
      const updatedItem = updateItem(selectedItem);

      if (shouldUpdateItem(updatedItem)) {
        dispatch({
          type: ActionType.UPDATE_ITEM,
          payload: { updatedItem },
        });
      }

      context.current.selectedItem = null;
    }
  }

  const handleItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (shouldIgnoreButtonClick(event)) return;

    handleItemUpdate();

    current.selectedItem = isItemSelected ? null : {
      item: { ...currentItem },
      target: event.currentTarget,
      callback: { onChange }
    };

    dispatch({ type: isItemSelected ? ActionType.UNSELECT_ITEM : ActionType.SELECT_ITEM });
  };

  useEffect(() => {
    // Sync item when undoing
    if (state.isUndoing) {
      if (JSON.stringify(item) !== JSON.stringify(currentItem)) {
        console.log('SYNC ITEM');
        setItem(item);
      }
    }
  }, [item, state.isUndoing]);

  return {
    currentItem,
    isSelecting,
    isEditing,
    handleMenuClick,
    handleItemClick,
    onChange
  };
}
