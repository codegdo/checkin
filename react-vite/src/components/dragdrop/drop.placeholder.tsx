import React, { FC } from 'react';
import stringClassNames from 'classnames';

import { useDragDrop} from './hooks/use-dragdrop.hook';
import { DragDropRender } from './dragdrop.render';
import { DndItem, DndItemType } from './dragdrop.type';

type DropPlaceholderProps = DndItem;

export const DropPlaceholder: FC<DropPlaceholderProps> = ({ state, dispatch, dndRef, ...item }): JSX.Element => {
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


