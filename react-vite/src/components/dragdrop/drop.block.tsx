import React, { PropsWithChildren } from 'react';
import { useDragDrop } from '../../hooks';
import stringClassNames from 'classnames';


import DragDropRender from './dragdrop.render';
import { DndItem, DndItemType } from './dragdrop.type';
import DragDropMenu from './dragdrop.menu';
type DropBlockProps = DndItem;

const DropBlock: React.FC<PropsWithChildren<DropBlockProps>> = ({ children, ...props }): JSX.Element => {
  const { state, dispatch, id, className = '', dataType, data = [] } = props;
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
    [className]: true,
    'drop-item drop-block': dataType !== 'area',
    'is-dragging': isDragging,
    'is-over': isOver,
    'is-focus': isFocused,
    'is-empty': hasEmptyList,
  });

  const handleOnChangeCallback = () => {
    console.log('on-change');
  }

  const handleOnClickCallback = () => {
    console.log('on-click');
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const selectedItem = (state?.item?.id == id) ? null : {
      id,
      onChange: handleOnChangeCallback,
      onClick: handleOnClickCallback
    };

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
      {isFocused && <DragDropMenu />}
      {children || <DragDropRender data={data} />}
    </div>
  );
};

export default DropBlock;