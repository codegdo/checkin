import React, { FC, useContext, useEffect, useRef } from 'react';

import { Editor } from '../editor/editor.component';
import { DragDropContext } from './dragdrop.context';
import { DragDropContextProps } from './dragdrop.type';

export const DragDropEditor: FC = () => {

  const ctx = useContext((DragDropContext as Object) as React.Context<DragDropContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { item, setItem, updateItem } = ctx;

  const ref = useRef(null);

  const outsideClickEvent = (e: MouseEvent) => {
    // If the toggle element exists and is clicked outside of
    if (ref.current !== null && !ref.current.contains(e.target)) {
      setItem(null);
    }
  };

  useEffect(() => {
    // If item exist then listen for clicks
    if (item) {
      window.addEventListener('click', outsideClickEvent);
    }
    return () => {
      window.removeEventListener('click', outsideClickEvent);
    }
  }, [item, ref]);

  const handleCallback = () => {
    updateItem({ id: 3 });
  }

  return item && <div ref={ref}>
    {
      item.isDragging ? null : <Editor type={''} item={item} onCallback={handleCallback} />
    }
  </div>
}