import React, { FC } from 'react';

export const DragDropToolbar: FC<any> = ({ item, setItem, dispatch, ...props }): JSX.Element => {
  //const { item, setItem, duplicateItem, deleteItem } = context;
  const handleClick = (name: string) => {

    switch (name) {
      case 'edit':
        //setItem({ ...item, isEdit: true });
        dispatch({
          type: 'SET_ITEM_ACTIVE',
          payload: { isActive: true }
        });
        break;
      case 'duplicate':
        //duplicateItem(props);
        dispatch({
          type: 'DUPLICATE_ITEM',
          payload: props
        });
        break;
      case 'delete':
        //deleteItem(props);

        dispatch({
          type: 'DELETE_ITEM',
          payload: props
        });

        //setItem(null);
        break;
    }
  }

  return <div className='dd-toolbar'>
    <button type="button" onClick={(e) => { e.stopPropagation(); handleClick('edit'); }}>edit</button>
    <button type="button" onClick={(e) => { e.stopPropagation(); handleClick('delete'); }}>delete</button>
    <button type="button" onClick={(e) => { e.stopPropagation(); handleClick('duplicate'); }}>duplicate</button>
  </div>
}