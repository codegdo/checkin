import React, { FC } from 'react';

export const DragDropElement: FC<any> = ({ id, role, item, setItem, ...props }): JSX.Element => {

  const onChange = () => {

  }

  const handleClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const target = item?.id == id ? null : {
      id,
      role,
      onChange
    };

    setItem(target);
  }
  return <div className={`dd-content`} onClick={handleClick}>{props.name}</div>
}