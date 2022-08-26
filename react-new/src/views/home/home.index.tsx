import React from 'react';
import { DragDrop } from '../../components/dragdrop/dragdrop.component';

const data: any[] = [{
  id: 0, role: 'block', data: [
    {
      id: 1,
      role: 'block',
      data: [
        {
          id: 2,
          role: 'field'
        },
        {
          id: 3,
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
          role: 'field'
        },
        {
          id: 6,
          role: 'field'
        }
      ]
    }]
}];

const Index: React.FC = (): JSX.Element => {
  return <div>
    <DragDrop data={data} />
  </div>;
};

export default Index;