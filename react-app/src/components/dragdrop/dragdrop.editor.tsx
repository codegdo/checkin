import React, { FC, useContext, useEffect, useRef } from 'react';
import { useDragLayer } from 'react-dnd';

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
  const dragdropType = ['dropzone', 'placeholder', 'block', 'element', 'field'];

  const { itemType, onDragging } = useDragLayer((monitor) => ({
    itemType: monitor.getItemType(),
    onDragging: monitor.isDragging(),
  }));

  const outsideClickEvent = (event: MouseEvent) => {
    if (ref.current !== null && !ref.current.contains(event.target as HTMLElement)) {
      item.onClick && item.onClick(event);
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

  return <div ref={ref} className={`dd-editor ${(onDragging && dragdropType.includes(`${itemType}`)) ? 'on-drag' : ''}`}>
    {
      (item && item.isEdit) ? <Editor {...item} /> : null
    }
  </div>
}
