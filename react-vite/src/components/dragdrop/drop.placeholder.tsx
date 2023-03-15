import React from 'react';
import stringClassNames from 'classnames';

import { useDragDrop } from '../../hooks';
import DragDropRender from './dragdrop.render';
import { DndItem, DndItemType } from './dragdrop.type';

type DropPlaceholderProps = DndItem;

const DropPlaceholder: React.FC<DropPlaceholderProps> = (props) => {
  const { data = [] } = props;
  const acceptTypes = Object.values(DndItemType);
  const {
    ref,
    drag,
    drop,
    isDragging,
    isOver,
    isSelected,
    isDropEmpty
  } = useDragDrop(props, acceptTypes);

  const classNames = stringClassNames({
    'drop-placeholder': true,
    'is-over': isOver
  });

  drag(drop(ref));

  return <div ref={ref} className={classNames}><DragDropRender data={data} /></div>
};

export default DropPlaceholder;

