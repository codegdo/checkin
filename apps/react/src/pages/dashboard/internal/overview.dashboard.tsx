import { Form } from "@/components_v1/form";

function Overview() {
  return <div>
    Overview
    <Form data={[{
      name: 'email',
      type: 'text',
      componentType: 'field'
    }]}>

    </Form>
  </div>
}

export default Overview;