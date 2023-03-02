import React, { Dispatch, PropsWithChildren, useEffect, useReducer, useRef } from 'react';
import { DragDropProps } from './dragdrop.component';

import { DndItem } from './dragdrop.type';
export interface DragDropContextValue {
  state: State;
  dispatch: Dispatch<Action>;
  dndRef: any;
}

interface DragDropProviderProps extends PropsWithChildren<DragDropProps> { }

interface State {
  data?: DndItem[];
}

interface Action {
  type: string;
  payload: any;
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'INIT':
      return { ...state, data: [...action.payload] };
    default:
      return state;
  }
};

export const DragDropContext = React.createContext<DragDropContextValue>({
  state: {},
  dispatch: () => { },
  dndRef: {},
});

const DragDropProvider: React.FC<DragDropProviderProps> = ({
  children,
  data,
  ...props
}) => {
  const [state, dispatch] = useReducer(reducer, {});
  const { current: dndRef } = useRef({});

  const contextValue: DragDropContextValue = {
    state,
    dispatch,
    dndRef,
  };

  useEffect(() => {
    if (data) {
      dispatch({ type: 'INIT', payload: data });
    }
  }, [data]);

  return (
    <DragDropContext.Provider value={contextValue}>
      {children}
    </DragDropContext.Provider>
  );
};

export default DragDropProvider;
