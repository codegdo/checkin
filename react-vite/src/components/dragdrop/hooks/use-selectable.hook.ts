import React, { MouseEvent, useState } from 'react';
import { ActionClickType } from '../../../constants';
import { defaultDndRef, defaultDndState, DndAction, DndRef, DndState } from '../dragdrop.context';
import { DndItem, DndActionType } from '../dragdrop.type';


type useSelectableProps = {
  item: DndItem;
  dndRef?: DndRef;
  dndState?: DndState;
  dispatch?: React.Dispatch<DndAction>;
};

export function useSelectable({
  item,
  dndRef,
  dndState,
  dispatch = () => console.log("dispatch"),
}: useSelectableProps) {

  const [currentItem, setCurrentItem] = useState<DndItem>(item);

  const handleChange = (updateItem: Partial<DndItem>) => {
    console.log("on-change", updateItem);
  };

  const handleActionClick = (actionType: string) => {
    switch (actionType) {
      case ActionClickType.MENU_EDIT:
        dispatch?.({
          type: DndActionType.SET_SELECTED_ITEM_EDIT,
          payload: true,
        });
        break;
      case ActionClickType.MENU_CLONE:
        dispatch?.({
          type: DndActionType.CLONE_ITEM,
          payload: item,
        });
        break;
      case ActionClickType.MENU_REMOVE:
        dispatch?.({
          type: DndActionType.REMOVE_ITEM,
          payload: item,
        });
        if (dndRef?.domRef) delete dndRef.domRef[`${currentItem.id}`];
        break;
      default:
        console.log("click");
    }
  };

  const handleElementClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const newSelectedItem = dndState?.item?.id === currentItem.id ? null : {
      ...currentItem,
      isEdit: false,
      onChange: handleChange,
      onClick: handleActionClick,
    };

    console.log(newSelectedItem);

    dispatch?.({
      type: DndActionType.SET_SELECTED_ITEM,
      payload: newSelectedItem,
    });
  };

  return { currentItem, handleActionClick, handleElementClick };
};