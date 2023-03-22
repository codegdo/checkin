import React from 'react';
import { ActionClickType } from '../../constants';
import { defaultDndRef, defaultDndState, DndAction, DndRef, DndState } from './dragdrop.context';
import { DndItem, DndActionType } from './dragdrop.type';

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
      case ActionClickType.MENU_EDIT:
        dispatch?.({
          type: DndActionType.SET_SELECTED_ITEM_EDIT,
          payload: true
        });
        break;
      case ActionClickType.MENU_CLONE:
        dispatch?.({
          type: DndActionType.CLONE_ITEM,
          payload: item
        });
        break;
      case ActionClickType.MENU_REMOVE:
        dispatch?.({
          type: DndActionType.REMOVE_ITEM,
          payload: item
        });
        if (dndRef?.domRef) delete dndRef.domRef[`${id}`];
        break;
      default:
        console.log('click');
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
      type: DndActionType.SET_SELECTED_ITEM,
      payload: selectedItem
    });
  }

  return { handleItemClick, handleClick }
}

export default useItemClick;