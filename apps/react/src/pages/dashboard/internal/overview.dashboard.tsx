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
      blockType: 'field'
    }]} onSubmit={handleClick}>

    </Form>

    <DragDrop />
  </div>
}

export default Overview;