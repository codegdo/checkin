import { DragDrop } from "@/components_v1/dragdrop/dragdrop.component";
import { Form, FormResult } from "@/components_v1/form";

const data = [
  {
    id: 1,
    name: 'email',
    title: 'Email',
    type: 'email',
    data: [],
    value: null,
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
        value: null,
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
        value: null,
        parentId: 2,
        position: 4,
        required: true,
      },
    ],
    value: null,
    parentId: null,
    position: 2
  },
  {
    id: 5,
    name: 'role',
    title: 'Role',
    type: 'grid',
    data: [
      {
        id: 6,
        name: 'roleId',
        title: 'Role Id',
        type: 'text',
        data: null,
        value: null,
        parentId: null,
        position: 0,
        required: true,
      },
      {
        id: 7,
        name: 'roleName',
        title: 'Role Name',
        type: 'text',
        data: null,
        value: null,
        parentId: null,
        position: 0,
        required: true,
      },
    ],
    value: [
      { id: 6, value: '123', rowIndex: 0 },
      { id: 7, value: 'Admin', rowIndex: 0 },
    ],
    parentId: null,
    position: 5
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