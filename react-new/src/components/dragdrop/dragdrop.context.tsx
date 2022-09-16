import React, { PropsWithChildren, useCallback, useEffect, useReducer, useRef } from 'react';
import { initialState, reducer } from './dragdrop.reducer';
import { DragDropContextProps, DragDropProps } from './dragdrop.type';

export const DragDropContext = React.createContext<DragDropContextProps | null>(null);

export const DragDropProvider: React.FC<PropsWithChildren<DragDropProps>> = ({ children, data, ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { current } = useRef({});

  useEffect(() => {
    const payload = [...data.data, ...data.fields].sort((a, b) => {
      return a.position - b.position;
    }).filter((item, index) => { item.position = index; return item; });

    dispatch({
      type: 'INIT',
      payload
    });
  }, []);


  const moveItem = useCallback((item: any) => {

    dispatch({
      type: 'MOVE_ITEM',
      payload: item
    });

    // const dragIndex = dragItem.position;
    // const hoverIndex = dragItem.drop.item.position;
    // const i = state.data[dragIndex];

    // const items = update(state.data, {
    //   $splice: [
    //     [dragIndex, 1],
    //     [hoverIndex, 0, i as any]
    //   ],
    //   $apply: arr => arr.filter((a, index) => { a.position = index; return a; })
    // });

    //console.log('MOVE ITEM', items);
    //console.log('dragItem', dragItem);
    //console.log('hoverItem', hoverItem);
  }, [state]);

  const addItem = useCallback((item: any) => {

    dispatch({
      type: 'ADD_ITEM',
      payload: item
    });
  }, [state]);

  const handleCallback = useCallback(() => {

  }, []);

  return <DragDropContext.Provider value={{ data, state, current, moveItem, addItem, onCallback: handleCallback }}>
    {children}
  </DragDropContext.Provider>
}