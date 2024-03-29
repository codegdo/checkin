import React, { MouseEvent, useEffect, useState } from 'react';
import { ActionEditorEnum, ActionMenuEnum } from '../../../constants';
import { DndAction, DndRef, DndState } from '../dragdrop.context';
import { DndItem, DndActionType } from '../dragdrop.type';
import { KeyValue } from '../../input';
import { util } from '../../../helpers';


type useSelectableProps = {
  item: DndItem;
  dndRef?: DndRef;
  dndState?: DndState;
  dragRef?: React.RefObject<HTMLDivElement>;
  dispatch?: React.Dispatch<DndAction>;
};

export function useSelectable({
  item,
  dndRef,
  dndState,
  dragRef,
  dispatch = () => console.log("dispatch"),
}: useSelectableProps) {

  const [selectedItem, setSelectedItem] = useState<DndItem>(item);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (isUpdate && dispatch) {
      dispatch({
        type: DndActionType.UPDATE_ITEM,
        payload: selectedItem,
      });
      setIsUpdate(false);
    }
  }, [selectedItem, isUpdate]);

  const onChange = ({ key, value }: KeyValue) => {
    setSelectedItem((prevItem) => ({
      ...prevItem,
      ...util.setObjectValue(key, prevItem, value),
    }));
  };

  const onClick = (actionType: string) => {
    switch (actionType) {
      case ActionMenuEnum.MENU_EDIT:
        dispatch?.({
          type: DndActionType.SET_SELECTED_ITEM_EDIT,
          payload: true,
        });
        break;
      case ActionMenuEnum.MENU_CLONE:
        dispatch?.({
          type: DndActionType.CLONE_ITEM,
          payload: item,
        });
        break;
      case ActionMenuEnum.MENU_REMOVE:
        dispatch?.({
          type: DndActionType.REMOVE_ITEM,
          payload: item,
        });
        if (dndRef?.domRef) delete dndRef.domRef[`${selectedItem.id}`];
        break;
      case ActionEditorEnum.EDITOR_SAVE:
        setIsUpdate(true);
        break;
      case ActionEditorEnum.EDITOR_CLOSE:
        setIsUpdate(true);
        dispatch?.({
          type: DndActionType.SET_SELECTED_ITEM_NULL,
          payload: null,
        });
        break;
      case ActionEditorEnum.EDITOR_RESET:

        setSelectedItem(prevItem => ({ ...prevItem, ...selectedItem }));

        dispatch?.({
          type: DndActionType.RESET_ITEM,
          payload: selectedItem,
        });
        break;
      default:
        console.log("click");
    }
  }

  const onItemClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const newSelectedItem = dndState?.item?.id === selectedItem.id ? null : {
      ...selectedItem,
      itemRef: dragRef,
      isEdit: false,
      onChange: onChange,
      onClick: onClick,
    };

    dispatch?.({
      type: DndActionType.SET_SELECTED_ITEM,
      payload: newSelectedItem,
    });
  };

  return { selectedItem, onClick, onItemClick };
};