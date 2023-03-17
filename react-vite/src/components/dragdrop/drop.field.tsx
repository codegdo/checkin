import React from 'react';
import stringClassNames from 'classnames';

import { useDragDrop } from '../../hooks';
import { DndActionClickType, DndItem, DndItemType } from './dragdrop.type';
import DragDropMenu from './dragdrop.menu';
import { DndActionTypes } from './dragdrop.context';

type DropFieldProps = DndItem;

const DropField: React.FC<DropFieldProps> = (props): JSX.Element => {
  const { dndRef, state, dispatch, id, name, className = '', } = props;
  const acceptTypes = Object.values(DndItemType);
  const {
    ref,
    drag,
    drop,
    isDragging,
    isOver,
    isLock,
    isSelected,
    onMouseOver,
    onMouseOut
  } = useDragDrop(props, acceptTypes);

  const classNames = stringClassNames({
    [className]: true,
    'drop-item drop-field': true,
    'is-dragging': isDragging,
    'is-over': isOver,
    'is-lock': isLock,
    'is-selected': isSelected
  });

  const handleChange = () => {
    console.log('on-change');
  }

  const handleClick = (name: string) => {
    switch (name) {
      case DndActionClickType.MENU_EDIT:

        break;
      case DndActionClickType.MENU_CLONE:
        dispatch?.({
          type: DndActionTypes.CLONE_ITEM,
          payload: props
        });
        break;
      case DndActionClickType.MENU_REMOVE:
        if(dndRef?.elementRef) delete dndRef.elementRef[`${id}`];
        dispatch?.({
          type: DndActionTypes.REMOVE_ITEM,
          payload: props
        });
        break;
      default:
    }
  }

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
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
      {name}
    </div>
  );
};

export default DropField;