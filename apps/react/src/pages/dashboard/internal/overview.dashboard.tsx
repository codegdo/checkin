import { DragDrop } from "@/components_v1/dragdrop/dragdrop.component";
import { Form, FormResult } from "@/components_v1/form";

function Overview() {

  const handleClick = (result: FormResult) => {
    console.log(result);
  }

  return <div>
    Overview

    <Form data={[{
      name: 'email',
      type: 'text',
      dataType: 'field'
    }]} onSubmit={handleClick}>

    </Form>

    <DragDrop data={[
      {
        id: 'form',
        name: 'area',
        type: 'div',
        dataType: 'area',
        data: [],
        parentId: null,
        position: 0
      },
      {
        id: 1,
        name: 'email',
        title: 'Email',
        type: 'email',
        dataType: 'field',
        data: [],
        parentId: 'form',
        position: 1
      },
    ]} />
  </div>
}

export default Overview;