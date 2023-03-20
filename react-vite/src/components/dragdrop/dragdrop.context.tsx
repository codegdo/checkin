import React, { Dispatch, PropsWithChildren, useCallback, useEffect, useReducer, useRef } from 'react';

import { DragDropProps } from './dragdrop.component';
import { DndItem } from './dragdrop.type';
import { dndHelper } from './dragdrop.helper';

interface State {
  data: DndItem[];
  item: DndItem | null;
}

interface Action {
  type: DndActionTypes | string;
  payload: any;
}

type DropRef = Partial<DndItem> & {
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

interface DndRef {
  dropRef: DropRef;
  itemRef: DndItem | null;
  elementRef?: Record<string, HTMLDivElement | null>;
}

export interface DragDropContextValue {
  state: State;
  dispatch: Dispatch<Action>;
  dndRef: DndRef;
}

interface DragDropProviderProps extends PropsWithChildren<DragDropProps> { };


export enum DndActionTypes {
  SET_SELECTED_ITEM = 'SET_SELECTED_ITEM',
  SET_SELECTED_ITEM_ACTIVE = 'SET_SELECTED_ITEM_ACTIVE',
  SET_INITIAL_ITEMS = 'SET_INITIAL_ITEMS',
  ADD_ITEM = 'ADD_ITEM',
  MOVE_ITEM = 'MOVE_ITEM',
  CLONE_ITEM = 'CLONE_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM'
}

const dndReducer = (state: State, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case DndActionTypes.SET_SELECTED_ITEM_ACTIVE:
      return { ...state, item: { ...state.item, isActive: true } };

    case DndActionTypes.SET_SELECTED_ITEM:
      const selectedItem = payload;
      return { ...state, item: selectedItem };

    case DndActionTypes.SET_INITIAL_ITEMS:
      const initialItems = [...payload];
      return { ...state, data: initialItems };

    case DndActionTypes.ADD_ITEM: {
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

    case DndActionTypes.MOVE_ITEM: {
      const { dragItem, dropRef } = payload;

      // Move the item to the new position and update the parent-child relationships in the data
      const updatedData = dndHelper.moveItems(dragItem, dropRef, state.data);

      return { ...state, data: updatedData };
    }

    case DndActionTypes.CLONE_ITEM: {
      // Clone the selected item and add it to the data, then clear the selected item
      const clonedData = dndHelper.cloneItems(payload, state.data);

      return { ...state, data: clonedData, item: null };
    }

    case DndActionTypes.REMOVE_ITEM: {
      // Remove the selected item and its children from the data, then clear the selected item
      const removedData = dndHelper.removeItems(payload, state.data);

      return { ...state, data: removedData, item: null };
    }

    default:
      return state;
  }
};

const defaultDndRef = {
  dropRef: {},
  itemRef: null,
  elementRef: {}
}

export const DragDropContext = React.createContext<DragDropContextValue>({
  state: { data: [], item: null },
  dispatch: () => { },
  dndRef: defaultDndRef
});

const DragDropProvider: React.FC<DragDropProviderProps> = ({
  children,
  data,
  ...props
}) => {
  const [state, dispatch] = useReducer(dndReducer, { data: [], item: null });
  const { current: dndRef } = useRef(defaultDndRef);

  const memoizedContextValue = useCallback(() => ({
    state,
    dispatch,
    dndRef
  }), [state, dispatch, dndRef]);

  useEffect(() => {
    dispatch({ type: DndActionTypes.SET_INITIAL_ITEMS, payload: data });
  }, [data]);

  return (
    <DragDropContext.Provider value={memoizedContextValue()}>
      {children}
    </DragDropContext.Provider>
  );
};

export default DragDropProvider;
