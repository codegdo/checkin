import React, { useEffect } from 'react';
import { DragDrop, DragItem } from '../../../components/dragdrop';

const json = [
  {
    id: '1',
    className: '',
    name: 'block',
    type: 'div',
    dataType: 'block',
    data: [],
    parentId: null,
    childId: null,
    position: 0
  },
  {
    id: '2',
    className: '',
    name: 'field',
    type: 'text',
    dataType: 'field',
    data: [],
    parentId: '1',
    childId: null,
    position: 1
  }
]

const Setup: React.FC = (): JSX.Element => {

  return (
    <DragDrop data={json}>
      <DragItem name='block' type='div' dataType='block' />
      <DragItem name='field' type='textbox' dataType='field' />
    </DragDrop>
  );
}

export default Setup;