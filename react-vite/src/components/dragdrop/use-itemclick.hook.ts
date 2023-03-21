import React from 'react';
import { defaultDndRef, defaultDndState, DndAction, DndActionTypes, DndRef, DndState } from './dragdrop.context';
import { DndActionClickType, DndItem } from './dragdrop.type';

type UseItemClickReturn = {
  handleItemClick: (e: React.MouseEvent<HTMLDivElement>) => void,
  handleClick: (actionType: string) => void
}

function useItemClick<T extends HTMLElement = HTMLElement>(
  item: DndItem,
  dndRef: DndRef = defaultDndRef,
  state: DndState = defaultDndState,
  dispatch: React.Dispatch<DndAction> = () => console.log('dispatch'),
): UseItemClickReturn {
  const { id } = item;

  const handleChange = () => {
    console.log('on-change');
  }

  const handleClick = (actionType: string) => {
    switch (actionType) {
      case DndActionClickType.MENU_EDIT:
        dispatch?.({
          type: DndActionTypes.SET_SELECTED_ITEM_ACTIVE,
          payload: true
        });
        break;
      case DndActionClickType.MENU_CLONE:
        dispatch?.({
          type: DndActionTypes.CLONE_ITEM,
          payload: item
        });
        break;
      case DndActionClickType.MENU_REMOVE:
        //if (dndRef?.elementRef) delete dndRef.elementRef[`${id}`];
        dispatch?.({
          type: DndActionTypes.REMOVE_ITEM,
          payload: item
        });
        break;
      default:
    }
  }

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const selectedItem = (state?.item?.id == id) ? null : {
      ...item,
      isEdit: false,
      onChange: handleChange,
      onClick: handleClick
    };

    console.log(selectedItem);

    dispatch?.({
      type: DndActionTypes.SET_SELECTED_ITEM,
      payload: selectedItem
    });
  }

  return { handleItemClick, handleClick }
}

export default useItemClick;