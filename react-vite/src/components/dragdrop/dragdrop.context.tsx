import React, { Dispatch, PropsWithChildren, useEffect, useReducer, useRef } from 'react';
import { DragDropProps } from './dragdrop.component';

interface DragDropContextValue {
  state: State;
  dispatch: Dispatch<Action>;
  dndRef: React.MutableRefObject<any>;
}

interface DragDropProviderProps extends PropsWithChildren<DragDropProps> { }

interface State {
  data?: any[];
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
  dndRef: { current: null },
});

const DragDropProvider: React.FC<DragDropProviderProps> = ({
  children,
  data,
  ...props
}) => {
  const [state, dispatch] = useReducer(reducer, {});
  const dndRef = useRef({});

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
