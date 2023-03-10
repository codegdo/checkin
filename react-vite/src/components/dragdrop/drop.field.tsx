import React from 'react';
import stringClassNames from 'classnames';

import { useDragDrop } from '../../hooks';
import { DndItem, DndItemType } from './dragdrop.type';
import DragDropMenu from './dragdrop.menu';
import { DndActionTypes } from './dragdrop.context';

type DropFieldProps = DndItem;

const DropField: React.FC<DropFieldProps> = (props): JSX.Element => {
  const { state, dispatch, id, className = '', } = props;
  const acceptTypes = Object.values(DndItemType);
  const {
    ref,
    drag,
    drop,
    isDragging,
    isOver,
    isSelected,
    onMouseOver,
    onMouseOut
  } = useDragDrop(props, acceptTypes);

  const classNames = stringClassNames({
    [className]: true,
    'drop-item drop-field': true,
    'is-dragging': isDragging,
    'is-over': isOver,
    'is-selected': isSelected
  });

  const handleChange = () => {
    console.log('on-change');
  }

  const handleClick= (name: string) => {
    console.log('on-click');
  }

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const selectedItem = (state?.item?.id == id) ? null : {
      id,
      onChange: handleChange,
      onClick: handleClick
    };

    console.log(selectedItem);

    dispatch?.({
      type: DndActionTypes.SET_SELECTED_ITEM,
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
      onClick={handleItemClick}
    >
      {isSelected && <DragDropMenu onClick={handleClick} />}
      field
    </div>
  );
};

export default DropField;