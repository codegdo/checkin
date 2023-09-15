import { CustomElementProps, CustomFieldProps, Form, FormData } from "@/components";

const visibility = [
  {
    id: 1,
    title: 'test1',
    rules: [
      {
        id: 1,
        fieldId: 'username',
        caseSensitivity: false,
        comparison: 'contains',
        operator: 'and',
        value: 'john',
      },
      {
        id: 2,
        fieldId: 'age',
        caseSensitivity: false,
        comparison: 'equals',
        operator: 'or',
        value: '30',
      },
    ],
    effect: {
      isDisabled: false,
      isReadonly: true,
      isHidden: false,
    },
    fields: ['age'],
  },
  {
    id: 2,
    title: 'test2',
    rules: [
      {
        id: 1,
        fieldId: 'email',
        caseSensitivity: false,
        comparison: 'equals',
        value: 'john@gmail.com',
        operator: 'and',
      },
      {
        id: 2,
        fieldId: 'username',
        caseSensitivity: false,
        comparison: 'contains',
        value: 'john',
        operator: 'and',
      },
      {
        id: 3,
        fieldId: 'age',
        caseSensitivity: false,
        comparison: 'equals',
        value: '30',
        operator: 'or',
      },
    ],
    effect: {
      isDisabled: false,
      isReadonly: true,
      isHidden: false,
    },
    fields: ['age'],
  },
  // Add more visibility rules here
];

function Login() {

  const handleSubmit = (data: FormData) => {
    console.log(data);
  }

  return <Form onSubmit={handleSubmit}>
    <Form.Section>
      <Form.Field type='email' name='email' isRequire={true} />
      <Form.Field type='text' name='username' isRequire={true} validation={{ length: 5 }} visibility={visibility} />
      <Form.Field type='number' name='age' isRequire={true} validation={{ min: 5 }} />
      <Form.Field type='password' name='password'>
        {
          ({ name, currentValue, error, handleChange }: CustomFieldProps) => {
            return <div>
              <label htmlFor={name}>{name}</label>
              <input name={name} value={currentValue} onChange={handleChange} />
              {error && <p>error</p>}
            </div>
          }
        }
      </Form.Field>
      <Form.Element type='button' name='submit'>
        {
          ({ name, handleClick }: CustomElementProps) => {
            return <button type='button' onClick={() => handleClick && handleClick(name)}>Custom Button</button>
          }
        }
      </Form.Element>
    </Form.Section>
  </Form>;
}

export default Login;

