import React, { FC, useEffect, useRef } from 'react';
import { useDragLayer } from 'react-dnd';

import { useWrapperContext } from '../../hooks';

import { Editor } from '../editor/editor.component';
import { DragDropContext } from './dragdrop.context';
import { DragDropContextProps } from './dragdrop.type';

export const DragDropEditor: FC = () => {

  const ctx = useWrapperContext(DragDropContext);
  const { state: { item } } = ctx;

  //console.log(item, state);

  const ref = useRef<HTMLDivElement>(null);
  const dragdropType = ['dropzone', 'placeholder', 'block', 'element', 'field'];

  const { itemType, onDragging } = useDragLayer((monitor) => ({
    itemType: monitor.getItemType(),
    onDragging: monitor.isDragging(),
  }));

  const outsideClickEvent = (event: MouseEvent) => {
    if (ref.current !== null && !ref.current.contains(event.target as HTMLElement)) {
      item?.onClick(event);
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
      (item?.isActive) ? <Editor {...item} /> : null
    }
  </div>
}
