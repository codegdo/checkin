import React, { FC } from 'react';

export const DragDropElement: FC<any> = (props): JSX.Element => {

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
}