import React from 'react';
import { DragDrop } from '../../components';

// Example API response
const apiResponse = [
  {
    id: '1',
    name: 'block',
    type: 'div',
    dataType: 'block',
    data: [
      {
        id: 2,
        name: 'field',
        type: 'text',
        dataType: 'field',
        data: null
      },
    ],
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