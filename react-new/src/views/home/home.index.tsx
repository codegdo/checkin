import React from 'react';
import { DragDrop } from '../../components/dragdrop/dragdrop.component';

const data: any[] = [
  {
    id: 1,
    role: 'block',
    data: [
      {
        id: 2,
        name: 'firstName',
        role: 'field'
      },
      {
        id: 3,
        name: 'lastName',
        role: 'field'
      }
    ]
  },
  {
    id: 4,
    role: 'block',
    data: [
      {
        id: 5,
        name: 'emailAddress',
        role: 'field'
      },
      {
        id: 6,
        name: 'phoneNumber',
        role: 'field'
      }
    ]
  }
];

const Index: React.FC = (): JSX.Element => {
  return <div>
    <DragDrop data={data} />
  </div>;
};

export default Index;