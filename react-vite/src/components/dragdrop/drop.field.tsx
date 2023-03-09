import React from 'react';
import stringClassNames from 'classnames';

import { useDragDrop } from '../../hooks';
import { DndItem, DndItemType } from './dragdrop.type';

type DropFieldProps = DndItem;

const DropField: React.FC<DropFieldProps> = (props): JSX.Element => {
  const {state, dispatch, id, className = '',  } = props;
  const acceptTypes = Object.values(DndItemType);
  const { 
    ref, 
    drag, 
    drop, 
    isDragging, 
    isOver, 
    isFocused, 
    onMouseOver, 
    onMouseOut 
  } = useDragDrop(props, acceptTypes);

  const classNames = stringClassNames({
    'drop-item drop-field': true,
    [className]: true,
    'is-dragging': isDragging,
    'is-over': isOver,
    'is-focus': isFocused
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
    >field</div>
  );
};

export default DropField;