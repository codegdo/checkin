import { DragDrop } from '../../components';

// Example API response
const apiResponse = [
  {
    id: '1',
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
    id: '4',
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

// Map the API response to use enum values
// const json: Field[] = apiResponse.map(item => ({
//   ...item,
//   type: ElementType[item.type.toUpperCase() as keyof typeof ElementType],
//   dataType: DataType[item.dataType.toUpperCase() as keyof typeof DataType],
//   data: item.data.map(dataItem => ({
//     ...dataItem,
//     type: FieldType[dataItem.type.toUpperCase() as keyof typeof FieldType],
//   })),
// }));

function Index() {
  return <div>
    <DragDrop data={apiResponse} />
  </div>
}

export default Index;