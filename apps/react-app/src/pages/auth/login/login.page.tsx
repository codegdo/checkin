import { CustomElementProps, CustomFieldProps, Form } from "@/components";

function Login() {
  return <Form>
    <Form.Section>
      <Form.Field type='text' name='username' />
      <Form.Field type='password' name='password'>
        {
          ({ name, currentValue, handleChange }: CustomFieldProps) => {

            //events['username']?.update(currentValue);
            //handleCallback && handleCallback({ name: 'username', value: currentValue });

            return <div>
              <label htmlFor={name}>{name}</label>
              <input name={name} value={currentValue} onChange={handleChange} />
            </div>
          }
        }
      </Form.Field>
      <Form.Element type='button' name='submit'>
        {
          ({ handleClick }: CustomElementProps) => {
            return <button type='button' onClick={() => handleClick && handleClick('custom')}>Custom Button</button>
          }
        }
      </Form.Element>
    </Form.Section>
  </Form>;
}

export default Login;


