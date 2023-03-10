import React, { PropsWithChildren } from 'react';
import { useDragDrop } from '../../hooks';
import stringClassNames from 'classnames';


import DragDropRender from './dragdrop.render';
import { DndActionClickType, DndItem, DndItemType } from './dragdrop.type';
import DragDropMenu from './dragdrop.menu';
import { DndActionTypes } from './dragdrop.context';
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
    isSelected,
    isDropEmpty,
    onMouseOver,
    onMouseOut
  } = useDragDrop(props, acceptTypes);

  const classNames = stringClassNames({
    [className]: true,
    'drop-item drop-block': dataType !== 'area',
    'is-dragging': isDragging,
    'is-over': isOver,
    'is-selected': isSelected,
    'is-empty': isDropEmpty,
  });

  const handleChange = () => {
    console.log('on-change');
  }

  const handleClick = (name: string) => {
    switch (name) {
      case DndActionClickType.MENU_EDIT:

        break;
      case DndActionClickType.MENU_DUPLICATE:
        dispatch?.({
          type: DndActionTypes.DUPLICATE_ITEM,
          payload: props
        });
        break;
      case DndActionClickType.MENU_DELETE:
        dispatch?.({
          type: DndActionTypes.DELETE_ITEM,
          payload: props
        });
        break;
      default:
    }
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
      {children || <DragDropRender data={data} />}
    </div>
  );
};

export default DropBlock;