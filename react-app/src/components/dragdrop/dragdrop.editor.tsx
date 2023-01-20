import React, { FC, useEffect, useRef } from 'react';
import { useDragLayer } from 'react-dnd';
import classNames from 'classnames';

import { useWrapperContext } from '../../hooks';

import { Editor } from '../editor/editor.component';
import { DragDropContext } from './dragdrop.context';

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

  const editorClass = classNames({
    'dd-editor': true,
    'on-dragging': onDragging && dragdropType.includes(`${itemType as string}`)
  });

  return item?.isActive ? <div ref={ref} className={editorClass}>
    <Editor {...item} />
  </div> : null;
}
