import React, { useEffect } from 'react';
import { DragDrop, DragItem } from '../../../components/dragdrop';

const Setup: React.FC = (): JSX.Element => {

  return (
    <DragDrop>
      <DragItem />
    </DragDrop>
  );
}

export default Setup;