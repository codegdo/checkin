import React, { FC, useContext, useEffect, useRef } from 'react';

import { Editor } from '../editor/editor.component';
import { DragDropContext } from './dragdrop.context';
import { DragDropContextProps } from './dragdrop.type';

export const DragDropEditor: FC = () => {

  const ctx = useContext((DragDropContext) as React.Context<DragDropContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { item } = ctx;

  const ref = useRef<HTMLDivElement>(null);

  const outsideClickEvent = (event: MouseEvent) => {
    if (ref.current !== null && !ref.current.contains(event.target as HTMLElement)) {
      item && item.onClick(event);
    }
  };

  useEffect(() => {
    if (item) {
      window.addEventListener('click', outsideClickEvent);
    }
    return () => {
      window.removeEventListener('click', outsideClickEvent);
    }
  }, [item]);


  return <div ref={ref}>
    {
      (item && item.isEdit) ? <Editor {...item} /> : null
    }
  </div>
}