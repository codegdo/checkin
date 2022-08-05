import React, { useContext, useEffect } from 'react';
import { Input } from '../input/input.component';
import { FormContext } from './form.context';

interface FieldProps {
  id?: string | number;
  name: string;
  type: string;
  title?: string;
  description?: string;
  value?: string;
}

export const Field: React.FC<FieldProps> = (props): JSX.Element => {

  const { form } = useContext(FormContext);
  const { title, description, name, type, value } = props;

  useEffect(() => {
    form[props.name] = value;
  }, []);

  const handleChange = (key: string, value: string) => {
    form[key] = value;
    console.log(form, key, value);
  }

  return <div>
    {
      (title || description) && <span>
        {title && <label>{title}</label>}
        {description && <small>{description}</small>}
      </span>
    }
    <Input type={type} name={name} value={value} onChange={handleChange} />
  </div>
}