import React, { useEffect } from 'react';
import { DragDrop, DragItem } from '../../../components/dragdrop';
import { DndItemType } from '../../../components/dragdrop/dragdrop.type';

const Setup: React.FC = (): JSX.Element => {

  return (
    <DragDrop>
      <DragItem id="5" name='block' type='div' dataType={DndItemType.Block} data={[]} />
    </DragDrop>
  );
}

export default Setup;