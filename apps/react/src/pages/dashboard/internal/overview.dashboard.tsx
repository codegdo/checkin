import { DragDrop } from "@/components_v1/dragdrop/dragdrop.component";
import { Form, FormField, FormResult } from "@/components_v1/form";

function Overview() {

  const handleClick = (result: FormResult) => {
    console.log(result);
  }

  return <div>
    Overview

    <Form onSubmit={handleClick}>
      <FormField name='email' type='text' />
    </Form>

    <DragDrop data={[
      {
        id: 'form',
        name: 'area',
        type: 'area',
        data: [],
        parentId: null,
        position: 0
      },
      {
        id: 1,
        name: 'email',
        title: 'Email',
        type: 'email',
        data: [],
        parentId: 'form',
        position: 1
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
            position: 3
          },
          {
            id: 4,
            name: 'lastName',
            title: 'Last Name',
            type: 'text',
            data: null,
            parentId: 2,
            position: 4
          },
        ],
        parentId: 'form',
        position: 2
      },
    ]} />
  </div>
}

export default Overview;