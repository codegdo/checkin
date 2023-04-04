import React, { useMemo, PropsWithChildren, MouseEvent } from 'react';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

import { DragDropRender } from './dragdrop.render';
import { DragDropMenu } from './dragdrop.menu';
import { useSelectable } from './hooks/use-selectable.hook';
import { useDragDrop } from './hooks/use-dragdrop.hook';
import { DropPlaceholder } from './drop.placeholder';
import { DndItem } from './dragdrop.type';
import { util } from '../../helpers';

type DropBlockProps = PropsWithChildren<DndItem>;

export function DropBlock({ state, dispatch, dndRef, children, ...item }: DropBlockProps) {
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
  } = useDragDrop({ item, dndRef, dndState: state, dispatch });
  const { selectedItem, onClick, onItemClick } = useSelectable({ item, dndRef, dndState: state, dispatch });

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

  const itemClassNames = util.classNames(className, {
    [`drop-item drop-${name}`]: dataType !== 'area',
    'is-dragging': isDragging,
    'is-over': isOver,
    'is-selected': isSelected,
    'is-empty': isDropEmpty,
  });

  const handleItemClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onItemClick(e);
  };

  const handleMenuClick = (actionType: string) => {
    onClick(actionType);
  };

  drag(drop(dragRef));

  return <div ref={dragRef} className={itemClassNames} onClick={handleItemClick}>
    {
      isSelected && <DragDropMenu onClick={handleMenuClick} />
    }
    {name === 'component' ? <>{parsedComponent}</> : children || <DragDropRender data={[...data]} />}
  </div>
};
