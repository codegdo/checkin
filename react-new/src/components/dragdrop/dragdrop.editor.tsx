import React, { FC, useContext, useEffect, useRef } from 'react';

import { Editor } from '../editor/editor.component';
import { DragDropContext } from './dragdrop.context';
import { DragDropContextProps } from './dragdrop.type';

export const DragDropEditor: FC = () => {

  const ctx = useContext((DragDropContext as Object) as React.Context<DragDropContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { item, setItem } = ctx;

  const { name, onChange, onClick, data } = item || {};

  const ref = useRef(null);

  const outsideClickEvent = (event: MouseEvent) => {
    // If the toggle element exists and is clicked outside of
    if (ref.current !== null && !ref.current.contains(event.target)) {
      //setItem(null);
      onClick(event);
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

  return item && <div ref={ref}>
    {
      item.isDragging ? null : <Editor name={name} data={data} onChange={onChange} onClick={onClick} />
    }
  </div>
}