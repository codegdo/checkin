import React, { FC } from 'react';

export const DragDropToolbar: FC<any> = ({ setItem, item, deleteItem, duplicateItem, ...props }): JSX.Element => {

  const handleClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    switch (event.target.value) {
      case 'edit':
        //deleteItem(props);
        setItem({ ...item, isEdit: true })
        break;
      case 'duplicate':
        duplicateItem(props);
        break;
      case 'delete':
        deleteItem(props);
        break;
    }
  }

  return <div className='dd-toolbar'>
    <button type="button" value="edit" onClick={handleClick}>edit</button>
    <button type="button" value="delete" onClick={handleClick}>delete</button>
    <button type="button" value="duplicate" onClick={handleClick}>duplicate</button>
  </div>
}