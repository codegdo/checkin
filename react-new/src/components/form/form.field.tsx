import React, { useContext, useEffect } from 'react';
import { Input } from '../input/input.component';
import { FormContext } from './form.context';

interface FieldProps {
  id?: string | number;
  name: string;
  type: string;
  label?: string;
  description?: string;
  value?: string;
}

export const Field: React.FC<FieldProps> = (props): JSX.Element => {

  const { form } = useContext(FormContext);
  const { label, description, name, type, value } = props;

  useEffect(() => {
    form[props.name] = value;
  }, []);

  const handleChange = (key: string, value: string) => {
    form[key] = value;
    console.log(form, key, value);
  }

  return <div>
    {
      (label || description) && <span>
        {label && <label>{label}</label>}
        {description && <small>{description}</small>}
      </span>
    }
    <Input type={type} name={name} value={value} onChange={handleChange} />
  </div>
}