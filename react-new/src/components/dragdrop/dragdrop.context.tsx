import React, { PropsWithChildren, useCallback, useEffect, useReducer, useRef } from 'react';
import update from 'immutability-helper'
import { initialState, reducer } from './dragdrop.reducer';
import { DragDropContextProps, DragDropProps } from './dragdrop.type';

export const DragDropContext = React.createContext<DragDropContextProps | null>(null);

export const DragDropProvider: React.FC<PropsWithChildren<DragDropProps>> = ({ children, data, ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  let { current } = useRef({});

  useEffect(() => {
    const payload = [...data.data, ...data.fields].sort((a, b) => {
      return a.position - b.position;
    }).filter((item, index) => { item.position = index; return item; });

    dispatch({
      type: 'INIT',
      payload
    });
  }, []);

  useEffect(() => {
    //console.log('MOVE ITEM CALL', moveItem());
  });

  const moveItem = useCallback(() => {
    const dragIndex = 6;
    const hoverIndex = 7;
    const i = state.data[dragIndex];

    const items = update(state.data, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, i as any]
      ]
    });

    //console.log('MOVE ITEM', items);
  }, [state]);

  const handleCallback = useCallback(() => {

  }, []);

  return <DragDropContext.Provider value={{ data, state, current, moveItem, onCallback: handleCallback }}>
    {children}
  </DragDropContext.Provider>
}