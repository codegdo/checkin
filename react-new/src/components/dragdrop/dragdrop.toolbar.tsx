import React, { FC } from 'react';

export const DragDropToolbar: FC<any> = ({ deleteItem, duplicateItem, ...props }): JSX.Element => {

  const handleClick = (event: any) => {
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

  return <div className='dd-toolbar'>
    <button type="button" value="delete" onClick={handleClick}>delete</button>
    <button type="button" value="duplicate" onClick={handleClick}>duplicate</button>
  </div>
}