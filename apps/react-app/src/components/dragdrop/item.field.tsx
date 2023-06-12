import React from 'react';

//import { useWrapperContext } from '../../hooks';
//import DragDropContext from './dragdrop.provider';
import ItemMenu from './item.menu';
import ItemEditor from './item.editor';

function ItemField(props: any) {
  //const context = useWrapperContext(DragDropContext);

  return (
    <>
      <ItemMenu />
      <ItemEditor />
      {
        props.children
      }
    </>
  )
}

export default ItemField;