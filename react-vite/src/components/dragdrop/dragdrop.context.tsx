import React, { Dispatch, PropsWithChildren, useCallback, useEffect, useReducer, useRef } from 'react';
import update from 'immutability-helper';

import { DragDropProps } from './dragdrop.component';
import { DndItem } from './dragdrop.type';

interface State {
  data?: DndItem[];
  item?: DndItem;
}

interface Action {
  type: string;
  payload: any;
}


export interface DragDropContextValue {
  state: State;
  dispatch: Dispatch<Action>;
  dndRef: any;
}

interface DragDropProviderProps extends PropsWithChildren<DragDropProps> { };


export enum DndActionTypes {
  SET_ITEMS = 'SET_ITEMS',
  ADD_ITEM = 'ADD_ITEM',
  MOVE_ITEM = 'MOVE_ITEM'
}

const dndReducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case DndActionTypes.SET_ITEMS: {
      return { ...state, data: [...payload] };
    }
    case DndActionTypes.ADD_ITEM: {
      const { dragItem, dropItem } = payload;

      console.log('ADD ITEM', dragItem, dropItem);

      return state;
    }
    case DndActionTypes.MOVE_ITEM: {
      const { dragItem, dropItem } = payload;

      console.log('MOVE ITEM', dragItem, dropItem);

      return state;

      // const newData = update(state.data, {
      //   $splice: [
      //     [dragIndex, dragCounts],
      //     [dropIndex, 0, ...dragItems],
      //   ],
      //   $apply: (data: any) => data.map((item: any, index: number) => {
      //     item.position = index;
      //     return item;
      //   }),
      // });

      // return update(state, { data: { $set: newData } });
    }
    default:
      return state;
  }
};

export const DragDropContext = React.createContext<DragDropContextValue>({
  state: {},
  dispatch: () => { },
  dndRef: {}
});

const DragDropProvider: React.FC<DragDropProviderProps> = ({
  children,
  data,
  ...props
}) => {
  const [state, dispatch] = useReducer(dndReducer, {});
  const { current: dndRef } = useRef({});

  const memoizedContextValue = useCallback(() => ({
    state,
    dispatch,
    dndRef
  }), [state, dispatch, dndRef]);

  useEffect(() => {
    dispatch({ type: DndActionTypes.SET_ITEMS, payload: data });
  }, [data]);

  return (
    <DragDropContext.Provider value={memoizedContextValue()}>
      {children}
    </DragDropContext.Provider>
  );
};

export default DragDropProvider;
