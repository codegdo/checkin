import React, { FC } from 'react';

export const DragDropToolbar: FC<any> = ({ context, ...props }): JSX.Element => {
  const { item, setItem, duplicateItem, deleteItem } = context;
  const handleClick = (name: string) => {

    switch (name) {
      case 'edit':
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
    <button type="button" onClick={(e) => { e.stopPropagation(); handleClick('edit'); }}>edit</button>
    <button type="button" onClick={(e) => { e.stopPropagation(); handleClick('delete'); }}>delete</button>
    <button type="button" onClick={(e) => { e.stopPropagation(); handleClick('duplicate'); }}>duplicate</button>
  </div>
}