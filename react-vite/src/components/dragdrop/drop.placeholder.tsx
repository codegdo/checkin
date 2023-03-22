import React from 'react';
import stringClassNames from 'classnames';

import useDragDrop from './use-dragdrop.hook';
import DragDropRender from './dragdrop.render';
import { DndItem, DndItemType } from './dragdrop.type';

type DropPlaceholderProps = DndItem;

function DropPlaceholder({ state, dispatch, dndRef, ...item }: DropPlaceholderProps): JSX.Element {
  const { data = [] } = item;

  const {
    dragRef,
    isDragging,
    isOver,
    isLock,
    isSelected,
    isDropEmpty,
    drag,
    drop,
    onMouseOver,
    onMouseOut
  } = useDragDrop(item, dndRef, state, dispatch);

  const classNames = stringClassNames({
    'drop-placeholder': true,
    'is-over': isOver
  });

  drag(drop(dragRef));

  return <div ref={dragRef} className={classNames}><DragDropRender data={data} /></div>
};

export default DropPlaceholder;

