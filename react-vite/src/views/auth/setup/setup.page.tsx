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
    name: 'firstName',
    label: 'First Name',
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
    name: 'lastName',
    label: 'Last Name',
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
    name: 'emailAddress',
    label: 'Email Address',
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
  },
  {
    id: '10',
    name: 'block',
    type: 'div',
    dataType: 'placeholder',
    data: [],
    parentId: null,
    childId: null,
    position: 10,
    settings: {},
    styles: {}
  },
]

function Setup() {

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