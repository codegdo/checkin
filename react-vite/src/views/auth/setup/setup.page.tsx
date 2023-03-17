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
    position: 0,
    settings: {}
  },
  {
    id: '2',
    className: '',
    name: 'field2',
    type: 'text',
    dataType: 'field',
    data: [],
    parentId: '1',
    childId: null,
    position: 1,
    settings: {}
  },
  {
    id: '3',
    className: '',
    name: 'field3',
    type: 'text',
    dataType: 'field',
    data: [],
    parentId: '1',
    childId: null,
    position: 2,
    settings: {}
  }
]

const Setup: React.FC = (): JSX.Element => {

  return (
    <DragDrop data={json}>
      <DragItem name='block' type='div' dataType='block' />
      <DragItem name='component' type='div' dataType='block' value={`<div class="row">
      <div class="column"><jsx id='placeholder_0'></jsx></div>
      <div class="column"><jsx id='placeholder_1'></jsx></div>
    </div>`} />
      <DragItem name='field' type='textbox' dataType='field' />
    </DragDrop>
  );
}

export default Setup;