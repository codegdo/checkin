import React, { FC, useContext, useEffect } from 'react';
import { Editor } from '../editor/editor.component';
import { DragDropContext } from './dragdrop.context';
import { DragDropContextProps } from './dragdrop.type';

export const DragDropEditor: FC = () => {

  const ctx = useContext((DragDropContext as Object) as React.Context<DragDropContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { item, updateItem } = ctx;

  useEffect(() => {
    console.log(item);
  }, [item]);

  const handleCallback = () => {
    updateItem({ id: 3 });
  }

  console.log('EDIT', item);

  return item && <>
    {
      item.isDragging ? null : <Editor type={''} item={item} onCallback={handleCallback} />
    }
  </>
}