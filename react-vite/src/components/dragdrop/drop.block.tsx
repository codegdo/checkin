import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import stringClassNames from 'classnames';

import { useDragDrop } from '../../hooks';

import DragDropRender from './dragdrop.render';
import { DndActionClickType, DndItem, DndItemType } from './dragdrop.type';
import DragDropMenu from './dragdrop.menu';
import { DndActionTypes } from './dragdrop.context';
import DropPlaceholder from './drop.placeholder';

type DropBlockProps = DndItem;

const DropBlock: React.FC<PropsWithChildren<DropBlockProps>> = ({ children, ...props }): JSX.Element => {
  const { state, dispatch, id, className = '', name, dataType, data = [], value = '' } = props;
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

  const parsedComponent = useMemo(() => {
    const sanitizedValue = DOMPurify.sanitize(value, { ADD_TAGS: ['jsx'] });
    return parse(sanitizedValue, {
      replace: (dom) => {
        if ('attribs' in dom) {
          const { attribs } = dom;
          if (attribs.id) {
            const [name, key] = attribs.id.split('_');
            const items = data.filter((item: any) => item.childId == key);

            if (name === 'placeholder') {
              return <DropPlaceholder
                {...props}
                id={`${id}_${key}`}
                dataType='placeholder'
                data={items}
                childId={key}
              />
            }
          }
        }

        return dom;
      }
    });
  }, [data]);

  const classNames = stringClassNames({
    [className]: true,
    [`drop-item drop-${name}`]: dataType !== 'area',
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
      case DndActionClickType.MENU_CLONE:
        dispatch?.({
          type: DndActionTypes.CLONE_ITEM,
          payload: props
        });
        break;
      case DndActionClickType.MENU_REMOVE:
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
      {name === 'component' ? <>{parsedComponent}</> : children || <DragDropRender data={data} />}
    </div>
  );
};

export default DropBlock;
