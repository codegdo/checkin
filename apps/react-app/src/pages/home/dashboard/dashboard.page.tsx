import { Sortable } from "../../../components";

// Example API response
const data = [
  {
    id: '1',
    name: 'list',
    type: 'div',
    group: 'list',
    data: [],
    parentId: null,
    position: 0
  },
  {
    id: 2,
    name: 'field',
    type: 'text',
    group: 'field',
    data: null,
    parentId: 1,
    position: 1,
  },
  {
    id: 3,
    name: 'field',
    type: 'text',
    group: 'field',
    data: null,
    parentId: 1,
    position: 2
  },
  {
    id: 4,
    name: 'field',
    type: 'text',
    group: 'field',
    data: null,
    parentId: 1,
    position: 3
  },
  {
    id: '5',
    name: 'list',
    type: 'div',
    group: 'list',
    data: [],
    parentId: null,
    position: 4
  },
  {
    id: 6,
    name: 'field',
    type: 'text',
    group: 'field',
    data: null,
    parentId: 5,
    position: 5,
  },
];

function Dashboard() {
  return <div>
    <Sortable data={data} />
  </div>
}

export default Dashboard;