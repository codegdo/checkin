import React from 'react';

import ItemMenu from './item.menu';
import ItemEditor from './item.editor';

function ItemGrid(props: any) {

  return (
    <>
      <ItemMenu />
      <ItemEditor />
    </>
  )
}

export default ItemGrid;