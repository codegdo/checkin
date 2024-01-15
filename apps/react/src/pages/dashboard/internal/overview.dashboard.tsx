import { DragDrop } from "@/components_v1/dragdrop/dragdrop.component";
import { Form, FormResult } from "@/components_v1/form";

const data = [
  {
    id: 1,
    name: 'email',
    title: 'Email',
    type: 'email',
    data: [],
    parentId: null,
    position: 1,
    required: true,
  },
  {
    id: 2,
    name: 'name',
    title: 'Name',
    type: 'group',
    data: [
      {
        id: 3,
        name: 'firstName',
        title: 'First Name',
        type: 'text',
        data: null,
        parentId: 2,
        position: 3,
        required: true,
      },
      {
        id: 4,
        name: 'lastName',
        title: 'Last Name',
        type: 'text',
        data: null,
        parentId: 2,
        position: 4,
        required: true,
      },
    ],
    parentId: null,
    position: 2
  },
];

function Overview() {

  const handleClick = (result: FormResult) => {
    console.log(result);
  }

  return <div>
    Overview

    <Form onSubmit={handleClick} data={data} />

    <DragDrop data={data} />
  </div>
}

export default Overview;