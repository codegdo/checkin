import React, { Dispatch, PropsWithChildren, useEffect, useReducer, useRef } from 'react';
import { DragDropProps } from './dragdrop.component';

interface DragDropContextValue {
  state: State;
  dispatch: Dispatch<Action>;
}

interface DragDropProviderProps extends PropsWithChildren<DragDropProps> { }

interface State {
  data?: any[];
}

interface Action {
  type: string;
  payload: any;
}

export const DragDropContext = React.createContext<DragDropContextValue>({ state: {}, dispatch: () => { } });

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'INIT':
      return { ...state, data: [...action.payload] };
    default:
      return state;
  }
}

const DragDropProvider: React.FC<DragDropProviderProps> = ({ children, data, ...props }) => {
  const [state, dispatch] = useReducer(reducer, {});
  const { current } = useRef({});

  const contextValue: DragDropContextValue = {
    state,
    dispatch,
  };

  return <DragDropContext.Provider value={contextValue}>
    {children}
  </DragDropContext.Provider>
}

export default DragDropProvider;

