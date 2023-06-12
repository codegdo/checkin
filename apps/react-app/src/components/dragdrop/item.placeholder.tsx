import React from 'react';

//import { useWrapperContext } from '../../hooks';
//import DragDropContext from './dragdrop.provider';
import ItemMenu from './item.menu';

function ItemPlaceholder(props: any) {
  //const context = useWrapperContext(DragDropContext);

  return (
    <>
      <ItemMenu />
      {
        props.children
      }
    </>
  )
}

export default ItemPlaceholder;