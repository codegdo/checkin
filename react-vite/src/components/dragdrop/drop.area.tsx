import React from 'react';
import { useWrapperContext } from '../../hooks';
import { DragDropContext } from './dragdrop.context';
import DragDropRender from './dragdrop.render';
import DropBlock from './drop.block';

const DropArea: React.FC = () => {
  const { state } = useWrapperContext(DragDropContext);

  return (
    <DropBlock dataType="area">
      {state?.data && <DragDropRender data={state.data} />}
    </DropBlock>
  );
};

export default DropArea;
