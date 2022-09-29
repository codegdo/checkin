import React, { useContext, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { Editor } from '../editor/editor.component';
import { DragDropContext } from './dragdrop.context';
import { DragDropContextProps } from './dragdrop.type';

export const DragDropEditor: React.FC = () => {

  const ctx = useContext((DragDropContext as Object) as React.Context<DragDropContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { focus, setFocus } = ctx;


  useEffect(() => {
    console.log(focus);
  }, [focus]);


  return focus && <div>
    {
      focus.isDragging ? null : <Editor />
    }
  </div>
}