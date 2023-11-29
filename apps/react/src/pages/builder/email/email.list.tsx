import { Sortable } from "@/components/sortable/sortable.component";
// Example API response
const data = [
  {
    id: '1',
    name: 'list',
    type: 'div',
    dataType: 'list',
    data: [],
    parentId: null,
    position: 0
  },
  {
    id: '2',
    name: 'item',
    type: 'text',
    dataType: 'item',
    data: null,
    parentId: 1,
    position: 1,
  },
  {
    id: '3',
    name: 'item',
    type: 'text',
    dataType: 'item',
    data: null,
    parentId: 1,
    position: 2
  },
  {
    id: '4',
    name: 'item',
    type: 'text',
    dataType: 'item',
    data: null,
    parentId: 1,
    position: 3
  },
  {
    id: '5',
    name: 'list',
    type: 'div',
    dataType: 'list',
    data: [],
    parentId: null,
    position: 4
  },
  {
    id: '6',
    name: 'item',
    type: 'text',
    dataType: 'item',
    data: null,
    parentId: 5,
    position: 5,
  },
  {
    id: '7',
    name: 'list',
    type: 'div',
    dataType: 'list',
    data: [],
    parentId: null,
    position: 6
  },
  {
    id: '8',
    name: 'item',
    type: 'text',
    dataType: 'item',
    data: null,
    parentId: 7,
    position: 7,
  },
];

function EmailList() {
  return <Sortable data={data} />;
}

export default EmailList;