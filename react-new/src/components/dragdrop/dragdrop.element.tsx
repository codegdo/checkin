import React, { FC, useEffect, useState, MouseEvent } from 'react';
import { useDragDrop } from '../../hooks';
import { DragDropToolbar } from './dragdrop.toolbar';

export const DragDropElement: FC<any> = (props): JSX.Element => {
  const { context, ...element } = props;
  const { item, setItem } = context;
  const { id, name } = element;
  const initialValues = { ...element };

  const [values, setValues] = useState(initialValues);
  const { ref, classNames, attributes, onMouseOver, onMouseOut } = useDragDrop(props);

  useEffect(() => {
    setValues(initialValues);
  }, []);

  const onChange = (event: MouseEvent<HTMLElement, MouseEvent>) => {
    //
  }

  const onClick = (event: MouseEvent<HTMLElement, MouseEvent> & { target: { name: string | undefined } }) => {
    const { name } = event.target;

    switch (name) {
      default:
        setItem(null);
    }
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const currentItem = (item?.id == id) ? null : { id, values, onChange, onClick };
    setItem(currentItem);
  }

  return <div
    ref={ref}
    id={id}
    className={`${classNames}`}
    {...attributes}
    onMouseOver={onMouseOver}
    onMouseOut={onMouseOut}
    onClick={handleClick}
  >
    {
      (item?.id == id) && <DragDropToolbar {...props} />
    }
    {name}
  </div>
}

/* export const DragDropElement: FC<any> = (props): JSX.Element => {

  const {
    id,
    className,
    role,
    name,
    position,
    data,
    current,
    item,
    setItem
  } = props;

  const onChange = () => { }

  const onClick = () => { }

  const handleClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (item && item.id == id) {
      setItem(null);
    } else {
      setItem({
        id,
        type: role,
        position,
        //list,
        //values,
        onChange,
        onClick
      });
    }
  }

  return <div className={`element ${className}`} onClick={handleClick}>{props.name}</div>
} */