import { Form } from "@/components";

function Login() {
  return <Form>
    <Form.Section>
      <Form.Field type='text' id='1' name='username' />
      <Form.Field type='password' id='2' name='password' />
      <Form.Element type='button' />
      <Form.Button name='submit' value='Submit' />
      <Form.Button name='cancel' value='Cancel' />
    </Form.Section>
  </Form>;
}

export default Login;


