import React, { FC, useEffect, useState } from 'react';

export const EditorField: FC<any> = ({ field, onChange }): JSX.Element => {
  const [values, setValues] = useState(field);

  useEffect(() => {
    onChange(values);
  }, [values]);

  const handleChange = (event: any) => {
    const key = event.target.name;
    const value = event.target.value;

    setValues({ ...values, [key]: value })
  }

  return <div>

    {Object.keys(values).map((item, i) => (
      <div key={i}>
        <label>{item}</label>
        <input name={item} value={values[item]} onChange={handleChange} />
      </div>
    ))}
  </div>
}