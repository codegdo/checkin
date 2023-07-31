import { CustomFieldProps, Form } from "@/components";

function Login() {
  return <Form>
    <Form.Section>
      <Form.Field type='text' name='username' />
      <Form.Field type='password' name='password' />
      <Form.Element type='button' name='submit'>
        {
          ({handleClick}: CustomFieldProps) => {
            return <button type='button' onClick={() => handleClick && handleClick('custom')}>Custom Button</button>
          }
        }
      </Form.Element>
    </Form.Section>
  </Form>;
}

export default Login;


