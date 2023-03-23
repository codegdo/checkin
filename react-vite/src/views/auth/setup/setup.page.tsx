import React, { useEffect } from 'react';
import { DragDrop, DragItem } from '../../../components/dragdrop';

const json = [
  {
    id: '1',
    name: 'block',
    type: 'div',
    dataType: 'block',
    data: [],
    parentId: null,
    childId: null,
    position: 0,
    settings: {},
    styles: {}
  },
  {
    id: '2',
    name: 'field2',
    label: '',
    description: '',
    placeholder: '',
    note: '',
    type: 'text',
    dataType: 'field',
    data: [],
    value: '',
    parentId: '1',
    childId: null,
    position: 1,
    settings: {},
    styles: {}
  },
  {
    id: '3',
    name: 'field3',
    label: '',
    description: '',
    placeholder: '',
    note: '',
    type: 'text',
    dataType: 'field',
    data: [],
    value: '',
    parentId: '1',
    childId: null,
    position: 2,
    settings: {},
    styles: {}
  },
  {
    id: '4',
    name: 'field4',
    label: '',
    description: '',
    placeholder: '',
    note: '',
    type: 'text',
    dataType: 'field',
    data: [],
    value: '',
    parentId: '1',
    childId: null,
    position: 3,
    settings: {},
    styles: {}
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