import { Form } from "@/components";

function Login() {
  return <Form>
    <Form.Section>
      <Form.Field type='text' name='username' />
      <Form.Field type='password' name='password' />
      <Form.Element type='button' name='submit' />
      <Form.Button name='submit' value='Submit' />
      <Form.Button name='cancel' value='Cancel' />
    </Form.Section>
  </Form>;
}

export default Login;


