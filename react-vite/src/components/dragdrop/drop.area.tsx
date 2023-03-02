import React from 'react';

import { useWrapperContext } from '../../hooks';
import { DataType } from '../form';
import { DragDropContext } from './dragdrop.context';
import DragDropRender from './dragdrop.render';
import DropBlock from './drop.block';

const DropArea: React.FC = () => {
  const context = useWrapperContext(DragDropContext);
  const { state } = context;

  return (
    <DropBlock id='0' name='root' type='div' dataType={DataType.Area} className="drop-area" {...context}>
      {state?.data && <DragDropRender data={state.data} />}
    </DropBlock>
  );
};

export default DropArea;
