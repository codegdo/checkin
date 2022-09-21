import React, { useContext } from 'react';
import { DragDropContext } from './dragdrop.context';
import { DragDropContextProps } from './dragdrop.type';

export const DragDropEditor: React.FC = () => {

  const ctx = useContext((DragDropContext as Object) as React.Context<DragDropContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { focus, setFocus } = ctx;

  const handleClick = () => {
    focus?.clickMe();
    setFocus(null);
  }

  return <>
    {
      focus && <button onClick={handleClick}>click</button>
    }
  </>
}