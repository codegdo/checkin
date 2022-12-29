import React, { FC, useRef, MouseEvent, useState } from 'react';

import { DragDropField } from './dragdrop.field';
import { DragDropBlock } from './dragdrop.block';
import { DragDropElement } from './dragdrop.element';
import { DragDropToolbar } from './dragdrop.toolbar';
import { useDragDrop } from '../../hooks';
import { Input, Label } from '../input';

export const DragDropItem: FC<any> = ({ props }): JSX.Element => {

  const {
    id,
    className,
    name,
    role,
    type,
    data,
    position,
    parentId,
    holderId,

    current,
    draggable = true,
    item,
    setItem,
    moveItem
  } = props;


  const [values, setValues] = useState(props);

  const { ref, currentDragging, isDragging, isOver } = useDragDrop(props);

  const handleMouseOver = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (ref.current) {

      !currentDragging && ref.current.classList.add('-hover');

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

  const onChange = () => { }

  const onClick = (event: MouseEvent<HTMLElement, MouseEvent> & {
    target: { name: string | undefined }
  }) => {
    const { name } = event.target;

    switch (name) {
      case 'cancel':
        //
        break;
      default:
        setItem(null);
    }
  };

  const handleClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    let currentItem = null;

    if (item?.id !== id) {
      currentItem = {
        id,
        type: role,
        position,
        //list,
        //values,
        isEdit: false,
        onChange,
        onClick
      };
    }

    setItem(currentItem);
  }

  const classString = `dd-${role}${isDragging ? ' dragging' : ''}${isOver ? ' -over' : ''}${(data?.length == 0) ? ' -empty' : ''}${item?.id == id ? ' -focus' : ''}`;
  const title = (role == 'block') ? name : role;
  const events = draggable ? {
    onClick: handleClick,
    onMouseOver: handleMouseOver,
    onMouseOut: handleMouseOut
  } : {};

  return (
    <div ref={ref} className={classString} id={id} tabIndex={position} data-title={title} {...events}>
      {
        (item?.id == id) && <DragDropToolbar {...props} />
      }
      {
        (() => {
          switch (role) {
            case 'block':
            case 'dropzone':
            case 'dropholder':
              return <DragDropBlock {...props} />
            case 'element':
              return <DragDropElement {...props} />
            case 'field':
              return <>
                <Label className='label' label={values.label} description={values.description} style={values.style} />
                <Input id={id} name={name} type={type} />
              </>
            default: return null;
          }
        })()
      }
    </div>
  );
};
