import React, { Dispatch, PropsWithChildren, useCallback, useEffect, useReducer, useRef } from 'react';

import { DragDropProps } from './dragdrop.component';
import { DndActionType, DndItem } from './dragdrop.type';
import { dndHelper } from './helpers/dragdrop.helper';

export interface DndState {
  data: DndItem[];
  item: DndItem & {
    isEdit?: boolean
    onChange?: () => void;
    onClick?: () => void;
  } | null;
}

export interface DndAction {
  type: DndActionType | string;
  payload: any;
}

export type DropRef = Partial<DndItem> & {
  dragId?: string | number;
  dragPosition?: number | null;
  x?: number;
  y?: number;
  translateX?: number;
  translateY?: number;
  offset?: string;
  direction?: string;
  canDrop?: boolean;
}

export interface DndRef {
  dropRef: DropRef;
  itemRef: DndItem | null;
  domRef: Record<string, HTMLDivElement | null>;
}

export interface DragDropContextValue {
  state: DndState;
  dispatch: Dispatch<DndAction>;
  dndRef: DndRef;
}

interface DragDropProviderProps extends PropsWithChildren<DragDropProps> { };

const dndReducer = (state: DndState, action: DndAction) => {
  const { type, payload } = action;

  switch (type) {
    case DndActionType.SET_SELECTED_ITEM_EDIT:
      return { ...state, item: { ...state.item, isEdit: true } };

    case DndActionType.SET_SELECTED_ITEM:
      const selectedItem = payload;
      return { ...state, item: selectedItem };

    case DndActionType.SET_INITIAL_ITEMS:
      const initialItems = [...payload];
      return { ...state, data: initialItems };

    case DndActionType.ADD_ITEM: {
      const { dragItem, dropRef } = payload;

      // Generate a new item with an ID and default values, 
      // and add it to the data at the given drop reference
      // and set position equal -1 to determine new item
      const newItem = {
        id: dndHelper.generateNewId(),
        data: [],
        parentId: null,
        childId: null,
        position: -1,
        ...dragItem,
      };

      const updatedData = dndHelper.addItems(newItem, dropRef, state.data);

      return { ...state, data: updatedData };
    }

    case DndActionType.MOVE_ITEM: {
      const { dragItem, dropRef } = payload;

      // Move the item to the new position and update the parent-child relationships in the data
      const updatedData = dndHelper.moveItems(dragItem, dropRef, state.data);

      return { ...state, data: updatedData };
    }

    case DndActionType.CLONE_ITEM: {
      // Clone the selected item and add it to the data, then clear the selected item
      const clonedData = dndHelper.cloneItems(payload, state.data);

      return { ...state, data: clonedData, item: null };
    }

    case DndActionType.REMOVE_ITEM: {
      // Remove the selected item and its children from the data, then clear the selected item
      const removedData = dndHelper.removeItems(payload, state.data);

      return { ...state, data: removedData, item: null };
    }

    default:
      return state;
  }
};

export const defaultDndRef = {
  dropRef: {},
  itemRef: null,
  domRef: {}
}

export const defaultDndState = { data: [], item: null }

export const DragDropContext = React.createContext<DragDropContextValue>({
  state: defaultDndState,
  dispatch: () => console.log('dispatch'),
  dndRef: defaultDndRef
});

function DragDropProvider({ children, data, ...props }: DragDropProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(dndReducer, defaultDndState);
  const { current: dndRef } = useRef(defaultDndRef);

  const memoizedContextValue = useCallback(() => ({
    state,
    dispatch,
    dndRef
  }), [state, dispatch, dndRef]);

  useEffect(() => {
    dispatch({ type: DndActionType.SET_INITIAL_ITEMS, payload: data });
  }, [data]);

  return (
    <DragDropContext.Provider value={memoizedContextValue()}>
      {children}
    </DragDropContext.Provider>
  );
};

export default DragDropProvider;
