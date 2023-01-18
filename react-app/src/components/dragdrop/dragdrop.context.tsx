import React, { PropsWithChildren, useCallback, useEffect, useReducer, useRef, useState } from 'react';

import { initialState, reducer } from './dragdrop.reducer';
import { DragDropContextProps, DragDropProps } from './dragdrop.type';

export const DragDropContext = React.createContext<DragDropContextProps>({
  state: { data: [], item: null },
  current: null
});

export const DragDropProvider: React.FC<PropsWithChildren<DragDropProps>> = ({ children, data, ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { current } = useRef({});

  useEffect(() => {
    const payload = [...data.data, ...data.fields].sort((a, b) => {
      return a.position - b.position;
    }).filter((item, index) => {
      item.position = index;
      return item;
    });

    dispatch({
      type: 'INIT',
      payload
    });
  }, []);

  useEffect(() => {

    // if (item && state.data.length > item.length) {
    //   const newId = state.data[item.position + 1].id;
    //   setItem({ ...item, id: newId });
    // }

    console.log('NEW STATE', state);
  }, [state]);

  // const moveItem = useCallback((payload: any) => {

  //   dispatch({
  //     type: 'MOVE_ITEM',
  //     payload
  //   });

  // }, [state]);

  // const addItem = useCallback((payload: any) => {

  //   dispatch({
  //     type: 'ADD_ITEM',
  //     payload
  //   });

  // }, [state]);

  // const deleteItem = useCallback((payload: any) => {

  //   dispatch({
  //     type: 'DELETE_ITEM',
  //     payload
  //   });

  //   setItem(null);
  // }, [state]);

  // const duplicateItem = useCallback((payload: any) => {

  //   dispatch({
  //     type: 'DUPLICATE_ITEM',
  //     payload
  //   });

  // }, [state, item]);

  // const updateItem = useCallback((payload: any) => {

  //   dispatch({
  //     type: 'UPDATE_ITEM',
  //     payload
  //   });

  //   setItem(null);
  // }, [state]);

  const onCallback = useCallback(() => {
    //
  }, []);

  return <DragDropContext.Provider value={{
    state,
    current,
    //item,
    dispatch,
    //setItem,
    //moveItem,
    //addItem,
    //deleteItem,
    //duplicateItem,
    //updateItem,
    onCallback
  }}>
    {children}
  </DragDropContext.Provider>
}