import React, { Dispatch, PropsWithChildren, useCallback, useEffect, useReducer, useRef } from 'react';
import update from 'immutability-helper';

import { DragDropProps } from './dragdrop.component';
import { DndItem } from './dragdrop.type';
import { dndHelper } from '../../helpers';

interface State {
  data: DndItem[];
  item: DndItem | null;
}

interface Action {
  type: DndActionTypes | string;
  payload: any;
}

type DropRef = Partial<DndItem> & { x?: number; y?: number; offset?: string, currentRef?: HTMLDivElement | null, canDrop?: boolean }

interface DndRef {
  dropRef: DropRef;
  itemRef: DndItem | null;
}

export interface DragDropContextValue {
  state: State;
  dispatch: Dispatch<Action>;
  dndRef: DndRef;
}

interface DragDropProviderProps extends PropsWithChildren<DragDropProps> { };


export enum DndActionTypes {
  SET_SELECTED_ITEM = 'SET_SELECTED_ITEM',
  SET_INITIAL_ITEMS = 'SET_INITIAL_ITEMS',
  ADD_ITEM = 'ADD_ITEM',
  MOVE_ITEM = 'MOVE_ITEM',
  DUPLICATE_ITEM = 'DUPLICATE_ITEM',
  DELETE_ITEM = 'DELETE_ITEM'
}

const dndReducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case DndActionTypes.SET_SELECTED_ITEM: {
      return { ...state, item: { ...payload } }
    }
    case DndActionTypes.SET_INITIAL_ITEMS: {
      return { ...state, data: [...payload] };
    }
    case DndActionTypes.ADD_ITEM: {
      const { dragItem, dropRef } = payload;

      let newDragItem: Partial<DndItem> = {
        id: dndHelper.newId(),
        data: [],
        parentId: null,
        childId: null,
        position: null,
        ...dragItem
      };

      const newData = dndHelper.addItems(newDragItem, dropRef, state.data);

      return { ...state, data: newData };
    }
    case DndActionTypes.MOVE_ITEM: {
      const { dragItem, dropRef } = payload;
      const newData = dndHelper.moveItems(dragItem, dropRef, state.data);

      return { ...state, data: newData };
    }
    case DndActionTypes.DUPLICATE_ITEM: {
      const { dragItem, dropRef } = payload;
      const newData = dndHelper.moveItems(dragItem, dropRef, state.data);

      return { ...state, data: newData };
    }
    case DndActionTypes.DELETE_ITEM: {
      //const { dragItem, dropRef } = payload;
      //const newData = dndHelper.moveItems(dragItem, dropRef, state.data);

      return { ...state };
    }
    default:
      return state;
  }
};

const defaultDndRef = {
  dropRef: {},
  itemRef: null
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
