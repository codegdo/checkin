import React from 'react';

import ItemMenu from './item.menu';
import ItemEditor from './item.editor';

function ItemGroup(props: any) {

  return (
    <>
      <ItemMenu />
      <ItemEditor />
    </>
  )
}

export default ItemGroup;