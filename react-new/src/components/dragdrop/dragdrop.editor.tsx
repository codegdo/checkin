import React, { FC, useContext, useEffect } from 'react';
import { Editor } from '../editor/editor.component';
import { DragDropContext } from './dragdrop.context';
import { DragDropContextProps } from './dragdrop.type';

export const DragDropEditor: FC = () => {

  const ctx = useContext((DragDropContext as Object) as React.Context<DragDropContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { focus, setFocus, updateItem } = ctx;

  useEffect(() => {
    console.log(focus);
  }, [focus]);

  const handleCallback = () => {
    updateItem({ id: 3 });
  }

  return focus && <div>
    {
      focus.isDragging ? null : <Editor type={''} focus={focus} onCallback={handleCallback} />
    }
  </div>
}