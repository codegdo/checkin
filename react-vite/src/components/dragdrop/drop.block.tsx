import React, { PropsWithChildren } from 'react';
import { useDragDrop } from '../../hooks';
import stringClassNames from 'classnames';


import DragDropRender from './dragdrop.render';
import { DndItem, DndItemType } from './dragdrop.type';
type DropBlockProps = DndItem;

const DropBlock: React.FC<PropsWithChildren<DropBlockProps>> = ({ children, ...props }): JSX.Element => {
  const {state, dispatch, id, className = '', dataType, data = [] } = props;
  const acceptTypes = Object.values(DndItemType);
  const { 
    ref, 
    drag, 
    drop, 
    isDragging, 
    isOver, 
    isFocused,
    hasEmptyList, 
    onMouseOver, 
    onMouseOut
  } = useDragDrop(props, acceptTypes);

  const classNames = stringClassNames({
    'drop-item drop-block': dataType !== 'area',
    [className]: true,
    'is-dragging': isDragging,
    'is-over': isOver,
    'is-focus': isFocused,
    'is-empty': hasEmptyList,
  });

  const handleChangeCallback = () => {
    console.log('on-change');
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const selectedItem = (state?.item?.id == id) ? null : { id, onChange: handleChangeCallback };

    console.log(selectedItem);

    dispatch?.({
      type: 'SET_SELECTED_ITEM',
      payload: selectedItem
    });
  }

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={classNames}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={handleClick}
    >
      {children || <DragDropRender data={data} />}
    </div>
  );
};

export default DropBlock;