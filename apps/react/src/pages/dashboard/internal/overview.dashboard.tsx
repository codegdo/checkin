import { Form, FormReturn } from "@/components_v1/form";

function Overview() {

  const handleClick = (returnData: FormReturn) => {
    console.log(returnData);
  }

  return <div>
    Overview

    <Form data={[{
      name: 'email',
      type: 'text',
      componentType: 'field'
    }]} onClick={handleClick}>

    </Form>
  </div>
}

export default Overview;