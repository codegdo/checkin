import { DragDrop } from "@/components/dragdrop/dragdrop.component";
// Example API response
const data = [
  {
    id: 1,
    name: 'block',
    type: 'div',
    dataType: 'block',
    data: [],
    parentId: null,
    position: 0
  },
  {
    id: 2,
    name: 'field',
    type: 'text',
    dataType: 'field',
    data: null,
    parentId: 1,
    position: 1,
  },
  {
    id: 3,
    name: 'field',
    type: 'text',
    dataType: 'field',
    data: null,
    parentId: null,
    position: 2
  },
  {
    id: 4,
    name: 'block',
    type: 'div',
    dataType: 'block',
    data: [],
    parentId: null,
    position: 3
  },
  {
    id: 5,
    name: 'field',
    type: 'text',
    dataType: 'field',
    data: null,
    parentId: 4,
    position: 4,
  },
];

const dragFields = [
  {
    id: '',
    name: 'section',
    type: 'section',
    dataType: 'section',
    data: []
  },
  {
    id: '',
    name: 'block',
    type: 'div',
    dataType: 'block',
    data: []
  },
  //
  {
    id: 5,
    name: 'field',
    type: 'text',
    dataType: 'field',
    data: []
  },
  {
    id: 7,
    name: 'field',
    type: 'text',
    dataType: 'field',
    data: []
  },

];
function FormList() {
  return <DragDrop data={data} dragFields={dragFields} />;
}

export default FormList;