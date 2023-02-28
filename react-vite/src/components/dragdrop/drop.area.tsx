import React, { PropsWithChildren } from 'react';

import { useWrapperContext } from "../../hooks";
import { DragDropContext } from "./dragdrop.context";
import DragDropRender from './dragdrop.render';
import DropBlock from './drop.block';

const DropArea: React.FC = (): JSX.Element => {
  const context = useWrapperContext(DragDropContext);

  return (
    <DropBlock dataType='area'>
      <DragDropRender data={[]} />
    </DropBlock>
  );
};

export default DropArea;