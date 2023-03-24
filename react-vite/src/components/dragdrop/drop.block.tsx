import React, { PropsWithChildren, useCallback, useEffect, useMemo } from 'react';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import classNames from 'classnames';

import useDragDrop from './hooks/use-dragdrop.hook';
import DragDropRender from './dragdrop.render';
import DragDropMenu from './dragdrop.menu';
import DropPlaceholder from './drop.placeholder';
import { DndItem } from './dragdrop.type';
import useItemClick from './hooks/use-itemclick.hook';


type DropBlockProps = DndItem;

function DropBlock({ state, dispatch, dndRef, children, ...item }: PropsWithChildren<DropBlockProps>): JSX.Element {
  const { id, name, dataType, className = '', value = '', data = [] } = item;

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
                {...item}
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

  const { handleItemClick, handleClick } = useItemClick(item, dndRef, state, dispatch);

  const itemClassNames = classNames(className, {
    [`drop-item drop-${name}`]: dataType !== 'area',
    'is-dragging': isDragging,
    'is-over': isOver,
    'is-selected': isSelected,
    'is-empty': isDropEmpty,
  });

  drag(drop(dragRef));

  return (
    <div
      ref={dragRef}
      className={itemClassNames}
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
