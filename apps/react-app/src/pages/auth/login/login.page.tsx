import { Form } from "@/components";

function Login() {
  return <Form>
    <Form.Section>
      <Form.Field type='text' id='1' name='first' />
      <Form.Button name='submit' value='Submit' />
      <Form.Button name='cancel' value='Cancel' />
    </Form.Section>
  </Form>;
}

export default Login;


