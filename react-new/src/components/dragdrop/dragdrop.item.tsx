import React, { FC, useRef } from 'react';
import { useDrag, useDragLayer, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

import { dragdropHelper } from '../../helpers';
import { Render } from './dragdrop.render';
import { DragDropField } from './dragdrop.field';
import { DragDropBlock } from './dragdrop.block';

export const DragDropItem: FC<any> = (props): JSX.Element => {

  const {
    id,
    role,
    type,
    name,
    className,
    position,
    data,
    value,
    draggable = true,
    parentId,
    holderId,
    current,
    focus,
    setFocus,
    moveItem,
    deleteItem,
    duplicateItem,
    children } = props;

  const ref = useRef<HTMLDivElement>(null);

  const { hasAnyDragging } = useDragLayer((monitor) => ({
    hasAnyDragging: monitor.isDragging(),
  }));

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: role,
      item: { ...props },
      canDrag: () => {
        if (ref.current) {
          preview(getEmptyImage(), { captureDraggingState: false });
          current.isOver = true;
        }

        if (focus?.id !== id) {
          setFocus && setFocus(null);
        }

        return !!draggable;
      },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const didDrop = monitor.didDrop();

        if (didDrop) {
          moveItem(item);
        }
      }
    }),
    [id, moveItem, focus]
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ['block', 'component', 'dropzone', 'dropholder', 'element', 'field'],
      drop: () => {
        if (ref.current) {
          ref.current.style.transition = 'none';
          ref.current.removeAttribute('style');
        }
      },
      hover: (item: any, monitor) => {

        // current over
        if (monitor.isOver({ shallow: true })) {

          if (
            !ref.current ||
            item.id === id ||
            (role === 'dropzone' && item.list.length !== 0) // if dropzone has children prevent the drop
          ) {
            current.drop = null;
            return;
          }

          // undefined == null is true
          if (current.drop == null || current.drop.id !== props.id) {
            current.drop = {
              id,
              role,
              type,
              data,
              position,
              parentId,
              holderId,
              x: 0,
              y: 0,
              isOver: false
            };
          }

          dragdropHelper.onHover(monitor, ref, current);
        }
      },
      collect: monitor => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    }), [id, moveItem]);

  const onChange = () => {
    console.log('change');
  }

  const handleFocusClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const target = focus?.id == id ? null : {
      id,
      onChange
    };
    !!draggable && setFocus(target);
  }

  const handleButtonClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    switch (event.target.value) {
      case 'delete':
        deleteItem(props);
        break;
      case 'duplicate':
        duplicateItem(props);
        break;
    }
  }

  const handleMouseOver = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (ref.current) {

      !hasAnyDragging && ref.current.classList.add('-hover');

      // prevent event bubble up
      if (current.isOver) {
        ref.current.classList.remove('-hover');
        current.isOver = false;
      }
    }
  };

  const handleMouseOut = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (ref.current) {
      ref.current.classList.remove('-hover');
    }
  }

  const classString = `${className || ''}${(role == 'element' || role == 'field') ? ' dd-field' : ' dd-block'}${isDragging ? ' dragging' : ''}${isOver ? ' -over' : ''}${(data?.length == 0) ? ' -empty' : ''}${focus?.id == id ? ' -focus' : ''}`;
  const title = (role == 'element' || role == 'field') ? type : role;
  const events = !!draggable ? {
    onClick: handleFocusClick,
    onMouseOver: handleMouseOver,
    onMouseOut: handleMouseOut
  } : {};

  drag(drop(ref));

  return (
    <div className={classString} id={id} ref={ref} tabIndex={position} data-title={title} {...events}>
      {
        focus?.id == id && <div className={isDragging ? 'dd-toolbar hidden' : 'dd-toolbar'}>
          <button type="button" value="delete" onClick={handleButtonClick}>delete</button>
          <button type="button" value="duplicate" onClick={handleButtonClick}>duplicate</button>
        </div>
      }
      <div className={`dd-content`}>
        {
          (() => {
            switch (role) {
              case 'block':
              case 'dropzone':
              case 'dropholder':
                return children ? children : <Render data={[...data]} />
              case 'component':
                const html = DOMPurify.sanitize(value, { ADD_TAGS: ['jsx'] });

                return parse(html, {
                  replace: (domNode): JSX.Element | null => {

                    if ('attribs' in domNode) {
                      const { attribs } = domNode;

                      if (attribs.id) {
                        const [name, key] = attribs.id.split('_');

                        const items = data.filter((item: any) => item.holderId == key);

                        if (name == 'dropholder') {
                          return <DragDropItem
                            id={`${id}_${key}`}
                            type='div'
                            role='dropholder'
                            current={current}
                            position={position}
                            draggable={false}
                            parentId={id}
                            holderId={key}
                            data={items}
                          />
                        }
                      }
                      return null;
                    }
                    return null;
                  }
                })
              case 'element':
                return <DragDropBlock {...props} />
              case 'field':
                return <DragDropField {...props} />
              default: return null;
            }
          })()
        }
      </div>
    </div>
  );
};
